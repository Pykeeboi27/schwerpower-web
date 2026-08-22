export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-4xl font-semibold tracking-tight text-black sm:text-5xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
