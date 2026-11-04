import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { getSponsorBrands, getUpcomingEvent } from "@/data";
import { isEnabled } from "@/data/features";
import { localizedAlternates } from "@/lib/seo";
import { sponsorCampaign, sponsorTiers } from "@/data/sponsors";
import type { Locale } from "@/data/types";
import { L } from "@/lib/localize";
import { formatEventName, formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { Footer } from "@/components/layout/Footer";
import { OutlineText } from "@/components/ui/OutlineText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { SponsorGrid } from "@/components/sponsor/SponsorGrid";
import { SponsorForm } from "@/components/forms/SponsorForm";
import { SponsorContact } from "@/components/forms/SponsorContact";

interface SponsorsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SponsorsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sponsorsPage" });
  return {
    title: `${t("title")} ${t("titleAccent")}`,
    description: t("pitch"),
    alternates: localizedAlternates("/patrocinadores", locale),
  };
}

/** Commercial showcase for real partners and explicitly offered digital inventory. */
export default async function SponsorsPage({ params }: SponsorsPageProps) {
  if (!isEnabled("sponsors")) notFound();
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const t = await getTranslations("sponsorsPage");
  const locale = (await getLocale()) as Locale;
  const event = getUpcomingEvent();
  const eventName = event ? formatEventName(event) : "UFP";
  return (
    <>
      <main>
        <section className="relative overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,rgba(122,12,20,.5),transparent_60%)]">
          <div className="pointer-events-none absolute -right-8 top-12 select-none">
            <OutlineText
              strokeColor="rgba(193,18,31,.14)"
              className="text-[min(28vw,360px)] leading-none"
            >
              UFP
            </OutlineText>
          </div>
          <Reveal
            onScroll={false}
            className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-7 px-6 py-20 md:px-12 md:py-28"
          >
            <span className="font-condensed text-sm uppercase tracking-[.3em] text-cream/75">
              {t("kicker")} · {eventName}
            </span>
            <h1 className="max-w-4xl font-display text-5xl uppercase leading-[.95] text-cream md:text-8xl">
              {t("title")}{" "}
              <span className="text-blood-hover">{t("titleAccent")}</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-cream/75">
              {t("pitch")}
            </p>
            <CtaButton href="#paquetes" size="lg">
              {t("explorePackages")}
            </CtaButton>
            <p className="font-condensed text-xs uppercase tracking-[.2em] text-cream/65">
              {t("quoteNote", { days: sponsorCampaign.durationDays })}
            </p>
          </Reveal>
        </section>
        <Section background="ink-2">
          <div className="grid gap-8 md:grid-cols-3">
            {(["discover", "story", "connect"] as const).map((key, index) => (
              <div key={key} className="border-t border-cream/25 pt-5">
                <span className="font-mono text-xs text-blood-hover">
                  0{index + 1}
                </span>
                <h2 className="mb-3 mt-4 font-display text-2xl uppercase text-cream">
                  {t(`${key}Title`)}
                </h2>
                <p className="text-sm leading-relaxed text-cream/70">
                  {t(`${key}Body`)}
                </p>
              </div>
            ))}
          </div>
        </Section>
        <Section id="paquetes">
          <SectionHeading
            title={t("tiersTitle")}
            kicker={t("digitalInventory")}
          />
          <p className="max-w-3xl text-base leading-relaxed text-cream/75">
            {t("campaignTerms", { days: sponsorCampaign.durationDays })}
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            {sponsorTiers.map((tier, index) => (
              <article
                key={tier.id}
                className={`flex flex-col gap-5 border bg-linear-160 from-surface to-surface p-6 md:p-8 ${index === 1 ? "border-blood-hover" : "border-cream/20"}`}
              >
                <span className="font-condensed text-xs uppercase tracking-[.2em] text-blood-hover">
                  0{index + 1} / {t("quoteLabel")}
                </span>
                <h3 className="font-display text-3xl uppercase leading-tight text-cream">
                  {L(tier.name, locale)}
                </h3>
                <div className="border-b border-cream/15 pb-5">
                  <p className="font-display text-5xl text-cream">
                    {formatPrice(tier.price, locale)}
                  </p>
                  <p className="mt-2 font-condensed text-sm uppercase tracking-[.1em] text-cream/70">
                    {t("campaignPeriod", {
                      days: sponsorCampaign.durationDays,
                    })}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-cream/75">
                  {L(tier.pitch, locale)}
                </p>
                <span className="font-condensed text-xs uppercase tracking-[.24em] text-cream/65">
                  {t("perksLabel")}
                </span>
                <ul className="mb-4 flex flex-col gap-3">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk.es}
                      className="flex gap-3 text-sm leading-relaxed text-cream/80"
                    >
                      <span aria-hidden="true" className="text-blood-hover">
                        /
                      </span>
                      {L(perk, locale)}
                    </li>
                  ))}
                </ul>
                <p className="border-l-2 border-blood pl-4 text-sm leading-relaxed text-cream/70">
                  {L(tier.example, locale)}
                </p>
                <CtaButton
                  href={`/patrocinadores?paquete=${tier.id}#contacto`}
                  variant="outlineRed"
                  className="mt-auto"
                >
                  {t("requestProposal")}
                </CtaButton>
                <a
                  href={whatsappLink(
                    t("whatsappMessage", {
                      event: eventName,
                      tier: L(tier.name, locale),
                      price: formatPrice(tier.price, locale),
                      days: sponsorCampaign.durationDays,
                    }),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-condensed text-sm uppercase tracking-[.1em] text-cream/75 underline underline-offset-4 hover:text-cream"
                >
                  {t("whatsappCta")} ↗
                </a>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-cream/65">
            {t("physicalNote")}
          </p>
        </Section>
        <Section background="ink-2">
          <SectionHeading
            title={t("currentSponsors")}
            kicker={t("partnersKicker")}
          />
          <SponsorGrid brands={getSponsorBrands()} />
        </Section>
        <Section id="contacto" width="md">
          <SectionHeading title={t("formTitle")} kicker={t("formKicker")} />
          <div className="border border-blood/40 bg-linear-160 from-surface to-surface p-6 md:p-9">
            <Suspense fallback={<SponsorForm />}>
              <SponsorContact />
            </Suspense>
          </div>
        </Section>
      </main>
      <Footer compact />
    </>
  );
}
