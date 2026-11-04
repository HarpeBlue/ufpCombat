"use server";

import { sponsorCampaign, sponsorTiers } from "@/data/sponsors";
import { getUpcomingEvent } from "@/data";
import { formatEventName, formatPrice } from "@/lib/format";
import { sponsorContactSchema } from "@/lib/schemas";
import { notifySubmission } from "@/lib/email";
import type { FormActionState } from "./apply";

/** Receives sponsorship requests and relays them to the promotion's inbox. */
export async function submitSponsorContact(
  _previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const parsed = sponsorContactSchema.safeParse({
    company: formData.get("company"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    tierId: formData.get("tierId"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  const event = getUpcomingEvent();
  const tier = sponsorTiers.find((item) => item.id === parsed.data.tierId)!;
  await notifySubmission({
    subject: `Solicitud de patrocinio — ${parsed.data.company}`,
    replyTo: parsed.data.email,
    fields: {
      Empresa: parsed.data.company,
      Contacto: parsed.data.contactName,
      Email: parsed.data.email,
      Paquete: tier.name.es,
      Precio: `${formatPrice(tier.price, "es")} ${sponsorCampaign.currency}`,
      Duración: `${sponsorCampaign.durationDays} días`,
      Evento: event ? formatEventName(event) : "UFP",
      Mensaje: parsed.data.message,
    },
  });
  return { status: "success" };
}
