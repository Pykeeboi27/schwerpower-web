#!/usr/bin/env node
/**
 * One-off extractor: pulls every embedded image out of the SPMC company
 * profile PDF, decodes it (Flate/DCT, with SMask alpha where present),
 * dedupes identical pixel content, and writes numbered WebP files to the
 * scratchpad for manual curation into public/.
 *
 * This is a minimal hand-rolled PDF object/page-tree walker — sufficient
 * because the source PDF (v1.4, verified earlier) has no compressed
 * object streams (no /ObjStm), so every object is a plain "N G obj ...
 * endobj" block locatable by regex/byte-offset scanning.
 *
 * Not part of the shipped app; run manually with:
 *   node scripts/extract-pdf-assets.cjs "<path-to-pdf>" "<output-dir>"
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");
const sharp = require("sharp");

const [, , pdfPathArg, outDirArg] = process.argv;
if (!pdfPathArg || !outDirArg) {
  console.error("usage: extract-pdf-assets.cjs <pdf> <outDir>");
  process.exit(1);
}
const pdfPath = path.resolve(pdfPathArg);
const outDir = path.resolve(outDirArg);
fs.mkdirSync(outDir, { recursive: true });

const buf = fs.readFileSync(pdfPath);
const latin1 = buf.toString("latin1");

// ---------- 1. Index every "N G obj ... endobj" ----------
const objIndex = new Map(); // objNum -> { dictStart, dictEnd, streamStart, streamEnd }
{
  const re = /(\d+)\s+(\d+)\s+obj\b/g;
  let m;
  while ((m = re.exec(latin1))) {
    const objNum = parseInt(m[1], 10);
    const bodyStart = m.index + m[0].length;
    const endObjIdx = latin1.indexOf("endobj", bodyStart);
    if (endObjIdx === -1) continue;
    let dictEnd = endObjIdx;
    let streamStart = -1;
    let streamEnd = -1;
    const streamKwIdx = latin1.indexOf("stream", bodyStart);
    if (streamKwIdx !== -1 && streamKwIdx < endObjIdx) {
      dictEnd = streamKwIdx;
      // stream data starts right after "stream" + optional \r + \n
      let s = streamKwIdx + "stream".length;
      if (latin1[s] === "\r") s++;
      if (latin1[s] === "\n") s++;
      streamStart = s;
      const endStreamIdx = latin1.indexOf("endstream", s);
      streamEnd = endStreamIdx === -1 ? endObjIdx : endStreamIdx;
      // trim a single trailing EOL before "endstream"
      if (latin1[streamEnd - 1] === "\n") streamEnd--;
      if (latin1[streamEnd - 1] === "\r") streamEnd--;
    }
    objIndex.set(objNum, {
      dict: latin1.slice(bodyStart, dictEnd),
      streamStart,
      streamEnd,
    });
  }
}
console.log(`indexed ${objIndex.size} objects`);

function getObj(num) {
  return objIndex.get(num);
}
function getStreamBytes(num) {
  const o = getObj(num);
  if (!o || o.streamStart < 0) return null;
  return buf.subarray(o.streamStart, o.streamEnd);
}
// Resolve "12 0 R" style indirect refs found via a named key in a dict.
function findRef(dict, key) {
  const re = new RegExp(`/${key}\\s+(\\d+)\\s+\\d+\\s+R\\b`);
  const m = dict.match(re);
  return m ? parseInt(m[1], 10) : null;
}
function findInlineDict(dict, key) {
  // /Key << ... >>  — depth-counted scan so nested dicts (e.g. Resources
  // containing XObject) resolve to the correct matching close, instead of
  // a naive regex mistaking an inner ">>" for the outer one.
  const marker = `/${key}`;
  let searchFrom = 0;
  while (true) {
    const keyIdx = dict.indexOf(marker, searchFrom);
    if (keyIdx === -1) return null;
    // ensure the key isn't a prefix match of a longer name (e.g. /Type vs /Type2)
    const afterKey = keyIdx + marker.length;
    const nextCh = dict[afterKey];
    if (nextCh && /[A-Za-z0-9_]/.test(nextCh)) {
      searchFrom = afterKey;
      continue;
    }
    let i = afterKey;
    while (i < dict.length && /\s/.test(dict[i])) i++;
    if (dict[i] !== "<" || dict[i + 1] !== "<") {
      searchFrom = afterKey;
      continue;
    }
    const contentStart = i + 2;
    let depth = 1;
    let j = contentStart;
    while (j < dict.length && depth > 0) {
      if (dict[j] === "<" && dict[j + 1] === "<") {
        depth++;
        j += 2;
      } else if (dict[j] === ">" && dict[j + 1] === ">") {
        depth--;
        j += 2;
      } else {
        j++;
      }
    }
    return dict.slice(contentStart, j - 2);
  }
}
function findNum(dict, key) {
  const m = dict.match(new RegExp(`/${key}\\s+(\\d+)`));
  return m ? parseInt(m[1], 10) : null;
}
function findArray(dict, key) {
  const re = new RegExp(`/${key}\\s*\\[([^\\]]*)\\]`);
  const m = dict.match(re);
  return m ? m[1] : null;
}

// ---------- 2. Walk Catalog -> Pages -> Kids to get page order ----------
let catalogNum = null;
for (const [num, o] of objIndex) {
  if (/\/Type\s*\/Catalog\b/.test(o.dict)) {
    catalogNum = num;
    break;
  }
}
if (catalogNum === null) {
  console.error("no /Catalog found");
  process.exit(1);
}
const rootPagesNum = findRef(getObj(catalogNum).dict, "Pages");

const pageObjNums = [];
function walkPages(num) {
  const o = getObj(num);
  if (!o) return;
  if (/\/Type\s*\/Page\b(?!s)/.test(o.dict)) {
    pageObjNums.push(num);
    return;
  }
  const kidsRaw = findArray(o.dict, "Kids");
  if (!kidsRaw) return;
  const kidNums = [...kidsRaw.matchAll(/(\d+)\s+\d+\s+R/g)].map((m) =>
    parseInt(m[1], 10)
  );
  for (const k of kidNums) walkPages(k);
}
walkPages(rootPagesNum);
console.log(`found ${pageObjNums.length} pages`);

// ---------- 3. For each page, resolve Resources/XObject + Contents ----------
function resolveResourcesDict(pageDict) {
  const inline = findInlineDict(pageDict, "Resources");
  if (inline !== null) return inline;
  const ref = findRef(pageDict, "Resources");
  if (ref !== null) return getObj(ref)?.dict ?? "";
  return "";
}
function decompressMaybe(rawBytes, dict) {
  if (/\/Filter\s*\/FlateDecode/.test(dict) || /\/Filter\s*\[[^\]]*\/FlateDecode/.test(dict)) {
    return zlib.inflateSync(rawBytes);
  }
  return rawBytes;
}
function getContentBytes(pageDict) {
  const arr = findArray(pageDict, "Contents");
  const parts = [];
  if (arr !== null) {
    const nums = [...arr.matchAll(/(\d+)\s+\d+\s+R/g)].map((m) => parseInt(m[1], 10));
    for (const n of nums) {
      const o = getObj(n);
      const raw = getStreamBytes(n);
      if (raw) parts.push(decompressMaybe(raw, o.dict));
    }
  } else {
    const ref = findRef(pageDict, "Contents");
    if (ref !== null) {
      const o = getObj(ref);
      const raw = getStreamBytes(ref);
      if (raw) parts.push(decompressMaybe(raw, o.dict));
    }
  }
  return Buffer.concat(parts.map((p, i) => (i === 0 ? p : Buffer.concat([Buffer.from(" "), p]))));
}

const seenHashes = new Map(); // sha256 -> output filename (for dedupe reporting)
const manifest = [];
let globalCounter = 0;

function getXObjectMap(resDict) {
  const map = new Map(); // name -> objNum
  const raw = findInlineDict(resDict, "XObject");
  if (raw !== null) {
    for (const m of raw.matchAll(/\/(\w+)\s+(\d+)\s+\d+\s+R/g)) map.set(m[1], parseInt(m[2], 10));
    return map;
  }
  const ref = findRef(resDict, "XObject");
  if (ref !== null) {
    const xd = getObj(ref)?.dict ?? "";
    for (const m of xd.matchAll(/\/(\w+)\s+(\d+)\s+\d+\s+R/g)) map.set(m[1], parseInt(m[2], 10));
  }
  return map;
}

function resolveResourcesFromDict(dict) {
  const inline = findInlineDict(dict, "Resources");
  if (inline !== null) return inline;
  const ref = findRef(dict, "Resources");
  return ref !== null ? getObj(ref)?.dict ?? "" : "";
}

// PDFs from design tools (Illustrator/InDesign export, here) commonly wrap a
// page's real images inside one or more nested Form XObjects (layer/group
// containers) rather than drawing images directly on the page. Walk those
// recursively — depth-guarded against cycles via `visitedForms` — to get the
// actual flattened, in-order list of image object numbers.
function collectImageObjNumsInOrder(resDict, contentBytes, depth, visitedForms) {
  if (depth > 12 || !contentBytes) return [];
  const xobjMap = getXObjectMap(resDict);
  const contentStr = contentBytes.toString("latin1");
  const names = [];
  for (const m of contentStr.matchAll(/\/(\w+)\s+Do\b/g)) {
    if (xobjMap.has(m[1])) names.push(m[1]);
  }
  if (!names.length) names.push(...xobjMap.keys());

  const out = [];
  for (const name of names) {
    const objNum = xobjMap.get(name);
    const xo = getObj(objNum);
    if (!xo) continue;
    if (/\/Subtype\s*\/Image/.test(xo.dict)) {
      out.push(objNum);
    } else if (/\/Subtype\s*\/Form/.test(xo.dict) && !visitedForms.has(objNum)) {
      visitedForms.add(objNum);
      const formRes = resolveResourcesFromDict(xo.dict);
      const rawStream = getStreamBytes(objNum);
      let decompressed = null;
      try {
        decompressed = rawStream ? decompressMaybe(rawStream, xo.dict) : null;
      } catch (e) {
        // leave null; skip this form's contents
      }
      out.push(...collectImageObjNumsInOrder(formRes, decompressed, depth + 1, visitedForms));
    }
  }
  return out;
}

async function main() {
for (let pageIdx = 0; pageIdx < pageObjNums.length; pageIdx++) {
  const pageNum = pageObjNums[pageIdx];
  const pageDict = getObj(pageNum).dict;
  const resDict = resolveResourcesDict(pageDict);

  let contentBytes = null;
  try {
    contentBytes = getContentBytes(pageDict);
  } catch (e) {
    console.warn(`page ${pageIdx + 1}: content decode failed: ${e.message}`);
  }

  const orderedImageObjNums = collectImageObjNumsInOrder(resDict, contentBytes, 0, new Set());

  let orderInPage = 0;
  for (const objNum of orderedImageObjNums) {
    const xo = getObj(objNum);
    if (!xo) continue;
    orderInPage++;
    globalCounter++;

    const width = findNum(xo.dict, "Width");
    const height = findNum(xo.dict, "Height");
    if (!width || !height) continue;

    const raw = getStreamBytes(objNum);
    if (!raw) continue;

    let sharpImg;
    try {
      if (/\/Filter\s*\/DCTDecode/.test(xo.dict)) {
        sharpImg = sharp(raw, { failOn: "none" });
      } else if (/\/Filter\s*\/FlateDecode/.test(xo.dict)) {
        const isGray = /\/ColorSpace\s*\/DeviceGray/.test(xo.dict);
        const channels = isGray ? 1 : 3;
        const pixels = zlib.inflateSync(raw);
        const expected = width * height * channels;
        if (pixels.length !== expected) {
          console.warn(
            `obj ${objNum}: size mismatch (got ${pixels.length}, expected ${expected}), skipping`
          );
          continue;
        }
        sharpImg = sharp(pixels, { raw: { width, height, channels } });
      } else {
        continue; // unsupported filter
      }

      // Attach SMask alpha if present (Flate DeviceGray, same dims, verified earlier).
      const smaskNum = findRef(xo.dict, "SMask");
      let hasAlpha = false;
      if (smaskNum !== null) {
        const smaskObj = getObj(smaskNum);
        const smaskRaw = getStreamBytes(smaskNum);
        const smW = findNum(smaskObj.dict, "Width");
        const smH = findNum(smaskObj.dict, "Height");
        if (smaskRaw && smW && smH) {
          try {
            const smPixels = zlib.inflateSync(smaskRaw);
            if (smPixels.length === smW * smH) {
              const alphaBuf = smW === width && smH === height
                ? smPixels
                : await sharp(smPixels, { raw: { width: smW, height: smH, channels: 1 } })
                    .resize(width, height)
                    .raw()
                    .toBuffer();
              sharpImg = sharpImg
                .ensureAlpha()
                .joinChannel(alphaBuf, { raw: { width, height, channels: 1 } });
              hasAlpha = true;
            }
          } catch (e) {
            // no alpha, continue without it
          }
        }
      }

      const pixelBuffer = await sharpImg.raw().toBuffer();
      const hash = crypto.createHash("sha256").update(pixelBuffer).digest("hex").slice(0, 12);

      const maxDim = 1920;
      let pipeline = sharp(pixelBuffer, {
        raw: { width, height, channels: hasAlpha ? 4 : 3 },
      });
      if (width > maxDim || height > maxDim) {
        pipeline = pipeline.resize({ width: maxDim, height: maxDim, fit: "inside" });
      }
      const isLogoLike = hasAlpha || (width <= 800 && height <= 800);
      pipeline = isLogoLike
        ? pipeline.webp({ lossless: true })
        : pipeline.webp({ quality: 82 });

      const dupOf = seenHashes.get(hash);
      const filename = `p${String(pageIdx + 1).padStart(2, "0")}-${String(
        orderInPage
      ).padStart(2, "0")}-${width}x${height}-${hash}.webp`;

      if (dupOf) {
        manifest.push({ file: filename, page: pageIdx + 1, width, height, hasAlpha, duplicateOf: dupOf });
        continue; // skip writing duplicate pixel content
      }
      seenHashes.set(hash, filename);

      const outPath = path.join(outDir, filename);
      await pipeline.toFile(outPath);
      manifest.push({ file: filename, page: pageIdx + 1, width, height, hasAlpha });
    } catch (e) {
      console.warn(`obj ${objNum} (page ${pageIdx + 1}) failed: ${e.message}`);
    }
  }
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
const written = manifest.filter((m) => !m.duplicateOf).length;
console.log(`\nDone. ${written} unique images written, ${manifest.length - written} duplicates skipped.`);
console.log(`Output: ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
