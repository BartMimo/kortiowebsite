export const SITE_URL = "https://www.kortio.app";
export const APP_STORE_URL =
  "https://apps.apple.com/nl/app/kortio-kortingscodes-deals/id6758350707";

export const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Kortio",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.webp`,
  email: "info@kortio.app",
  sameAs: [APP_STORE_URL],
};
export const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Kortio",
  url: `${SITE_URL}/`,
  inLanguage: "nl-NL",
  publisher: { "@id": organization["@id"] },
};
export function serializeJSON(value: unknown): string {
  // Public database text must never close an inline script element.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
