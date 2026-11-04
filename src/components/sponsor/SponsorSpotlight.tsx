import { getLocale, getTranslations } from "next-intl/server";
import { getSponsorBrands } from "@/data";
import type { Locale } from "@/data/types";
import { L } from "@/lib/localize";
import { SponsorGrid } from "./SponsorGrid";

/** Premium inventory stays absent until a real brand has an agreed placement. */
export async function SponsorSpotlight({
  eventSlug,
  presentation = false,
}: {
  eventSlug?: string;
  presentation?: boolean;
}) {
  const t = await getTranslations("sponsorsPage");
  const locale = (await getLocale()) as Locale;
  const brands = getSponsorBrands(eventSlug).filter((brand) =>
    presentation
      ? brand.tierId === "presenta"
      : brand.tierId === "destacada" || brand.tierId === "presenta",
  );
  if (!brands.length) return null;
  return presentation ? (
    <div className="mx-auto w-full max-w-xl border-y border-cream/20 py-4 text-center">
      <p className="mb-3 font-condensed text-xs uppercase tracking-[.25em] text-cream/70">
        {t("presentedBy")}
      </p>
      <SponsorGrid brands={brands} className="grid-cols-1" />
    </div>
  ) : (
    <div className="my-8 grid gap-4">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="grid gap-6 border border-blood/40 bg-linear-160 from-surface to-ink p-6 md:grid-cols-[1fr_2fr] md:p-10"
        >
          <div>
            <p className="mb-4 font-condensed text-xs uppercase tracking-[.24em] text-blood-hover">
              {t("featuredPartner")}
            </p>
            <h3 className="font-display text-4xl uppercase text-cream">
              {brand.name}
            </h3>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {brand.description ? (
              <p className="leading-relaxed text-cream/75">
                {L(brand.description, locale)}
              </p>
            ) : null}
            {brand.url?.startsWith("https://") ? (
              <a
                href={brand.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="self-start border-b border-blood-hover pb-2 font-condensed uppercase tracking-[.15em] text-blood-hover"
              >
                {t("visitBrand")} ↗
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
