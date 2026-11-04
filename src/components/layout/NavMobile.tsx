"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { LanguageToggle } from "./LanguageToggle";

interface NavMobileProps {
  links: { href: string; label: string }[];
  ticketsLabel: string;
  openLabel: string;
  closeLabel: string;
}

/** Hamburger menu for screens below lg. */
export function NavMobile({
  links,
  ticketsLabel,
  openLabel,
  closeLabel,
}: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* While the overlay is open: Escape closes it and the body can't scroll behind it. */
  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key !== "Tab") return;
      const controls = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]',
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panelRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    const trigger = triggerRef.current;
    document.addEventListener("keydown", closeOnEscape);

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? closeLabel : openLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-10 cursor-pointer flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`h-px w-6 bg-cream transition-transform ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 bg-blood transition-opacity ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`h-px w-6 bg-cream transition-transform ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={openLabel}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setIsOpen(false);
          }}
          className="fixed inset-x-0 top-16 z-100 flex flex-col gap-1 border-b border-blood/35 bg-ink/97 px-7 py-6 backdrop-blur-[12px]"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="self-end px-2 py-2 font-condensed uppercase tracking-wider text-cream"
          >
            {closeLabel} ×
          </button>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-2 font-condensed text-lg uppercase tracking-[.14em] text-cream/85 transition-colors hover:text-blood-hover"
            >
              {label}
            </Link>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <CtaButton href="/#boletos" size="sm">
              {ticketsLabel}
            </CtaButton>
            <LanguageToggle />
          </div>
        </div>
      )}
    </div>
  );
}
