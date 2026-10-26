import { test } from "node:test";
import assert from "node:assert/strict";
import { safeWebURL, isCurrentBrand, imageKey } from "../lib/brand-utils.ts";

test("links accept web addresses and reject executable or malformed schemes", () => {
  assert.equal(safeWebURL("www.example.com"), "https://www.example.com/");
  assert.equal(
    safeWebURL(" https://example.com/deal "),
    "https://example.com/deal",
  );
  for (const value of [
    "javascript:alert(1)",
    "data:text/html,hello",
    "file:///etc/passwd",
    "https://",
    "",
    null,
  ])
    assert.equal(safeWebURL(value), null);
});
test("admin website links: addresses without https:// work and script links stay blocked", () => {
  // Live staat een actief merk met 'g.co/...'; new URL() daarop liet de website-admin crashen.
  assert.equal(safeWebURL("g.co/g1refer"), "https://g.co/g1refer");
  assert.equal(safeWebURL("javascript://kortio.app/%0aalert(1)"), null);
  assert.equal(safeWebURL("JavaScript:alert(1)"), null);
});
test("a signed and a public Supabase logo link share one thumbnail key", () => {
  const base = "https://dqmbutgyczblvjplowkc.supabase.co/storage/v1/object";
  const publicURL = `${base}/public/assets/Athletic%20Bee.png`;
  assert.equal(imageKey(`${base}/sign/assets/Athletic%20Bee.png?token=abc.def.ghi`), publicURL);
  assert.equal(imageKey(publicURL), publicURL);
  const favicon = "https://www.google.com/s2/favicons?domain=gimber.com&sz=256";
  assert.equal(imageKey(favicon), favicon);
  assert.equal(imageKey(null), "");
});
test("temporary offers are hidden before starting and after expiry, but kept on their valid date", () => {
  const date = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Amsterdam",
  });
  assert.equal(
    isCurrentBrand({
      is_temporary: true,
      valid_from: "2099-01-01",
      valid_until: null,
    }),
    false,
  );
  assert.equal(
    isCurrentBrand({
      is_temporary: true,
      valid_from: null,
      valid_until: "2000-01-01",
    }),
    false,
  );
  assert.equal(
    isCurrentBrand({ is_temporary: true, valid_from: date, valid_until: date }),
    true,
  );
  assert.equal(
    isCurrentBrand({ is_temporary: true, valid_from: null, valid_until: null }),
    true,
  );
  assert.equal(
    isCurrentBrand({
      is_temporary: false,
      valid_from: "2099-01-01",
      valid_until: "2000-01-01",
    }),
    true,
  );
});
