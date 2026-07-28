import Image from "next/image";
import type { SponsorBrand } from "@/data/types";

interface SponsorGridProps {
  brands: SponsorBrand[];
  /** Tailwind grid-cols classes; the home column is narrower than the sponsors page. */
  className?: string;
}

/**
 * Brand plates, shared by the home preview and /patrocinadores so both stay in sync.
 *
 * Cards grow past their minimum height instead of clipping: several brand names
 * ("Aguardiente Antioqueño", "Hamburguesas Artesanal") wrap to two lines.
 */
export function SponsorGrid({ brands, className = "grid-cols-2 md:grid-cols-6" }: SponsorGridProps) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex min-h-[70px] items-center justify-center border border-cream/20 bg-surface px-2 py-2.5 text-center font-condensed text-xs uppercase leading-tight tracking-[.1em] text-cream/75 [overflow-wrap:anywhere]"
        >
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          ) : (
            brand.name
          )}
        </div>
      ))}
    </div>
  );
}
