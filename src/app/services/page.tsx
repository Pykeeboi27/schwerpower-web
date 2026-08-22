import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { ProcessStep } from "@/components/process-step";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/lib/content/services";
import { processSteps } from "@/lib/content/process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom fabrication, retrofitting works, and preventive maintenance services from Schwer Power Manufacturing Corporation.",
};

const machines = [
  { src: "/facility/machine-cnc-bender.webp", alt: "CNC bender" },
  { src: "/facility/machine-cnc-turret.webp", alt: "CNC turret punch" },
  { src: "/facility/machine-02.webp", alt: "CNC busbar processing" },
  { src: "/facility/under-construction-01.webp", alt: "Painting booth and oven" },
  { src: "/facility/assembly-area.webp", alt: "Assembly and testing area" },
  { src: "/facility/engineer-switchgear-row.webp", alt: "Switchgear assembly floor" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Our Services"
          title="Built around your project"
          lede="From custom fabrication to retrofits and ongoing maintenance, our engineers design solutions to your specific needs."
        />
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  index={i + 1}
                  title={service.title}
                  description={service.description}
                  scope={"scope" in service ? service.scope : undefined}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ash bg-surface py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Our Process" title="From design to delivery" align="center" className="mx-auto" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-16">
              {processSteps.map((step) => (
                <ProcessStep key={step.step} data={step} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our Machines"
              title="A fabrication floor built for precision"
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine) => (
                <div
                  key={machine.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] bg-surface"
                >
                  <Image
                    src={machine.src}
                    alt={machine.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
