import Image from "next/image";
import type { ProcessStep as ProcessStepType } from "@/lib/content/process";

export function ProcessStep({ data }: { data: ProcessStepType }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <span className="font-heading flex size-11 shrink-0 items-center justify-center rounded-full bg-black text-base font-semibold text-white">
          {data.step}
        </span>
        <span className="mt-2 hidden w-px flex-1 bg-ash last:hidden sm:block" />
      </div>
      <div className="flex-1 pb-10">
        <h3 className="font-heading text-lg font-semibold tracking-tight">{data.title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {data.description}
        </p>
        {data.image ? (
          <div className="relative mt-4 aspect-video max-w-md overflow-hidden rounded-[var(--radius-image)] bg-surface">
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
