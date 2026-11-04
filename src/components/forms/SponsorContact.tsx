"use client";

import { useSearchParams } from "next/navigation";
import { sponsorTiers } from "@/data/sponsors";
import { SponsorForm } from "./SponsorForm";

/** Query-driven preselection survives locale-aware package links and navigation. */
export function SponsorContact() {
  const params = useSearchParams();
  const tier = sponsorTiers.find((item) => item.id === params.get("paquete"));
  return <SponsorForm key={tier?.id ?? "default"} initialTierId={tier?.id} />;
}
