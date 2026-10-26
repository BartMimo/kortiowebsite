import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { routes } from "./routes.mjs";

process.env.NODE_ENV = "production";
const { render, getPublicCatalog, serializeJSON, slugify } = await import(
  "../.prerender/entry-server.js"
);
const template = await readFile("dist/index.html", "utf8");
const catalog = await getPublicCatalog();
const date = new Date().toLocaleDateString("sv-SE", {
  timeZone: "Europe/Amsterdam",
});
for (const route of routes) {
  const initial = route.catalog ? catalog : null;
  const { html, head } = await render(route.path, initial);
  const snapshot = initial
    ? `<script id="kortio-catalog" type="application/json">${serializeJSON(initial)}</script>`
    : "";
  const page = template
    .replace(
      '<html lang="nl">',
      `<html lang="nl" data-rendered-date="${date}">`,
    )
    .replace("<!--seo-head-->", head)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>${snapshot}`,
    );
  await writeFile(`dist/${route.file}`, page);
}
// Deellinks uit de app: een eigen pagina per merk op /m/<slug>.
await mkdir("dist/m", { recursive: true });
const brandPaths = [];
for (const brand of catalog.brands) {
  const slug = slugify(brand.name);
  if (!slug) continue;
  const path = `/m/${slug}`;
  const { html, head } = await render(path, catalog);
  const page = template
    .replace('<html lang="nl">', `<html lang="nl" data-rendered-date="${date}">`)
    .replace("<!--seo-head-->", head)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div><script id="kortio-catalog" type="application/json">${serializeJSON(catalog)}</script>`,
    );
  await writeFile(`dist/m/${slug}.html`, page);
  brandPaths.push(path);
}
// Merken die na deze build zijn toegevoegd hebben nog geen eigen pagina. vercel.json valt dan terug op
// deze pagina: zonder snapshot, dus de browser laadt de actuele catalogus en toont alsnog het merk.
const fallback = await render("/m/nieuw-merk", null);
await writeFile(
  "dist/m-fallback.html",
  template
    .replace('<html lang="nl">', `<html lang="nl" data-rendered-date="${date}">`)
    .replace("<!--seo-head-->", fallback.head)
    .replace('<div id="root"></div>', `<div id="root">${fallback.html}</div>`),
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .filter((r) => r.indexable)
  .map(
    (r) =>
      `  <url><loc>https://www.kortio.app${r.path}</loc></url>`,
  )
  .concat(brandPaths.map((path) => `  <url><loc>https://www.kortio.app${path}</loc></url>`))
  .join("\n")}\n</urlset>\n`;
await writeFile("dist/sitemap.xml", sitemap);
await rm(".prerender", { recursive: true, force: true });
console.log(
  `Prerendered ${routes.length} pages and ${brandPaths.length} brand pages with ${catalog.brands.length} current public brands.`,
);
