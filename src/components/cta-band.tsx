import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { company } from "@/lib/content/company";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="text-xs font-semibold tracking-[0.05em] text-brand uppercase">
          {company.positioning}
        </span>
        <h2 className="font-heading mx-auto mt-4 max-w-2xl text-4xl leading-[0.95] font-medium tracking-[-0.01em] text-white sm:text-6xl">
          Let&rsquo;s power your next project
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/60">
          {company.tagline}
        </p>
        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-brand text-black hover:bg-brand/90")}
        >
          Get in touch
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
