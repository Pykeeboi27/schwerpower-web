"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Sector hero image with an optional thumbnail strip that swaps the hero on
 * click. Renders as a plain static hero (no strip, no state) when `gallery`
 * is empty, so sectors without extra photos don't grow an orphan row.
 */
export function ProjectGallery({
  hero,
  gallery,
  alt,
}: {
  hero: string;
  gallery?: string[];
  alt: string;
}) {
  const shots = [hero, ...(gallery ?? [])];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3]">
        <Image
          src={shots[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="rounded-[var(--radius-image)] object-cover"
        />
      </div>
      {gallery && gallery.length > 0 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${alt} photo ${i + 1}`}
              aria-pressed={active === i}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-foreground/10 transition-shadow",
                active === i ? "ring-2 ring-brand" : "hover:ring-foreground/30"
              )}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
