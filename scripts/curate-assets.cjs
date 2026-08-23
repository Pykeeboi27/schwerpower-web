#!/usr/bin/env node
/**
 * One-off curator: copies the manually-reviewed subset of extracted PDF
 * images from the scratchpad into public/, with semantic filenames.
 * Not part of the shipped app.
 *
 * usage: node scripts/curate-assets.cjs <scratchpadDir> <publicDir>
 */
const fs = require("fs");
const path = require("path");

const [, , srcDirArg, publicDirArg] = process.argv;
if (!srcDirArg || !publicDirArg) {
  console.error("usage: curate-assets.cjs <scratchpadDir> <publicDir>");
  process.exit(1);
}
const srcDir = path.resolve(srcDirArg);
const publicDir = path.resolve(publicDirArg);

// [sourceFilename, destRelativePath]
const KEEP = [
  // Brand
  ["p01-03-450x450-fbdcd517752f.webp", "brand/spmc-logo.webp"],

  // Hero / facility
  ["p01-01-1536x1024-14f5be1895b5.webp", "facility/hero-switchgear-glow.webp"],
  ["p04-01-750x525-466637cdcf41.webp", "facility/engineer-switchgear-row.webp"],
  ["p02-03-2592x1944-4a9b0ba749cb.webp", "facility/office-building-exterior.webp"],
  ["p03-02-808x455-c428af3bdf82.webp", "facility/data-center-aisle.webp"],
  ["p22-05-2048x1536-d3c0caa49cc1.webp", "facility/warehouse-interior.webp"],
  ["p06-08-1000x750-62b9e7784871.webp", "facility/under-construction-01.webp"],
  ["p06-09-1000x750-6102d5e25001.webp", "facility/under-construction-02.webp"],
  ["p06-10-1000x750-55fb2017a049.webp", "facility/under-construction-03.webp"],
  ["p06-12-1000x750-1e52cd426582.webp", "facility/assembly-area.webp"],

  // Machines
  ["p05-04-1686x843-484d2236229e.webp", "facility/machine-cnc-turret.webp"],
  ["p06-05-960x960-a0f6fd6159ef.webp", "facility/machine-cnc-bender.webp"],
  ["p06-06-1152x648-b02e5ecda073.webp", "facility/machine-02.webp"],
  ["p06-07-1431x596-ae678c41302e.webp", "facility/machine-03.webp"],

  // Process steps
  ["p05-06-1500x1001-9771017e5588.webp", "process/press-brake.webp"],
  ["p05-07-1511x1008-1c6a7a1b68e1.webp", "process/welding.webp"],
  ["p05-08-1080x720-4064b4d3a541.webp", "process/wiring.webp"],
  ["p05-09-1469x980-71d5cc4590a4.webp", "process/qaqc-testing.webp"],
  ["p06-11-653x889-f5bb1df76c21.webp", "process/panel-fitting.webp"],

  // Products
  ["p03-09-1536x1024-39e87b97a7e8.webp", "products/switchgear-01.webp"],
  ["p03-11-1536x1024-a2c023aa1d37.webp", "products/cable-ladder.webp"],
  ["p03-13-1536x1024-e919789e559d.webp", "products/wireway.webp"],
  ["p03-15-422x481-bd5e0aea0c46.webp", "products/transformer.webp"],
  ["p03-16-611x435-8137a9fce54b.webp", "products/busduct.webp"],
  ["p03-18-1536x1024-3ce14086b0a3.webp", "products/lineup.webp"],
  ["p15-06-1400x1400-22f48d7d3604.webp", "products/switchgear-02.webp"],
  ["p15-08-898x700-b565d6cf0855.webp", "products/automatic-transfer-switch.webp"],
  ["p16-08-1650x1158-e36a7a7be4a1.webp", "products/connector-detail.webp"],
  ["p17-08-2688x1792-24d559024701.webp", "products/switchgear-03.webp"],
  ["p18-07-800x600-9ec53eadf077.webp", "products/switchgear-04.webp"],
  ["p19-11-1344x1344-6ae3c7d6d6d8.webp", "products/ats-panel-open.webp"],
  ["p12-04-316x229-6d55d1924c3d.webp", "products/panelboard-installed.webp"],
  ["p12-06-446x298-553157a12364.webp", "products/panelboard-set.webp"],
  ["p13-06-237x202-1966f62baeb4.webp", "products/cabinet-generic.webp"],
  ["p13-05-338x190-b70a39159cb6.webp", "products/transformer-siemens.webp"],
  ["p13-08-1024x768-d3c8a9ca6838.webp", "products/switchgear-detail-spmc.webp"],
  ["p12-03-302x227-9ebebfd51e5e.webp", "products/switchgear-05-small.webp"],

  // Projects
  ["p10-01-2400x1600-124510975912.webp", "projects/commercial-building-exterior.webp"], // unused (stock decor, not project-specific)
  ["p11-01-1536x1024-e95ab65da273.webp", "projects/installed-switchgear-01.webp"], // unused (generic switchgear stock, not Boracay)
  ["p12-01-2044x1188-a4ff90e3db38.webp", "projects/yuchengco-centre.webp"],
  ["p12-07-755x566-fc0f3bbaff98.webp", "projects/yuchengco-install-01.webp"],
  ["p12-08-790x572-26d3d441fa6b.webp", "projects/yuchengco-install-02.webp"],
  ["p13-01-1600x2000-a03c24c4acbd.webp", "projects/boracay-central.webp"], // real Boracay Central hero (was missing)
  ["p13-08-1024x768-d3c8a9ca6838.webp", "projects/boracay-detail-01.webp"],
  ["p14-01-2671x2255-bc4beabd517a.webp", "projects/industrial-hero.webp"],
  ["p14-08-474x234-032b061b518c.webp", "projects/industrial-cement-01.webp"],
  ["p14-09-896x504-1bc7fc9eb499.webp", "projects/industrial-cement-02.webp"],
  ["p14-11-474x266-8a26a9ca280f.webp", "projects/industrial-cement-03.webp"],
  ["p14-12-796x388-ee16f9b07ea5.webp", "projects/industrial-cement-04.webp"],
  ["p14-13-474x273-2ef8dea664cb.webp", "projects/feedmill-aerial.webp"],
  ["p15-01-1920x1080-2fe41f34d6fd.webp", "projects/infrastructure-transit.webp"],
  ["p16-01-330x219-13ffe29331fa.webp", "projects/solar-01.webp"],
  ["p16-06-1644x1096-53f593055e41.webp", "projects/solar-02.webp"],
  ["p16-07-1644x1096-ad503654fa64.webp", "projects/solar-03.webp"],
  ["p16-08-1650x1158-e36a7a7be4a1.webp", "projects/solar-ev-charging.webp"], // VGreen charging stations
  ["p17-01-547x365-2db4046c8e6a.webp", "projects/hospital-emergency.webp"],
  ["p17-03-820x615-60e90b68a229.webp", "projects/hospital-01.webp"],
  ["p17-04-672x504-b301eaec4b32.webp", "projects/hospital-02.webp"],
  ["p17-05-474x355-775bf391afae.webp", "projects/hospital-sanlazaro.webp"],
  ["p17-06-642x475-ce09338c0970.webp", "projects/hospital-03.webp"],
  ["p17-07-800x450-df6142ab7077.webp", "projects/hospital-tondo.webp"],
  ["p18-01-2100x1050-139ac2dd2944.webp", "projects/datacenter-racks.webp"],
  ["p18-04-615x820-638fd3c9ea73.webp", "projects/datacenter-vitro-building.webp"], // was misfiled as mixeduse-01
  ["p18-05-474x355-b179ec7b8c06.webp", "projects/epldt-vitro-pasig.webp"],
  ["p18-06-640x640-cd36682cd1ef.webp", "projects/vitro-pasig-night.webp"],
  ["p19-01-1200x800-b6d59bcd3638.webp", "projects/mixeduse-02.webp"],
  ["p19-06-474x267-5a6cd9a57b08.webp", "projects/mixeduse-03.webp"],
  ["p19-07-603x579-c0f5b98db207.webp", "projects/mixeduse-04.webp"],
  ["p19-08-720x540-4a15336b5b1d.webp", "projects/mixeduse-05.webp"],
  ["p19-09-474x266-f0afae30054d.webp", "projects/mixeduse-06.webp"],

  // Partners
  ["p09-04-886x262-7225d8cceed3.webp", "partners/schneider-electric.webp"],
  ["p09-05-356x142-577953384d7d.webp", "partners/abb.webp"],
  ["p09-06-1216x192-b7ddc52b162d.webp", "partners/siemens.webp"],
  ["p09-08-960x960-6af853af8e2b.webp", "partners/himel.webp"],
  ["p09-12-380x250-2488d70ea81b.webp", "partners/huyu.webp"],

  // Clients
  ["p10-05-526x526-d988d601adda.webp", "clients/sparc.webp"],
  ["p10-06-761x243-aa83dffbb255.webp", "clients/wee-community.webp"],
  ["p10-07-200x200-a2790ed99c3a.webp", "clients/triumph.webp"],
  ["p10-08-300x300-2fa6ca2a5fdb.webp", "clients/golden-tw.webp"],
  ["p10-09-768x543-3ba8e934eb7c.webp", "clients/anchor-land.webp"],
  ["p10-10-672x119-71f9becb755c.webp", "clients/bap-construction.webp"],
  ["p10-11-288x172-be3c7f4fc727.webp", "clients/fsb-land-holdings.webp"],
  ["p10-12-525x105-8f1531bc1aa8.webp", "clients/em-cuerpo.webp"],
  ["p10-13-474x147-3360c45b5bfb.webp", "clients/jehan.webp"],
  ["p10-14-406x117-6b03c7435c77.webp", "clients/epldt.webp"],
  ["p10-15-720x149-1b555fbfb595.webp", "clients/universal-robina.webp"],
  ["p10-16-344x206-8040e692118a.webp", "clients/miescor.webp"],
  ["p10-17-216x49-3b918e6095e2.webp", "clients/spectrum.webp"],
  ["p10-18-420x175-cf5857dd9db3.webp", "clients/solar-philippines.webp"],
  ["p10-19-480x320-2fc38948611d.webp", "clients/phinma-energy.webp"],
  ["p10-20-1024x792-8e7db65f912f.webp", "clients/prime-band.webp"],
  ["p10-21-500x116-1a43e6ca7dae.webp", "clients/teamquest.webp"],
  ["p10-22-300x114-caab0ebde78b.webp", "clients/becis.webp"],
  ["p10-24-224x224-51f1db27e98d.webp", "clients/superserve.webp"],
  ["p10-25-200x200-f8851b98a782.webp", "clients/hg3-construction.webp"],
  ["p10-26-504x100-7327dd8c0f73.webp", "clients/trademax.webp"],
  ["p10-27-225x225-ae433e4697e2.webp", "clients/kalayaan-engineering.webp"],
  ["p10-28-1200x630-a29fd8da9b8b.webp", "clients/stonerich.webp"],
  ["p10-29-500x333-986b23681bf2.webp", "clients/datem.webp"],
  ["p10-30-225x225-23a5e8a6bc5a.webp", "clients/eei-corporation.webp"],
  ["p10-31-150x171-e8eda211730f.webp", "clients/eei-power-corp.webp"],
];

let copied = 0;
let missing = 0;
for (const [src, dest] of KEEP) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(publicDir, dest);
  if (!fs.existsSync(srcPath)) {
    console.warn(`MISSING source: ${src}`);
    missing++;
    continue;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  copied++;
}
console.log(`copied ${copied} files, ${missing} missing`);
