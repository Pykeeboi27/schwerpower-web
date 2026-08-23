export type FeaturedProject = {
  name: string;
  /** Per-project override — only Transportation & Infrastructure needs this;
   *  every other sector shares one Sector.productsSupplied list instead. */
  productsSupplied?: string[];
};

export type Sector = {
  slug: string;
  name: string;
  tagline: string;
  featuredProjects: FeaturedProject[];
  /** Sector-wide list. Omit when featured projects carry their own instead. */
  productsSupplied?: string[];
  image?: string;
  /** Thumbnail strip shown alongside the hero image. */
  gallery?: string[];
};

export const sectors: Sector[] = [
  {
    slug: "industrial",
    name: "Industrial Facilities",
    tagline: "Reliable power distribution for manufacturing plants and heavy industries.",
    featuredProjects: [
      { name: "URC Sonedco" },
      { name: "URC La Carlota" },
      { name: "URC Passi" },
      { name: "Eagle Cement" },
      { name: "Various Feedmill Projects" },
    ],
    productsSupplied: [
      "Low Voltage Switchgears",
      "Motor Control Centers",
      "Panelboards",
      "Cable Ladder",
      "Control Panel",
      "Retrofitting Works",
    ],
    image: "/projects/industrial-hero.webp",
    gallery: [
      "/projects/industrial-cement-01.webp",
      "/projects/industrial-cement-02.webp",
      "/projects/industrial-cement-03.webp",
      "/projects/industrial-cement-04.webp",
      "/projects/feedmill-aerial.webp",
    ],
  },
  {
    slug: "transportation-infrastructure",
    name: "Transportation & Infrastructure",
    tagline: "Powering transportation systems with dependable electrical solutions.",
    featuredProjects: [
      {
        name: "LRT-1 Extension Project",
        productsSupplied: ["Automatic Transfer Switch (ATS)", "Fire Pump Panel", "Power Distribution Panels"],
      },
      {
        name: "Valenzuela Pumping Stations",
        productsSupplied: ["Low Voltage Switchgear", "MCB", "Transformer", "Cable Tray"],
      },
    ],
    image: "/projects/infrastructure-transit.webp",
  },
  {
    slug: "solar-renewable",
    name: "Solar & Renewable Energy",
    tagline: "Clean energy infrastructure backed by dependable power distribution.",
    featuredProjects: [
      { name: "MSpectrum — Various Solar Projects" },
      { name: "BECIS — Various Solar Projects" },
      { name: "VGreen — Various Charging Stations" },
    ],
    productsSupplied: [
      "Automatic Transfer Switch (ATS)",
      "Low Voltage Switchgears",
      "Combiner Boxes",
      "Cable Ladders",
      "Enclosed Circuit Breakers",
      "Retrofitting Works",
    ],
    image: "/projects/solar-02.webp",
    gallery: ["/projects/solar-01.webp", "/projects/solar-03.webp", "/projects/solar-ev-charging.webp"],
  },
  {
    slug: "healthcare",
    name: "Healthcare Facilities",
    tagline: "Reliable electrical systems for mission-critical healthcare facilities.",
    featuredProjects: [
      { name: "Julius Quiambao Medical Center" },
      { name: "Jose B. Lingad COVID ISO Building" },
      { name: "San Lazaro Hospital" },
      { name: "Jose Reyes Memorial Medical Center" },
      { name: "Tondo Medical Center" },
    ],
    productsSupplied: [
      "Low Voltage Switchgears",
      "Motor Control Centers",
      "Panelboards",
      "Cable Ladder",
      "Control Panel",
      "Retrofitting Works",
    ],
    image: "/projects/hospital-02.webp",
    gallery: [
      "/projects/hospital-01.webp",
      "/projects/hospital-03.webp",
      "/projects/hospital-sanlazaro.webp",
      "/projects/hospital-tondo.webp",
      "/projects/hospital-emergency.webp",
    ],
  },
  {
    slug: "data-centers",
    name: "Data Centers",
    tagline: "Mission-critical power infrastructure requiring maximum reliability.",
    featuredProjects: [{ name: "ePLDT Clark" }, { name: "ePLDT Cebu" }, { name: "ePLDT Pasig" }],
    productsSupplied: [
      "Low Voltage Switchgears",
      "Synchronizing Panel",
      "Automatic Transfer Switch",
      "Panelboards",
      "Cable Trays",
      "Enclosed Circuit Breaker",
    ],
    image: "/projects/datacenter-racks.webp",
    gallery: [
      "/projects/epldt-vitro-pasig.webp",
      "/projects/vitro-pasig-night.webp",
      "/projects/datacenter-vitro-building.webp",
    ],
  },
  {
    slug: "mixed-use",
    name: "Mixed-Use Developments",
    tagline: "Reliable electrical power distribution for modern high-rise living.",
    featuredProjects: [
      { name: "WeeComm Centre" },
      { name: "Grand Mesa Residences" },
      { name: "Jacinta Enclaves" },
      { name: "Baron Luxe" },
    ],
    productsSupplied: [
      "Busduct",
      "Low Voltage Switchgears",
      "Panelboards",
      "Unit Panels",
      "Enclosed Circuit Breakers",
    ],
    image: "/projects/mixeduse-02.webp",
    gallery: [
      "/projects/mixeduse-03.webp",
      "/projects/mixeduse-04.webp",
      "/projects/mixeduse-05.webp",
      "/projects/mixeduse-06.webp",
    ],
  },
];

export type CaseStudy = {
  slug: string;
  name: string;
  description: string;
  productsSupplied: string[];
  projectType: string;
  location: string;
  status: string;
  image: string;
  gallery?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "yuchengco-centre",
    name: "The Yuchengco Centre",
    description:
      "A premium grade-A office development in the heart of Makati City, designed to deliver world-class business spaces and exceptional experiences.",
    productsSupplied: ["Low Voltage Switchgear", "Synchronizing Panel", "Busduct", "Panelboards"],
    projectType: "Commercial High-Rise",
    location: "Makati, Philippines",
    status: "Successfully Delivered",
    image: "/projects/yuchengco-centre.webp",
    gallery: ["/projects/yuchengco-install-01.webp", "/projects/yuchengco-install-02.webp"],
  },
  {
    slug: "boracay-central",
    name: "Boracay Central",
    description:
      "A premier commercial development in the heart of Boracay Island, providing world-class retail, dining, and lifestyle spaces.",
    productsSupplied: [
      "Medium Voltage Switchgear",
      "Low Voltage Switchgear",
      "Transformer",
      "Automatic Voltage Regulator",
    ],
    projectType: "Commercial",
    location: "Boracay, Philippines",
    status: "Successfully Delivered",
    image: "/projects/boracay-central.webp",
    gallery: ["/projects/boracay-detail-01.webp"],
  },
];
