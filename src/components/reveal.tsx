"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fade/rise-in on scroll. Guarded inside useEffect since IntersectionObserver
 * is a browser-only API — this component still prerenders to static HTML
 * (visible by default) during `next build`, per the static-export docs.
 *
 * Reduced motion is handled declaratively via Tailwind's `motion-reduce:`
 * variant rather than a JS branch, so the only setState call happens inside
 * the observer's callback (an external-event handler) and not synchronously
 * in the effect body.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // A ratio-based threshold never fires for blocks taller than the
      // viewport (e.g. the single-column product grid on mobile), so trigger
      // on any intersection and use a bottom inset for the same "scrolled
      // into view" feel instead.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
