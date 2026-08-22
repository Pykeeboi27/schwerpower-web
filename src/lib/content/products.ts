export type Product = {
  name: string;
  description: string;
  image?: string;
};

export const products: Product[] = [
  {
    name: "Medium Voltage Switchgear",
    description:
      "Engineered switchgear for reliable medium-voltage power distribution and protection.",
    image: "/products/medium-voltage-switchgear.webp",
  },
  {
    name: "Low Voltage Switchgear",
    description: "Custom-built LV switchgear for safe, efficient power distribution.",
    image: "/products/switchgear-01.webp",
  },
  {
    name: "Cast Resin Transformer",
    description: "Durable, maintenance-friendly transformers for demanding installations.",
    image: "/products/transformer.webp",
  },
  {
    name: "Busduct",
    description: "Precision-fabricated busduct for clean, high-capacity power runs.",
    image: "/products/busduct.webp",
  },
  {
    name: "Capacitor Bank",
    description: "Power factor correction equipment built to industry standards.",
    image: "/products/capacitor-bank.webp",
  },
  {
    name: "Synchronizing Panel",
    description: "Control panels for seamless synchronization of power sources.",
    image: "/products/synchronizing-panel.webp",
  },
  {
    name: "Automatic Transfer Switch",
    description: "Automatic switchover equipment that keeps critical loads powered.",
    image: "/products/automatic-transfer-switch.webp",
  },
  {
    name: "Manual Transfer Switch",
    description: "Reliable manual switchover equipment for backup power systems.",
    image: "/products/manual-transfer-switch.webp",
  },
  {
    name: "Meter Centers",
    description: "Metering equipment built for accuracy and long-term reliability.",
    image: "/products/meter-center.webp",
  },
  {
    name: "Panelboards",
    description: "Distribution, lighting, and power panelboards for every application.",
    image: "/products/panelboard-set.webp",
  },
  {
    name: "Enclosed Circuit Breaker",
    description: "Protective enclosures for dependable circuit breaker installations.",
    image: "/products/enclosed-circuit-breaker.webp",
  },
  {
    name: "Wireways",
    description: "Fabricated wireways for clean, organized cable routing.",
    image: "/products/wireway.webp",
  },
  {
    name: "Retrofitting Works",
    description: "Upgrades that extend the life and performance of existing systems.",
    image: "/products/retrofitting-works.webp",
  },
  {
    name: "Preventive Maintenance",
    description: "Scheduled inspection and testing programs that prevent downtime.",
  },
  {
    name: "Motor Control Center",
    description: "Centralized motor control assemblies built for industrial process lines.",
    image: "/products/motor-control-center.webp",
  },
];
