import Image from "next/image";

export function PartnerLogo({
  name,
  logo,
  scale = 1,
}: {
  name: string;
  logo: string;
  /** Visual boost for logos whose artwork reads smaller than its neighbors at 1:1. */
  scale?: number;
}) {
  return (
    <div
      title={name}
      className="flex h-20 items-center justify-center overflow-hidden rounded-xl bg-white p-4 ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
    >
      <div className="relative h-full w-full" style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}>
        <Image src={logo} alt={name} fill sizes="200px" className="object-contain" />
      </div>
    </div>
  );
}
