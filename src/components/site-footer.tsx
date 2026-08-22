import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { company } from "@/lib/content/company";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            {/* Raster logo mark isn't used here: its gray wordmark reads
                near-invisible on black, so the brand name is set in type. */}
            <span className="font-heading block text-xl font-semibold tracking-tight">
              SCHWER POWER
              <span className="block text-xs font-normal tracking-[0.05em] text-white/50">
                MANUFACTURING CORP
              </span>
            </span>
            <p className="mt-4 max-w-sm text-sm text-white/60">{company.tagline}</p>
          </div>

          <div>
            <span className="text-xs font-semibold tracking-[0.05em] text-brand uppercase">
              Navigate
            </span>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-semibold tracking-[0.05em] text-brand uppercase">
              Contact
            </span>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>{company.address.full}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-white/40" />
                <a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-white/40" />
                <a href={`mailto:${company.emails.sales}`} className="hover:text-white">
                  {company.emails.sales}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Schwer Power Manufacturing Corporation. All rights reserved.</p>
          <p>{company.website}</p>
        </div>
      </div>
    </footer>
  );
}
