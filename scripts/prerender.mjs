import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { routes } from "./routes.mjs";

process.env.NODE_ENV = "production";
const {
  render,
  getPublicCatalog,
  getExpiredBrands,
  serializeJSON,
  slugify,
  relatedBrands,
  categoryPages,
} = await import("../.prerender/entry-server.js");
const SITE = "https://www.kortio.app";
const template = await readFile("dist/index.html", "utf8");
const catalog = await getPublicCatalog();
const date = new Date().toLocaleDateString("sv-SE", {
  timeZone: "Europe/Amsterdam",
});

// lastmod in de sitemap: alleen een nieuwe datum als de gerenderde pagina echt anders is dan bij de
// vorige build. De vorige stand staat op de live site (seo-state.json). Niet bereikbaar (eerste
// build, offline): dan krijgt alles de datum van vandaag.
let previous = {};
try {
  const res = await fetch(`${SITE}/seo-state.json`, { signal: AbortSignal.timeout(8000) });
  if (res.ok) previous = (await res.json()).pages ?? {};
  else console.warn(`seo-state.json gaf ${res.status}: alle lastmod-datums worden vandaag.`);
} catch (error) {
  console.warn(`seo-state.json niet bereikbaar (${error}): alle lastmod-datums worden vandaag.`);
}
const state = {};
const sitemapEntries = [];
function track(path, html, head, indexable) {
  const hash = createHash("sha1").update(head).update(html).digest("hex").slice(0, 16);
  const lastmod = previous[path]?.hash === hash ? previous[path].lastmod : date;
  state[path] = { hash, lastmod };
  if (indexable) sitemapEntries.push({ path, lastmod });
}

function page(html, head, snapshot) {
  return template
    .replace('<html lang="nl">', `<html lang="nl" data-rendered-date="${date}">`)
    .replace("<!--seo-head-->", head)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>${
        snapshot
          ? `<script id="kortio-catalog" type="application/json">${serializeJSON(snapshot)}</script>`
          : ""
      }`,
    );
}

for (const route of routes) {
  const initial = route.catalog ? catalog : null;
  const { html, head } = await render(route.path, initial);
  await writeFile(`dist/${route.file}`, page(html, head, initial));
  if (route.indexable) track(route.path, html, head, true);
}

// Merkpagina's op /m/<slug> (Google-verkeer en deellinks uit de app). De snapshot bevat alleen het
// merk zelf en de gerelateerde merken die de pagina toont: zelfde HTML, ~50 KB minder per pagina.
await mkdir("dist/m", { recursive: true });
const brandPaths = [];
async function brandPage(brand) {
  const slug = slugify(brand.name);
  if (!slug || brandPaths.includes(`/m/${slug}`)) return;
  const path = `/m/${slug}`;
  const snapshot = {
    brands: [brand, ...relatedBrands(brand, catalog.brands)],
    categories: catalog.categories,
  };
  const { html, head } = await render(path, snapshot);
  await writeFile(`dist/m/${slug}.html`, page(html, head, snapshot));
  track(path, html, head, true);
  brandPaths.push(path);
}
for (const brand of catalog.brands) await brandPage(brand);
// Merken met een verlopen code: pagina blijft, met de melding dat er nu geen geldige code is.
for (const brand of await getExpiredBrands()) await brandPage(brand);

// Merken die na deze build zijn toegevoegd hebben nog geen eigen pagina. vercel.json valt dan terug op
// deze pagina: zonder snapshot, dus de browser laadt de actuele catalogus en toont alsnog het merk.
const fallback = await render("/m/nieuw-merk", null);
await writeFile("dist/m-fallback.html", page(fallback.html, fallback.head, null));

// Categoriepagina's op /kortingscodes/<categorie>.
await mkdir("dist/kortingscodes", { recursive: true });
const categoryPaths = [];
for (const category of categoryPages) {
  const dbCategory = catalog.categories.find((c) => c.name === category.dbName);
  const brands = dbCategory
    ? catalog.brands.filter((b) => b.primary_category_id === dbCategory.id)
    : [];
  const path = `/kortingscodes/${category.slug}`;
  const snapshot = { brands, categories: catalog.categories };
  const { html, head } = await render(path, snapshot);
  await writeFile(`dist/kortingscodes/${category.slug}.html`, page(html, head, snapshot));
  // Een lege categorie krijgt noindex van de pagina zelf en hoort dan ook niet in de sitemap.
  track(path, html, head, brands.length > 0);
  categoryPaths.push(path);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries
  .map((e) => `  <url><loc>${SITE}${e.path}</loc><lastmod>${e.lastmod}</lastmod></url>`)
  .join("\n")}\n</urlset>\n`;
await writeFile("dist/sitemap.xml", sitemap);
await writeFile("dist/seo-state.json", JSON.stringify({ built: date, pages: state }));
await rm(".prerender", { recursive: true, force: true });
const changed = sitemapEntries.filter((e) => e.lastmod === date).length;
console.log(
  `Prerendered ${routes.length} pages, ${brandPaths.length} brand pages and ${categoryPaths.length} category pages with ${catalog.brands.length} current public brands. Sitemap: ${sitemapEntries.length} URLs, ${changed} changed today.`,
);
