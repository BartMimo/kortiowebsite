import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  if (route.indexable || route.path === "/privacy")
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
          ["WebPage", "CollectionPage"].includes(s["@type"]) &&
          s.url === expected,
      ),
    );
    assert(!graph.some((s) => s.aggregateRating), "No invented rating");
  }
  if (route.catalog) {
    const snapshot = JSON.parse(
      page.match(/<script id="kortio-catalog"[^>]*>(.*?)<\/script>/s)?.[1],
    );
    const cards = (page.match(/<article class="brand-card"/g) ?? []).length;
    assert(snapshot.brands.length > 0, "Read-only public catalog succeeded");
    assert.equal(
      cards,
      route.path === "/merken"
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
assert(robots.includes("Sitemap: https://www.kortio.app/sitemap.xml"));
assert(!sitemap.includes("https://kortio.app"));
assert(
  !robots.includes("Disallow: /admin"),
  "Allow Google to see noindex on login/admin",
);
assert(
  hosting.redirects.some(
    (r) => r.source === "/home" && r.destination === "/" && r.permanent,
  ),
);
console.log(
  `SEO artifact checks passed for ${routes.length} pages: HTML, metadata, schema, catalog, sitemap and hosting routes.`,
);
