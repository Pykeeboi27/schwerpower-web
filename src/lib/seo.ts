import type { Metadata } from "next";

import { company } from "@/lib/content/company";

// Shared Open Graph fields, hoisted here so any page that sets its own
// `openGraph` (which shallow-merges and would otherwise wipe the parent's
// `images`/`siteName`) can spread this in first.
export const siteUrl = "https://www.schwerpower.com";

export const defaultOpenGraph: Metadata["openGraph"] = {
  siteName: "Schwer Power Manufacturing Corporation",
  images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  locale: "en_US",
  type: "website",
};

/**
 * schema.org LocalBusiness describing SPMC, emitted once site-wide from the
 * root layout. `LocalBusiness` (a subclass of `Organization`) is the type that
 * drives Google's business panel, and it is the correct choice here because
 * the company operates from a single physical plant.
 *
 * Every value is sourced from `company.ts` — nothing here is invented. The
 * phone is the same number in E.164 form, which schema.org expects: the stored
 * "(02) 7002-1252" is a Metro Manila landline, so it takes the +63 country
 * code and 2 area code.
 *
 * Deliberately omitted, because we have no verified values for them:
 * `geo` (lat/long) and `openingHoursSpecification`. Both meaningfully improve
 * local ranking — add them once confirmed.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: company.legalName,
  alternateName: company.shortName,
  slogan: company.tagline,
  description: company.about,
  url: siteUrl,
  logo: `${siteUrl}/brand/spmc-logo.webp`,
  image: `${siteUrl}/opengraph-image`,
  telephone: "+63-2-7002-1252",
  email: company.emails.info,
  address: {
    "@type": "PostalAddress",
    streetAddress: "55A Saint Dominic St., ITC Compound, Brgy. Bagbaguin",
    addressLocality: "Valenzuela City",
    addressRegion: "Metro Manila",
    postalCode: "1440",
    addressCountry: "PH",
  },
  areaServed: {
    "@type": "Country",
    name: "Philippines",
  },
  knowsAbout: [
    "Panel board fabrication",
    "Switchgear fabrication",
    "Medium voltage switchgear",
    "Low voltage switchgear",
    "Retrofitting works",
    "Preventive maintenance",
  ],
};
