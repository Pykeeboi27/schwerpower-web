import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { ServiceCard } from "@/components/service-card";
import { ProcessStep } from "@/components/process-step";
import { ProjectCard } from "@/components/project-card";
import { PartnerLogo } from "@/components/partner-logo";
import { Stat } from "@/components/stat";
import { CtaBand } from "@/components/cta-band";

import { company } from "@/lib/content/company";
import { products } from "@/lib/content/products";
import { services } from "@/lib/content/services";
import { processSteps } from "@/lib/content/process";
import { sectors } from "@/lib/content/projects";
import { partners, clients } from "@/lib/content/partners";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/facility/hero-switchgear-glow.webp"
            alt="Schwer Power switchgear installation"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-28 sm:px-6 sm:py-36">
          <Eyebrow on="dark">{company.positioning}</Eyebrow>
          <p className="font-heading text-lg font-semibold tracking-tight text-white/90 sm:text-xl">
            {company.legalName}
          </p>
          <h1 className="font-heading max-w-3xl text-5xl leading-[0.9] font-medium tracking-[-0.01em] text-white sm:text-7xl">
            {company.tagline}
          </h1>
          <p className="max-w-xl text-lg text-white/70">{company.about}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "bg-brand text-black hover:bg-brand/90")}
            >
              Get a Quote
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 bg-transparent text-white hover:bg-white/10"
              )}
            >
              View Products
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative border-t border-white/10 bg-black/40">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
            {company.descriptors.map((descriptor) => (
              <div key={descriptor} className="py-5 text-center">
                <span className="text-sm font-semibold tracking-[0.05em] text-white/80 uppercase">
                  {descriptor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="About Us"
              title="Panel boards and Switchgear fabrication, done right."
              lede={company.about}
            />
            <div className="flex flex-col gap-8 border-t border-ash pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
              <Stat value="1-Stop" label="Concept to finished product" />
              <div>
                <Eyebrow>ISO Certified</Eyebrow>
                <Image
                  src="/brand/iso-certifications.webp"
                  alt="ISO 9001:2015 Quality, ISO 14001:2015 Environmental, and ISO 45001:2018 Occupational Health and Safety certified"
                  width={1326}
                  height={464}
                  className="mt-4 h-24 w-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Product lines */}
      <section className="border-t border-ash bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our Product Lines"
              title="Everything you need for reliable power distribution"
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View all products
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Our Services" title="Built around your project" align="center" className="mx-auto" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  index={i + 1}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process strip */}
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

      {/* Featured projects */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our Projects"
              title="Delivered across every sector"
              lede="SPMC has successfully delivered electrical distribution solutions across commercial, industrial, healthcare, infrastructure, and data center projects nationwide."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sectors.map((sector) => (
                <ProjectCard key={sector.slug} sector={sector} />
              ))}
            </div>
          </Reveal>
          <div className="mt-10 text-center">
            <Link href="/projects" className={buttonVariants({ variant: "outline", size: "lg" })}>
              View all projects
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-ash bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Brand Partners" title="Licensed to build with the best" align="center" className="mx-auto" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {partners.map((partner) => (
                <PartnerLogo key={partner.name} name={partner.name} logo={partner.logo} scale={partner.scale} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Major Clients" title="Trusted by industry leaders" align="center" className="mx-auto" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {clients.map((client) => (
                <PartnerLogo key={client.name} name={client.name} logo={client.logo} scale={client.scale} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
