import { Mail, Phone } from "lucide-react";
import type { TeamMember } from "@/lib/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .filter((c) => c === c.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="flex items-start gap-4 rounded-xl bg-white p-5 ring-1 ring-foreground/10 shadow-[var(--shadow-md)]">
      <div className="font-heading flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-foreground/70">
        {initials}
      </div>
      <div className="min-w-0">
        <h3 className="font-heading text-base font-semibold tracking-tight">{member.name}</h3>
        <p className="text-sm text-brand-ink">{member.role}</p>
        <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <a href={`tel:${member.mobile.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-foreground">
            <Phone className="size-3.5 shrink-0" />
            <span>{member.mobile}</span>
          </a>
          <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-foreground">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{member.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
