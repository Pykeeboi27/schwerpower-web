const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = process.argv[2];
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webp")).sort();

const THUMB = 180;
const PAD = 6;
const COLS = 6;
const ROWS = 6;
const PER_SHEET = COLS * ROWS;
const LABEL_H = 16;
const cellW = THUMB + PAD * 2;
const cellH = THUMB + PAD * 2 + LABEL_H;

async function makeSheet(batch, outPath) {
  const composites = [];
  for (let i = 0; i < batch.length; i++) {
    const f = batch[i];
    const col = i % COLS,
      row = Math.floor(i / COLS);
    const thumbBuf = await sharp(path.join(dir, f))
      .resize(THUMB, THUMB, { fit: "inside" })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png()
      .toBuffer();
    const meta = await sharp(thumbBuf).metadata();
    const x = col * cellW + PAD + Math.floor((THUMB - meta.width) / 2);
    const y = row * cellH + PAD + Math.floor((THUMB - meta.height) / 2);
    composites.push({ input: thumbBuf, left: x, top: y });
  }
  const sheetW = COLS * cellW;
  const sheetH = ROWS * cellH;
  await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: { r: 30, g: 30, b: 30 } },
  })
    .composite(composites)
    .png()
    .toFile(outPath);
}

(async () => {
  const index = [];
  for (let s = 0; s * PER_SHEET < files.length; s++) {
    const batch = files.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
    const outPath = path.join(dir, `_sheet-${String(s + 1).padStart(2, "0")}.png`);
    await makeSheet(batch, outPath);
    index.push({ sheet: path.basename(outPath), files: batch });
    console.log("wrote", outPath, "with", batch.length, "images");
  }
  fs.writeFileSync(path.join(dir, "_sheet-index.json"), JSON.stringify(index, null, 2));
})();
