export type Sector = {
  slug: string;
  name: string;
  tagline: string;
  featuredProjects: string[];
  productsSupplied: string[];
  image?: string;
};

export const sectors: Sector[] = [
  {
    slug: "healthcare",
    name: "Healthcare Facilities",
    tagline: "Reliable electrical systems for mission-critical healthcare facilities.",
    featuredProjects: [
      "Julius Quiambao Medical Center",
      "Jose B. Lingad COVID ISO Building",
      "San Lazaro Hospital",
      "Jose Reyes Memorial Medical Center",
      "Tondo Medical Center",
    ],
    productsSupplied: [
      "Low Voltage Switchgears",
      "Motor Control Centers",
      "Panelboards",
      "Cable Ladder",
      "Control Panel",
      "Retrofitting Works",
    ],
    image: "/projects/hospital-sanlazaro.webp",
  },
  {
    slug: "data-centers",
    name: "Data Centers",
    tagline: "Mission-critical power infrastructure requiring maximum reliability.",
    featuredProjects: ["ePLDT Clark", "ePLDT Cebu", "ePLDT Pasig"],
    productsSupplied: [
      "Low Voltage Switchgears",
      "Synchronizing Panel",
      "Automatic Transfer Switch",
      "Panelboards",
      "Cable Trays",
      "Enclosed Circuit Breaker",
    ],
    image: "/projects/datacenter-racks.webp",
  },
  {
    slug: "mixed-use",
    name: "Mixed-Use Developments",
    tagline: "Reliable electrical power distribution for modern high-rise living.",
    featuredProjects: ["WeeComm Centre", "Grand Mesa Residences", "Jacinta Enclaves", "Baron Luxe"],
    productsSupplied: [
      "Busduct",
      "Low Voltage Switchgears",
      "Panelboards",
      "Unit Panels",
      "Enclosed Circuit Breakers",
    ],
    image: "/projects/mixeduse-01.webp",
  },
  {
    slug: "industrial",
    name: "Industrial Facilities",
    tagline: "Reliable power distribution for manufacturing plants and heavy industries.",
    featuredProjects: [
      "URC Sonedco",
      "URC La Carlota",
      "URC Passi",
      "Eagle Cement",
      "Various Feedmill Projects",
    ],
    productsSupplied: [
      "Low Voltage Switchgears",
      "Motor Control Centers",
      "Panelboards",
      "Cable Ladder",
      "Control Panel",
      "Retrofitting Works",
    ],
    image: "/projects/industrial-cement-01.webp",
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
    image: "/projects/installed-switchgear-01.webp",
  },
];
