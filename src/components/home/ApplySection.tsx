import { getTranslations } from "next-intl/server";
import { isEnabled } from "@/data/features";
import { Section } from "@/components/ui/Section";
import { ApplicationFormMini } from "@/components/forms/ApplicationFormMini";

/** The open call has its own section; partners now have a dedicated showcase. */
export async function ApplySection() {
  if (!isEnabled("signup")) return null;
  const t = await getTranslations("sections.apply");
  return (
    <Section id="inscripcion" width="md">
      <div className="grid gap-8 border border-blood/40 bg-linear-160 from-surface-warm to-surface p-6 md:p-9 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-3xl uppercase text-cream md:text-[40px]">
            {t("title")} <span className="text-blood">{t("titleAccent")}</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-cream/65">
            {t("pitch")}
          </p>
        </div>
        <ApplicationFormMini />
      </div>
    </Section>
  );
}
