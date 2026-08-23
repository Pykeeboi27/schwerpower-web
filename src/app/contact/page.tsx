import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Schwer Power Manufacturing Corporation — Valenzuela City, Philippines. Sales, technical, and account contacts.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's power your next project"
          lede="Have a question or a project in mind? Send us a message and our team will get back to you."
        />
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="space-y-5 rounded-xl bg-black p-8 text-white shadow-[var(--shadow-md)]">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span className="text-sm text-white/80">{company.address.full}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 shrink-0 text-brand" />
                    <a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`} className="text-sm text-white/80 hover:text-white">
                      {company.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 shrink-0 text-brand" />
                    <div className="flex flex-col text-sm text-white/80">
                      <a href={`mailto:${company.emails.info}`} className="hover:text-white">
                        {company.emails.info}
                      </a>
                      <a href={`mailto:${company.emails.sales}`} className="hover:text-white">
                        {company.emails.sales}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="rounded-xl bg-white p-8 ring-1 ring-foreground/10 shadow-[var(--shadow-md)]">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
