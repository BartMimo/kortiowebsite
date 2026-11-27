// Titels, beschrijvingen en gerelateerde merken voor de merkpagina's. Puur (geen React), zodat de
// build, de pagina en de tests dezelfde regels gebruiken.
import type { Brand } from "./catalog.ts";
import type { BrandContent } from "./brand-content.ts";
import { brandAlias, nameWithAlias } from "./brand-aliases.ts";
import { slugify } from "./slug.ts";

const TZ = "Europe/Amsterdam";
const DAY = 86400000;

export function amsterdamDate(now = new Date()): string {
  return now.toLocaleDateString("sv-SE", { timeZone: TZ });
}

const noon = (iso: string) => new Date(iso.slice(0, 10) + "T12:00:00Z").getTime();

// Getest in de laatste `days` dagen (en niet in de toekomst).
export function testedWithin(
  iso: string | null | undefined,
  days: number,
  now = new Date(),
): boolean {
  if (!iso) return false;
  const age = now.getTime() - noon(iso);
  return age <= days * DAY && age >= -DAY;
}

export function dateNL(iso: string, withYear = true): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: TZ,
  }).format(new Date(noon(iso)));
}

// Besluit Bart 27-11-2026: de maand ("november 2026") alleen in de titel als de code in de laatste
// 45 dagen getest is, anders alleen het jaar. Zo klopt de datum altijd met een echte test.
export const MONTH_IF_TESTED_WITHIN = 45;
export function titlePeriod(
  brand: Pick<Brand, "last_verified_at">,
  now = new Date(),
): string {
  const tested = testedWithin(brand.last_verified_at, MONTH_IF_TESTED_WITHIN, now);
  return new Intl.DateTimeFormat("nl-NL", {
    ...(tested ? { month: "long" } : {}),
    year: "numeric",
    timeZone: TZ,
  }).format(now);
}

// "20% Korting (PLUS-members)" -> "20% korting (PLUS-members)". Alleen gewone woorden gaan naar kleine
// letters; eigennamen ("Apple-accessoires", "L'Oréal Paris", "UNiDAYS") en de merknaam blijven staan.
const COMMON_WORDS = new Set(
  "korting extra alleen studentenkorting studenten gratis op tot vanaf je jouw eerste bestelling alles sale verzending voor bij de het een en met in nieuwe klanten welkomstkorting code app".split(
    " ",
  ),
);
export function offerText(
  discount: string | null | undefined,
  keep: (string | null | undefined)[] = [],
): string {
  if (!discount) return "";
  const protectedWords = new Set(
    keep.filter(Boolean).flatMap((k) => k!.split(/\s+/)),
  );
  return discount
    .trim()
    .replace(/\p{Lu}\p{Ll}+/gu, (word) =>
      COMMON_WORDS.has(word.toLowerCase()) && !protectedWords.has(word)
        ? word.toLowerCase()
        : word,
    );
}

// Gaat de verzendtekst over gratis verzenden (en niet bijvoorbeeld over gratis afhalen)?
export function mentionsFreeShipping(text: string | undefined): boolean {
  return !!text && /verzend[^.]*gratis|gratis[^.]*verzend/i.test(text);
}

// Google kapt titels af rond 60 tekens: valt een optie te lang uit, dan de volgende.
export function brandTitle(brand: Brand, now = new Date(), max = 62): string {
  const slug = slugify(brand.name);
  const alias = brandAlias(slug);
  const offer = offerText(brand.discount_text, [brand.name, alias]);
  const period = titlePeriod(brand, now);
  const head = (name: string) => `${name} kortingscode ${period}`;
  const tail = offer ? `: ${offer}` : "";
  const options = [
    `${head(nameWithAlias(brand.name, slug))}${tail} | Kortio`,
    `${head(brand.name)}${tail} | Kortio`,
    ...(alias ? [`${head(alias)}${tail} | Kortio`] : []),
    `${head(brand.name)}${tail}`,
    `${head(brand.name)} | Kortio`,
  ];
  return options.find((t) => t.length <= max) ?? options[options.length - 1];
}

export function expiredTitle(brand: Brand, now = new Date()): string {
  const year = new Intl.DateTimeFormat("nl-NL", { year: "numeric", timeZone: TZ }).format(now);
  const slug = slugify(brand.name);
  const options = [
    `${nameWithAlias(brand.name, slug)} kortingscode ${year}: nieuwe code volgt | Kortio`,
    `${brand.name} kortingscode ${year}: nieuwe code volgt | Kortio`,
    `${brand.name} kortingscode ${year}: nieuwe code volgt`,
  ];
  return options.find((t) => t.length <= 62) ?? options[options.length - 1];
}

const firstSentence = (text?: string) => text?.match(/^[^.]*\./)?.[0];

// Meta-beschrijving: aanbod, testdatum (als die recent is) en één feit van het merk zelf, zoals
// gratis verzending. Maximaal 160 tekens; wat niet past valt weg.
export function brandDescription(
  brand: Brand,
  content?: BrandContent,
  now = new Date(),
): string {
  const name = nameWithAlias(brand.name, slugify(brand.name));
  const offer = offerText(brand.discount_text, [brand.name, brandAlias(slugify(brand.name))]);
  const tested =
    brand.last_verified_at && testedWithin(brand.last_verified_at, 90, now)
      ? `, getest op ${dateNL(brand.last_verified_at)}`
      : "";
  const shipping = firstSentence(content?.shipping?.text);
  const fact = shipping && shipping.length <= 70 ? shipping : undefined;
  const parts = [
    `${name} kortingscode${offer ? ` voor ${offer}` : ""}${tested}.`,
    fact,
    "Tik op de code: hij wordt gekopieerd en de webshop opent.",
    // Na "…is het gratis." geen tweede "Gratis".
    fact && /gratis/i.test(fact) ? "Zonder account." : "Gratis, zonder account.",
  ];
  let out = "";
  for (const part of parts) {
    if (!part) continue;
    const next = out ? `${out} ${part}` : part;
    if (next.length <= 160) out = next;
  }
  return out;
}

// Merken uit dezelfde categorie, uitgelicht eerst. Pagina en build moeten exact hetzelfde
// rijtje opleveren (de build stopt alleen deze merken in de HTML-snapshot).
export function relatedBrands(brand: Brand, brands: Brand[], count = 8): Brand[] {
  // Zonder categorie zijn merken niet aan elkaar verwant (anders telt null === null als match).
  if (!brand.primary_category_id) return [];
  return brands
    .filter((b) => b.id !== brand.id && b.primary_category_id === brand.primary_category_id)
    .sort(
      (a, b) =>
        Number(b.is_featured) - Number(a.is_featured) || a.name.localeCompare(b.name, "nl"),
    )
    .slice(0, count);
}
