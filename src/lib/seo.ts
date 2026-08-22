import type { Metadata } from "next";

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
