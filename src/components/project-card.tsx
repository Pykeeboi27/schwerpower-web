import Image from "next/image";
import type { Sector } from "@/lib/content/projects";

export function ProjectCard({ sector }: { sector: Sector }) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10 shadow-[var(--shadow-md)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {sector.image ? (
          <Image
            src={sector.image}
            alt={sector.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
        <h3 className="font-heading absolute bottom-4 left-5 text-xl font-semibold text-white">
          {sector.name}
        </h3>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{sector.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {sector.featuredProjects.slice(0, 3).map((project) => (
            <li
              key={project}
              className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground/70"
            >
              {project}
            </li>
          ))}
          {sector.featuredProjects.length > 3 ? (
            <li className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground/70">
              +{sector.featuredProjects.length - 3} more
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
