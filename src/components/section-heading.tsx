import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  on = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  on?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow on={on} className="mb-3">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "font-heading text-4xl leading-[0.95] font-medium tracking-[-0.01em] text-balance sm:text-5xl",
          on === "dark" ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
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
