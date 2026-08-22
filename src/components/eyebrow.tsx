import { cn } from "@/lib/utils";

/**
 * All-caps label accent. Pure brand orange only passes contrast on dark
 * surfaces (8.6:1) — on white it drops to 2.5:1, so light surfaces use the
 * darkened --brand-ink token (5.9:1) instead. See globals.css for the
 * full contrast rule.
 */
export function Eyebrow({
  children,
  className,
  on = "light",
}: {
  children: React.ReactNode;
  className?: string;
  on?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "block text-[13px] font-semibold tracking-[0.05em] uppercase",
        on === "light" ? "text-brand-ink" : "text-brand",
        className
      )}
    >
      {children}
    </span>
  );
}
