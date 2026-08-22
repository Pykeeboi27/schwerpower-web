export function ServiceCard({
  index,
  title,
  description,
  scope,
}: {
  index: number;
  title: string;
  description: string;
  scope?: readonly string[];
}) {
  return (
    <div className="rounded-xl bg-white p-6 ring-1 ring-foreground/10 shadow-[var(--shadow-md)] sm:p-8">
      <span className="font-heading text-3xl font-medium text-brand">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-heading mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {scope ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {scope.map((item) => (
            <li
              key={item}
              className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
