import { test } from "node:test";
import assert from "node:assert/strict";
import { safeWebURL, isCurrentBrand } from "../lib/brand-utils.ts";

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
