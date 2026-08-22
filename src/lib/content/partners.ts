export type Partner = {
  name: string;
  description: string;
  logo: string;
  /** Visual boost for logos whose artwork reads smaller than its neighbors at 1:1. */
  scale?: number;
};

export const partners: Partner[] = [
  {
    name: "Schneider Electric",
    description: "Global leader in energy management and automation. Our licensed panel builder partner.",
    logo: "/partners/schneider-electric.webp",
  },
  {
    name: "ABB",
    description: "Global technology leader in electrification and automation solutions.",
    logo: "/partners/abb.webp",
  },
  {
    name: "Siemens",
    description: "Advanced technology for power transmission and distribution systems.",
    logo: "/partners/siemens.webp",
  },
  {
    name: "Himel",
    description: "Reliable and innovative electrical products for protection and distribution.",
    logo: "/partners/himel.webp",
    scale: 2.3,
  },
  {
    name: "Huyu",
    description: "Reliable and innovative electrical products for protection and distribution.",
    logo: "/partners/huyu.webp",
    scale: 2.0,
  },
];

export type Client = {
  name: string;
  logo: string;
  /** Visual boost for logos whose artwork reads smaller than its neighbors at 1:1. */
  scale?: number;
};

export const clients: Client[] = [
  { name: "SPARC Properties & Realty Corporation", logo: "/clients/sparc.webp", scale: 2.3 },
  { name: "WEE Community Developers", logo: "/clients/wee-community.webp" },
  { name: "Triumph Development Corporation", logo: "/clients/triumph.webp", scale: 2.2 },
  { name: "Golden TW Realty and Development Corporation", logo: "/clients/golden-tw.webp", scale: 2.1 },
  { name: "Anchor Land", logo: "/clients/anchor-land.webp", scale: 2.1 },
  { name: "DATEM", logo: "/clients/datem.webp", scale: 2.1 },
  { name: "FSB Land Holdings", logo: "/clients/fsb-land-holdings.webp" },
  { name: "E.M. Cuerpo, Inc.", logo: "/clients/em-cuerpo.webp" },
  { name: "Jehan Corporation", logo: "/clients/jehan.webp" },
  { name: "ePLDT", logo: "/clients/epldt.webp" },
  { name: "Universal Robina Corporation", logo: "/clients/universal-robina.webp" },
  { name: "Miescor Builders", logo: "/clients/miescor.webp" },
  { name: "Spectrum", logo: "/clients/spectrum.webp" },
  { name: "Solar Philippines", logo: "/clients/solar-philippines.webp" },
  { name: "Phinma Energy", logo: "/clients/phinma-energy.webp", scale: 2.0 },
  { name: "Prime Band", logo: "/clients/prime-band.webp", scale: 2.3 },
  { name: "Metro Stonerich Corporation", logo: "/clients/stonerich.webp", scale: 2.6 },
  { name: "BECIS", logo: "/clients/becis.webp" },
  { name: "EEI Corporation", logo: "/clients/eei-corporation.webp", scale: 2.0 },
  { name: "EEI Power Corp", logo: "/clients/eei-power-corp.webp", scale: 2.0 },
  { name: "Trademax Corporation", logo: "/clients/trademax.webp" },
  { name: "Kalayaan Engineering", logo: "/clients/kalayaan-engineering.webp" },
  { name: "TeamQuest Technology", logo: "/clients/teamquest.webp" },
  { name: "BAP Construction and Development Corporation", logo: "/clients/bap-construction.webp" },
  { name: "SuperServe Corporation", logo: "/clients/superserve.webp", scale: 2.3 },
  { name: "HG-III Construction & Development Corporation", logo: "/clients/hg3-construction.webp", scale: 2.4 },
];
