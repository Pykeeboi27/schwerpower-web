import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { company } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vision, mission, and core values behind Schwer Power Manufacturing Corporation — a Valenzuela-based fabricator of panel boards and switchgears.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/facility/office-building-exterior.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <SectionHeading
            on="dark"
            eyebrow="About Us"
            title="Your trusted, dependable fabrication partner"
            lede={company.about}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-8 ring-1 ring-foreground/10 shadow-[var(--shadow-md)]">
              <span className="text-xs font-semibold tracking-[0.05em] text-brand-ink uppercase">
                Vision
              </span>
              <p className="font-heading mt-3 text-2xl leading-snug font-medium tracking-[-0.01em]">
                {company.vision}
              </p>
            </div>
            <div className="rounded-xl bg-black p-8 text-white shadow-[var(--shadow-md)]">
              <span className="text-xs font-semibold tracking-[0.05em] text-brand uppercase">
                Mission
              </span>
              <p className="mt-3 text-base leading-relaxed text-white/80">{company.mission}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-ash bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Core Values" title="What guides every project" align="center" className="mx-auto" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {company.coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl bg-white p-6 ring-1 ring-foreground/10 shadow-[var(--shadow-md)]"
                >
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-brand-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <SectionHeading
                eyebrow="Built on Global Standards"
                title="Excellence is more than a promise"
                lede={company.globalStandards}
              />
              <div className="relative aspect-[4/1]">
                <Image
                  src="/facility/data-center-aisle.webp"
                  alt="ISO-certified facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="rounded-[var(--radius-image)] object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ash bg-surface py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Organizational Structure"
              title="A team built for execution"
              lede={company.orgStructure}
              align="center"
              className="mx-auto"
            />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
