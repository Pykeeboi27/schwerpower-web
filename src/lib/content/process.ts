export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  image?: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Engineering Design",
    description: "Custom-engineered solutions designed to meet your project requirements.",
    image: "/process/engineering-design.webp",
  },
  {
    step: 2,
    title: "Turret Punching",
    description: "High-precision punching for consistent quality and faster production.",
    image: "/process/turret-punching.webp",
  },
  {
    step: 3,
    title: "Press Brake and Bending",
    description: "Accurate bending for various sizes and customer specifications.",
    image: "/process/press-brake.webp",
  },
  {
    step: 4,
    title: "Welding",
    description: "Certified welders delivering strong, reliable, and high-quality workmanship.",
    image: "/process/welding.webp",
  },
  {
    step: 5,
    title: "Powder Coating",
    description:
      "Premium impact- and moisture-resistant coating available in a wide selection of colors and finishes.",
    image: "/process/powder-coating.webp",
  },
  {
    step: 6,
    title: "Copper Bus Bar Processing",
    description:
      "Precision cutting, punching, and bending for clean, accurate, and burr-free busbars.",
    image: "/process/copper-bus-bar-processing.webp",
  },
  {
    step: 7,
    title: "Switchgear Assembly",
    description:
      "Expert assembly of panelboards and switchgears by highly skilled technicians using precision equipment.",
    image: "/process/switch-gear-assembly.webp",
  },
  {
    step: 8,
    title: "QA/QC",
    description: "Comprehensive quality inspections to ensure compliance with industry standards.",
    image: "/process/qa-qc.webp",
  },
];
