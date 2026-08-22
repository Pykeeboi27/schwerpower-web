import Link from "next/link";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { company } from "@/lib/content/company";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-ash/60 bg-background/90 px-4 shadow-[var(--shadow-md)] backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/brand/spmc-logo.webp"
            alt={company.legalName}
            width={36}
            height={36}
            className="size-9"
          />
          <span className="font-heading hidden text-sm leading-tight font-semibold tracking-tight sm:block">
            SCHWER POWER
            <span className="block text-[10px] font-normal tracking-[0.05em] text-muted-foreground">
              MANUFACTURING CORP
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden bg-brand text-black hover:bg-brand/90 sm:inline-flex"
            )}
          >
            Get a Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
