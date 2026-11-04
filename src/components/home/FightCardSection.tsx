import { getLocale, getTranslations } from "next-intl/server";
import { getPublishedFights } from "@/data";
import type { Locale, UFPEvent } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { L } from "@/lib/localize";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FightPoster } from "@/components/event/FightPoster";

/** Every published bout is visible, including matchups without promotional art. */
export async function FightCardSection({ event }: { event: UFPEvent }) {
  const t = await getTranslations("sections.fightCard");
  const locale = (await getLocale()) as Locale;
  const fights = [...getPublishedFights(event)].sort(
    (a, b) => a.order - b.order,
  );
  if (!fights.length) return null;
  return (
    <Section id="cartelera" width="lg">
      <SectionHeading
        title={t("title")}
        kicker={t("kicker", { event: `UFP ${event.number}` })}
        action={{ label: t("eventPageLink"), href: `/evento/${event.slug}` }}
      />
      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {fights.map((fight) => (
          <Link
            key={fight.id}
            href={`/evento/${event.slug}#${fight.id}`}
            className="group flex h-full flex-col border border-cream/15 bg-surface transition-colors hover:border-blood-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            <FightPoster fight={fight} />
            <div
              className={`flex flex-1 flex-col gap-3 p-5 ${fight.poster ? "" : "min-h-64 justify-center bg-linear-160 from-surface to-ink"}`}
            >
              <span className="font-condensed text-xs uppercase tracking-[.2em] text-blood-hover">
                {L(fight.label, locale)}
              </span>
              <h3 className="font-display text-2xl uppercase leading-tight text-cream">
                {fight.red.name}
                <span className="my-2 block font-condensed text-sm tracking-[.3em] text-cream/65">
                  VS
                </span>
                {fight.blue.name}
              </h3>
              {fight.divisionLabel ? (
                <p className="pt-2 font-mono text-xs text-cream/70">
                  {L(fight.divisionLabel, locale)}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
