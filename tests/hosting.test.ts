import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const hosting = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));

test("brand links added after the last build fall back to a live page instead of a 404", () => {
  const brand = hosting.rewrites.filter((r: any) => r.source === "/m/:slug");
  // Volgorde telt: eerst de vooraf gebouwde merkpagina, pas als die ontbreekt de terugvalpagina.
  assert.deepEqual(
    brand.map((r: any) => r.destination),
    ["/m/:slug.html", "/m-fallback.html"],
  );
});
test("every page is sent with security headers that block framing and sniffing", () => {
  const all = hosting.headers.find((h: any) => h.source === "/(.*)");
  const value = (key: string) =>
    all?.headers.find((h: any) => h.key === key)?.value ?? "";
  assert.match(value("Content-Security-Policy"), /frame-ancestors 'none'/);
  assert.match(value("Content-Security-Policy"), /script-src 'self';/);
  assert.equal(value("X-Frame-Options"), "DENY");
  assert.equal(value("X-Content-Type-Options"), "nosniff");
});
test("the old Android 2.0 APK link now leads to Google Play", () => {
  const apk = hosting.redirects.find((r: any) => r.source === "/downloads/Kortioapp.apk");
  assert.equal(apk?.destination, "https://play.google.com/store/apps/details?id=kortio.kortio");
});
