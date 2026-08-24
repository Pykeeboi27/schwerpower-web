import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  on = "light",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  on?: "light" | "dark";
  align?: "left" | "center";
  /**
   * Heading level. Defaults to `h2` for in-page sections; page heroes pass
   * `h1` so every route has exactly one top-level heading for search engines.
   * Purely semantic — the visual size is unchanged either way.
   */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow on={on} className="mb-3">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          "font-heading text-4xl leading-[0.95] font-medium tracking-[-0.01em] text-balance sm:text-5xl",
          on === "dark" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            on === "dark" ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
