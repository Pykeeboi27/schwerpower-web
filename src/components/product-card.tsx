import Image from "next/image";
import type { Product } from "@/lib/content/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10 shadow-[var(--shadow-md)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="h-1.5 w-10 rounded-full bg-brand" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
}
