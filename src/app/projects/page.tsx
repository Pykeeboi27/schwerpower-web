import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";
import { CtaBand } from "@/components/cta-band";
import { sectors, caseStudies } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Electrical distribution solutions delivered by Schwer Power Manufacturing Corporation across commercial, industrial, healthcare, and data center projects nationwide.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Our Projects"
          title="Delivered across every sector"
          lede="SPMC has successfully delivered electrical distribution solutions across commercial, industrial, healthcare, infrastructure, and data center projects nationwide."
        />
      </section>

      {sectors.map((sector, i) => (
        <section
          key={sector.slug}
          className={i % 2 === 1 ? "border-t border-ash bg-surface py-20" : "border-t border-ash py-20"}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <SectionHeading eyebrow={sector.name} title={sector.tagline} />
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <span className="text-xs font-semibold tracking-[0.05em] text-muted-foreground uppercase">
                        Featured Projects
                      </span>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {sector.featuredProjects.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-semibold tracking-[0.05em] text-muted-foreground uppercase">
                        Products Supplied
                      </span>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {sector.productsSupplied.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {sector.image ? (
                  <div className={`relative aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image
                      src={sector.image}
                      alt={sector.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="rounded-[var(--radius-image)] object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Case Studies" title="A closer look" align="center" className="mx-auto" />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {caseStudies.map((project) => (
              <Reveal key={project.slug}>
                <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10 shadow-[var(--shadow-md)]">
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Eyebrow>{project.projectType} · {project.location}</Eyebrow>
                    <h3 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.productsSupplied.map((p) => (
                        <li
                          key={p}
                          className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground/70"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs font-semibold tracking-[0.05em] text-brand-ink uppercase">
                      {project.status}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
