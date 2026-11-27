import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { routes } from "./routes.mjs";

const sitemap = await readFile("dist/sitemap.xml", "utf8");
const robots = await readFile("dist/robots.txt", "utf8");
const hosting = JSON.parse(await readFile("vercel.json", "utf8"));
const titles = new Set();
for (const route of routes) {
  const page = await readFile(`dist/${route.file}`, "utf8");
  assert.equal(
    (page.match(/<title\b/g) ?? []).length,
    1,
    `${route.path}: one title`,
  );
  const title = page.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  if (route.indexable) {
    assert(!titles.has(title), `${route.path}: unique title`);
    titles.add(title);
  }
  assert.equal(
    (page.match(/<meta[^>]+name="description"/g) ?? []).length,
    1,
    `${route.path}: one description`,
  );
  assert.equal(
    (page.match(/<meta[^>]+name="robots"/g) ?? []).length,
    1,
    `${route.path}: one robots tag`,
  );
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(
    page,
  );
  assert.equal(
    noindex,
    !route.indexable,
    `${route.path}: correct index control`,
  );
  const canonicals = [
    ...page.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g),
  ].map((m) => m[1]);
  const expected = `https://www.kortio.app${route.path}`;
  if (route.indexable || ["/privacy", "/voorwaarden"].includes(route.path))
    assert.deepEqual(canonicals, [expected], `${route.path}: canonical`);
  else
    assert.equal(
      canonicals.length,
      0,
      `${route.path}: no unrelated homepage canonical`,
    );
  assert.equal(
    sitemap.includes(`<loc>${expected}</loc>`),
    route.indexable,
    `${route.path}: sitemap coverage`,
  );
  assert(
    !page.includes('id="root"></div>'),
    `${route.path}: HTML is populated`,
  );
  if (route.path !== "/admin")
    assert.equal(
      (page.match(/<h1\b/g) ?? []).length,
      1,
      `${route.path}: one visible H1`,
    );
  const schema = [
    ...page.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    ),
  ].map((m) => JSON.parse(m[1]));
  if (route.indexable) {
    const graph = schema.flatMap((s) => s["@graph"] ?? [s]);
    assert(
      graph.some(
        (s) => s["@type"] === "WebSite" && s.url === "https://www.kortio.app/",
      ),
    );
    assert(
      graph.some(
        (s) =>
          ["WebPage", "CollectionPage", "AboutPage"].includes(s["@type"]) &&
          s.url === expected,
      ),
    );
    assert(!graph.some((s) => s.aggregateRating), "No invented rating");
  }
  if (route.catalog) {
    const snapshot = JSON.parse(
      page.match(/<script id="kortio-catalog"[^>]*>(.*?)<\/script>/s)?.[1],
    );
    const cards = (page.match(/<article class="brand-card[" ]/g) ?? []).length;
    assert(snapshot.brands.length > 0, "Read-only public catalog succeeded");
    assert.equal(
      cards,
      route.path === "/"
        ? snapshot.brands.length
        : Math.min(3, snapshot.brands.length),
    );
  }
  if (route.path !== "/" && route.file !== "404.html") {
    assert(
      hosting.rewrites.some(
        (r) => r.source === route.path && r.destination === `/${route.file}`,
      ),
      `${route.path}: static HTML is served`,
    );
  }
}
// Merk- en categoriepagina's: zelfde basiseisen als de vaste pagina's.
const dynamicPages = [
  ...(await readdir("dist/m")).map((f) => ({ dir: "m", file: f })),
  ...(await readdir("dist/kortingscodes")).map((f) => ({ dir: "kortingscodes", file: f })),
];
assert(dynamicPages.some((p) => p.dir === "kortingscodes"), "category pages are built");
// Footer, homepage en kruimelpaden linken vast naar elke categoriepagina. Is er een leeg (bijv. omdat
// de categorie in Supabase is hernoemd), dan liever een mislukte build (de oude versie blijft live)
// dan links naar een noindex-pagina. Oplossen: dbName in lib/categories.ts aanpassen.
for (const { dir, file } of dynamicPages.filter((p) => p.dir === "kortingscodes")) {
  const html = await readFile(`dist/${dir}/${file}`, "utf8");
  assert(
    !/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html),
    `/${dir}/${file}: categorie zonder merken. Is de categorie in Supabase hernoemd? Pas lib/categories.ts aan.`,
  );
}
for (const { dir, file } of dynamicPages) {
  const path = `/${dir}/${file.replace(/\.html$/, "")}`;
  const page = await readFile(`dist/${dir}/${file}`, "utf8");
  const title = page.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  assert(title && title.length <= 66, `${path}: title present and short (${title})`);
  assert(!titles.has(title), `${path}: unique title`);
  titles.add(title);
  const description = page.match(/<meta[^>]+name="description" content="([^"]*)"/)?.[1];
  assert(description && description.length <= 170, `${path}: description present and short`);
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1, `${path}: one H1`);
  const canonicals = [...page.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map(
    (m) => m[1],
  );
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(page);
  if (!noindex) {
    assert.deepEqual(canonicals, [`https://www.kortio.app${path}`], `${path}: canonical`);
    assert(sitemap.includes(`<loc>https://www.kortio.app${path}</loc>`), `${path}: in sitemap`);
    const graph = [
      ...page.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
    ].flatMap((m) => JSON.parse(m[1])["@graph"] ?? []);
    const crumbs = graph.find((s) => s["@type"] === "BreadcrumbList")?.itemListElement ?? [];
    assert(crumbs.length >= 2, `${path}: breadcrumb`);
    assert(!crumbs.some((c) => /\| Kortio|— Kortio/.test(c.name)), `${path}: clean crumb names`);
    if (dir === "kortingscodes")
      assert(graph.some((s) => s["@type"] === "ItemList"), `${path}: item list`);
  }
  const snapshot = page.match(/<script id="kortio-catalog"[^>]*>(.*?)<\/script>/s)?.[1];
  if (dir === "m") assert(!snapshot || snapshot.length < 25000, `${path}: small snapshot`);
}
// Interne links: de homepage linkt naar elke merkpagina die hij toont.
const home = await readFile("dist/index.html", "utf8");
const homeCards = (home.match(/<article class="brand-card[" ]/g) ?? []).length;
const homeBrandLinks = new Set([...home.matchAll(/href="(\/m\/[^"]+)"/g)].map((m) => m[1]));
assert(homeBrandLinks.size >= homeCards, "homepage links every brand card to its page");
assert(home.includes('href="/kortingscodes/mode"'), "homepage links category pages");
// Elke URL in de sitemap heeft een geldige lastmod.
const entries = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod><\/url>/g)];
assert.equal(entries.length, (sitemap.match(/<url>/g) ?? []).length, "every sitemap URL has lastmod");
assert(robots.includes("Sitemap: https://www.kortio.app/sitemap.xml"));
assert(!sitemap.includes("https://kortio.app"));
assert(
  !robots.includes("Disallow: /admin"),
  "Allow Google to see noindex on login/admin",
);
assert(
  hosting.redirects.some(
    (r) => r.source === "/merken" && r.destination === "/" && r.permanent,
  ),
);
console.log(
  `SEO artifact checks passed for ${routes.length} pages and ${dynamicPages.length} brand/category pages: HTML, metadata, schema, catalog, internal links, sitemap and hosting routes.`,
);
