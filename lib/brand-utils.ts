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
