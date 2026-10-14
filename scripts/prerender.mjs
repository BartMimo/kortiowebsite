import { readFile, writeFile, rm } from "node:fs/promises";
import { routes } from "./routes.mjs";

process.env.NODE_ENV = "production";
const { render, getPublicCatalog, serializeJSON } = await import(
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
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .filter((r) => r.indexable)
  .map(
    (r) =>
      `  <url><loc>https://www.kortio.app${r.path}</loc></url>`,
  )
  .join("\n")}\n</urlset>\n`;
await writeFile("dist/sitemap.xml", sitemap);
await rm(".prerender", { recursive: true, force: true });
console.log(
  `Prerendered ${routes.length} pages with ${catalog.brands.length} current public brands.`,
);
