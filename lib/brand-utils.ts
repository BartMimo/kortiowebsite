import type { Brand } from "./catalog";

export function safeWebURL(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^[a-z][a-z\d+.-]*:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed))
    return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
    );
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
// Zelfde logo, andere link: een ondertekende Supabase-link (token verloopt) en de vaste openbare link naar
// hetzelfde bestand krijgen dezelfde sleutel, zodat de lokale thumbnail blijft passen. Moet gelijk blijven
// aan image_key in scripts/optimize-brand-images.py.
export function imageKey(value: string | null | undefined): string {
  if (!value) return "";
  return value.includes("/storage/v1/object/sign/")
    ? value
        .split("?")[0]
        .replace("/storage/v1/object/sign/", "/storage/v1/object/public/")
    : value;
}
export function isCurrentBrand(
  brand: Pick<Brand, "is_temporary" | "valid_from" | "valid_until">,
): boolean {
  if (!brand.is_temporary) return true;
  const today = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Amsterdam",
  });
  return (
    (!brand.valid_from || brand.valid_from.slice(0, 10) <= today) &&
    (!brand.valid_until || brand.valid_until.slice(0, 10) >= today)
  );
}
