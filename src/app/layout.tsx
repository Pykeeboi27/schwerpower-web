import type { Metadata, Viewport } from "next";
import "./globals.css";

import { display, body } from "./fonts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { defaultOpenGraph, organizationJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Schwer Power Manufacturing Corp",
    default: "Schwer Power Manufacturing Corp — Your Trusted Fabricator",
  },
  description:
    "Panel boards and switchgear fabrication in Valenzuela City, Philippines. Powering progress, built on trust.",
  openGraph: {
    ...defaultOpenGraph,
    title: "Schwer Power Manufacturing Corp",
    description: "Your trusted partner in electrical power distribution solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <JsonLd data={organizationJsonLd} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
