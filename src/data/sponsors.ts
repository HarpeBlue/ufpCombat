import type { SponsorBrand, SponsorTier } from "./types";

/** Confirmed UFP partners. Official logos and destinations are pending owner confirmation. */
export const sponsorBrands: SponsorBrand[] = [
  { id: "monasterio", name: "Monasterio", kind: "venue" },
  { id: "sobre-ruedas", name: "Sobre Ruedas", kind: "official" },
  { id: "passion-fruit", name: "Passion Fruit", kind: "official" },
  { id: "kromasol", name: "Kromasol", kind: "official" },
  { id: "la-fonda-del-arroz", name: "La Fonda del Arroz", kind: "official" },
  { id: "grupo-colsolar", name: "Grupo Colsolar", kind: "official" },
  { id: "bloom-x", name: "Bloom X", kind: "official" },
  { id: "voltios-burger", name: "Voltios Burger", kind: "official" },
  {
    id: "hamburguesas-artesanal",
    name: "Hamburguesas Artesanal",
    kind: "official",
  },
  {
    id: "aguardiente-antioqueno",
    name: "Aguardiente Antioqueño",
    kind: "official",
  },
  { id: "imnova-print", name: "Imnova Print", kind: "official" },
  { id: "somos", name: "Somos", kind: "media" },
  { id: "combatam", name: "Combatam", kind: "media" },
  { id: "caray-combat-sports", name: "Caray Combat Sports", kind: "media" },
];

/** Shared commercial terms for all digital sponsorship packages. */
export const sponsorCampaign = { durationDays: 30, currency: "COP" } as const;

/** Fixed launch prices for digital inventory; assignments require an agreement. */
export const sponsorTiers: SponsorTier[] = [
  {
    id: "presencia",
    price: 200000,
    name: {
      es: "Aliado digital",
      en: "Digital partner",
    },
    pitch: {
      es: "Tu marca aparece entre los aliados de UFP, con información de tu negocio y un botón para contactarte.",
      en: "Your brand appears among UFP partners, with business information and a direct contact link.",
    },
    example: {
      es: "Ejemplo: una hamburguesería muestra su logo, explica qué ofrece y recibe consultas por WhatsApp desde su tarjeta.",
      en: "Example: a burger restaurant displays its logo, explains its offer and lets fans contact it on WhatsApp from its card.",
    },
    perks: [
      {
        es: "Tarjeta en inicio, página del evento y directorio de aliados",
        en: "Brand card on the home page, event page and partner directory",
      },
      {
        es: "Logo y descripción breve de tu negocio",
        en: "Logo and a short description of your business",
      },
      {
        es: "Botón hacia tu WhatsApp, Instagram o sitio web oficial",
        en: "Link to your official WhatsApp, Instagram or website",
      },
    ],
  },
  {
    id: "destacada",
    price: 450000,
    name: {
      es: "Marca destacada",
      en: "Featured brand",
    },
    pitch: {
      es: "Además de tu tarjeta de aliado, tienes un bloque propio de mayor tamaño junto a la cartelera para presentar tu negocio.",
      en: "Alongside your partner card, you get a larger dedicated block beside the fight card to introduce your business.",
    },
    example: {
      es: "Ejemplo: tu gimnasio tiene un espacio propio junto a las peleas, con su propuesta y un enlace para pedir información.",
      en: "Example: your gym gets a dedicated space beside the bouts, with its offer and a link for inquiries.",
    },
    perks: [
      {
        es: "Todo lo incluido en Aliado digital",
        en: "Everything in Digital partner",
      },
      {
        es: "Bloque ampliado con el nombre, descripción y enlace de tu marca",
        en: "Larger feature with your brand name, description and link",
      },
      {
        es: "Ubicación junto a la cartelera, en inicio y página del evento",
        en: "Placement beside the fight card on the home and event pages",
      },
    ],
  },
  {
    id: "presenta",
    price: 900000,
    name: {
      es: "Presentador digital",
      en: "Digital presenting partner",
    },
    pitch: {
      es: "Tu marca acompaña el encabezado del evento en el sitio y ocupa la primera posición entre los patrocinadores.",
      en: "Your brand accompanies the event heading on the website and takes priority among the sponsors.",
    },
    example: {
      es: "Ejemplo de ubicación: «UFP 7 presentado por [Tu marca]» en el encabezado del sitio. La presentación se limita a la web.",
      en: "Placement example: “UFP 7 presented by [Your brand]” beside the website event heading. Presenting rights cover the website only.",
    },
    perks: [
      {
        es: "Todo lo incluido en Marca destacada",
        en: "Everything in Featured brand",
      },
      {
        es: "Identificación «Presentado por» junto al encabezado del evento en inicio y página del evento",
        en: "“Presented by” identification beside the event heading on the home and event pages",
      },
      {
        es: "Primera posición en la vitrina de patrocinadores",
        en: "Priority position in the sponsor showcase",
      },
    ],
  },
];
