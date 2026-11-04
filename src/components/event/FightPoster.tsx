import Image from "next/image";
import type { Fight } from "@/data/types";

/** Clips outdated poster footers in the UI while preserving the original artwork. */
export function FightPoster({ fight }: { fight: Fight }) {
  if (!fight.poster) return null;
  return (
    <div
      className="relative overflow-hidden bg-surface"
      style={{ aspectRatio: fight.posterAspectRatio ?? "3 / 4" }}
    >
      <Image
        src={fight.poster}
        alt={`${fight.red.name} vs ${fight.blue.name}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-top"
      />
    </div>
  );
}
