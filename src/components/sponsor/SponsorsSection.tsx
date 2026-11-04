import { getTranslations } from "next-intl/server";
import { getSponsorBrands } from "@/data";
import { isEnabled } from "@/data/features";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { SponsorGrid } from "./SponsorGrid";

/** Full-width partner showcase, shared by home and event pages. */
export async function SponsorsSection({ eventSlug }: { eventSlug?: string }) {
  if (!isEnabled("sponsors")) return null;
  const t = await getTranslations("sponsorsPage");
  return (
    <Section id="patrocinadores" background="ink-2" borderTop>
      <div className="mb-9 grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-4 font-condensed text-xs uppercase tracking-[.3em] text-blood-hover">
            {t("partnersKicker")}
          </p>
          <h2 className="max-w-2xl font-display text-4xl uppercase leading-[1.05] text-cream md:text-6xl">
            {t("currentSponsors")}
          </h2>
        </div>
        <p className="max-w-md leading-relaxed text-cream/70">
          {t("partnersBody")}
        </p>
      </div>
      <SponsorGrid brands={getSponsorBrands(eventSlug)} />
      <div className="mt-8 flex flex-col items-start justify-between gap-5 border-l-2 border-blood pl-6 md:flex-row md:items-center">
        <p className="font-display text-2xl uppercase text-cream">
          {t("joinPartners")}
        </p>
        <CtaButton href="/patrocinadores" variant="outlineRed">
          {t("explorePackages")}
        </CtaButton>
      </div>
    </Section>
  );
}
