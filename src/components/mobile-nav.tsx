"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Reset on route change: adjusted during render (React's documented
  // pattern for "resetting state when a prop/value changes") rather than
  // in an effect, so it doesn't trigger a synchronous setState-in-effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-full text-foreground"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Portaled to <body>: the header pill has backdrop-blur, which (per
          the CSS Filter Effects spec) makes it a containing block for
          position:fixed descendants — without the portal this overlay
          positions relative to the 64px pill instead of the viewport. */}
      {open
        ? createPortal(
            <div className="fixed inset-0 top-[64px] z-40 flex flex-col bg-black px-6 py-10">
              <nav className="flex flex-1 flex-col justify-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-heading py-2 text-4xl font-medium tracking-[-0.01em] text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
