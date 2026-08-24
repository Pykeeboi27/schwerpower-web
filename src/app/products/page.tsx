import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { CtaBand } from "@/components/cta-band";
import { products } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Medium and low voltage switchgear, cast resin transformers, busduct, panelboards, and more — fabricated by Schwer Power Manufacturing Corporation.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          as="h1"
          eyebrow="Our Product Lines"
          title="Everything you need for reliable power distribution"
          lede="A one-stop production process from initial conceptualization to final finished products."
        />
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
