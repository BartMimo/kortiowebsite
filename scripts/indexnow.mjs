// Meldt gewijzigde pagina's bij IndexNow (Bing, Yandex, Seznam, Naver). Bing voedt ook DuckDuckGo,
// Ecosia, Copilot en ChatGPT Search. Gewijzigd = lastmod in de live sitemap is vandaag (zie
// scripts/prerender.mjs). Draait na de dagelijkse build in GitHub Actions; met --all alles melden.
const SITE = "https://www.kortio.app";
const KEY = "c465398a74ad16963a033d9bbb36d531"; // openbaar by design: staat ook in /c465398a74ad16963a033d9bbb36d531.txt
const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Amsterdam" });
const all = process.argv.includes("--all");
const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)]
  .filter(([, , lastmod]) => all || lastmod === today)
  .map(([, loc]) => loc);
if (!urls.length) {
  console.log("Geen gewijzigde pagina's vandaag.");
  process.exit(0);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "www.kortio.app",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});
console.log(`IndexNow: ${urls.length} URL's gemeld, status ${res.status}`);
// 200/202 = ontvangen; 429 = even te vaak. Andere fouten melden.
if (res.status >= 400 && res.status !== 429) process.exit(1);
