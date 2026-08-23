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
  },
  {
    name: "Huyu",
    description: "Reliable and innovative electrical products for protection and distribution.",
    logo: "/partners/huyu.webp",
  },
];

export type Client = {
  name: string;
  logo: string;
  /** Visual boost for logos whose artwork reads smaller than its neighbors at 1:1. */
  scale?: number;
};

export const clients: Client[] = [
  { name: "SPARC Properties & Realty Corporation", logo: "/clients/sparc.webp" },
  { name: "WEE Community Developers", logo: "/clients/wee-community.webp" },
  { name: "Triumph Development Corporation", logo: "/clients/triumph.webp" },
  { name: "Golden TW Realty and Development Corporation", logo: "/clients/golden-tw.webp" },
  { name: "Anchor Land", logo: "/clients/anchor-land.webp" },
  { name: "DATEM", logo: "/clients/datem.webp" },
  { name: "FSB Land Holdings", logo: "/clients/fsb-land-holdings.webp" },
  { name: "E.M. Cuerpo, Inc.", logo: "/clients/em-cuerpo.webp" },
  { name: "Jehan Corporation", logo: "/clients/jehan.webp" },
  { name: "ePLDT", logo: "/clients/epldt.webp" },
  { name: "Universal Robina Corporation", logo: "/clients/universal-robina.webp" },
  { name: "Miescor Builders", logo: "/clients/miescor.webp" },
  { name: "Spectrum", logo: "/clients/spectrum.webp" },
  { name: "Solar Philippines", logo: "/clients/solar-philippines.webp" },
  { name: "Phinma Energy", logo: "/clients/phinma-energy.webp" },
  { name: "Prime Band", logo: "/clients/prime-band.webp" },
  { name: "Metro Stonerich Corporation", logo: "/clients/stonerich.webp" },
  { name: "BECIS", logo: "/clients/becis.webp" },
  { name: "EEI Corporation", logo: "/clients/eei-corporation.webp" },
  { name: "EEI Power Corp", logo: "/clients/eei-power-corp.webp" },
  { name: "Trademax Corporation", logo: "/clients/trademax.webp" },
  { name: "Kalayaan Engineering", logo: "/clients/kalayaan-engineering.webp" },
  { name: "TeamQuest Technology", logo: "/clients/teamquest.webp" },
  { name: "BAP Construction and Development Corporation", logo: "/clients/bap-construction.webp" },
  { name: "SuperServe Corporation", logo: "/clients/superserve.webp" },
  { name: "HG-III Construction & Development Corporation", logo: "/clients/hg3-construction.webp" },
];
