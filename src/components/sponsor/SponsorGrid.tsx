import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale, SponsorBrand } from "@/data/types";
import { L } from "@/lib/localize";

interface SponsorGridProps {
  brands: SponsorBrand[];
  className?: string;
}

/** Equal brand treatment by default. Links and rich content require confirmed data. */
export async function SponsorGrid({
  brands,
  className = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: SponsorGridProps) {
  const t = await getTranslations("sponsorsPage");
  const locale = (await getLocale()) as Locale;
  return (
    <div className={`grid gap-3 ${className}`}>
      {brands.map((brand) => {
        const content = (
          <>
            <span className="font-condensed text-[11px] uppercase tracking-[.22em] text-cream/65">
              {t(brand.kind === "media" ? "mediaPartner" : "partner")}
            </span>
            <div className="flex min-h-24 items-center justify-center py-4">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={240}
                  height={100}
                  className="h-20 w-full object-contain"
                />
              ) : (
                <span className="font-display text-xl uppercase leading-tight text-cream md:text-2xl">
                  {brand.name}
                </span>
              )}
            </div>
            {brand.description ? (
              <p className="text-sm leading-relaxed text-cream/70">
                {L(brand.description, locale)}
              </p>
            ) : null}
            {brand.url?.startsWith("https://") ? (
              <span className="mt-3 font-condensed text-xs uppercase tracking-[.15em] text-blood-hover">
                {t("visitBrand")} ↗
              </span>
            ) : null}
          </>
        );
        const classes =
          "flex min-w-0 flex-col justify-between border border-cream/15 bg-ink-2 p-5 text-center [overflow-wrap:anywhere]";
        return brand.url?.startsWith("https://") ? (
          <a
            key={brand.id}
            href={brand.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            aria-label={t("visitBrandNamed", { brand: brand.name })}
            className={`${classes} transition-colors hover:bg-surface-warm focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cream`}
          >
            {content}
          </a>
        ) : (
          <div key={brand.id} className={classes}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
