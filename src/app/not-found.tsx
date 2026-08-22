import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-32 text-center sm:px-6">
      <span className="font-heading text-brand text-7xl font-medium">404</span>
      <h1 className="font-heading text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Return home
      </Link>
    </section>
  );
}
