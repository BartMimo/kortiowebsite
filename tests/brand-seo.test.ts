import { test } from "node:test";
import assert from "node:assert/strict";
import {
  brandDescription,
  brandTitle,
  mentionsFreeShipping,
  offerText,
  relatedBrands,
  titlePeriod,
} from "../lib/brand-seo.ts";
import { brandContent } from "../lib/brand-content.ts";
import { categoryPages } from "../lib/categories.ts";

const now = new Date("2026-11-27T10:00:00Z");
const brand = (over: Record<string, unknown> = {}) =>
  ({
    id: "1",
    name: "Bamigo",
    discount_text: "€10 Korting",
    code: "X",
    website_url: null,
    primary_category_id: "mode",
    is_featured: false,
    is_temporary: false,
    valid_from: null,
    valid_until: null,
    url_image: null,
    last_verified_at: null,
    category_name: "Mode",
    ...over,
  }) as any;

test("offer text keeps capitals that matter and lowercases the rest", () => {
  assert.equal(offerText("20% Korting (PLUS-members)"), "20% korting (PLUS-members)");
  assert.equal(
    offerText("15% Extra korting op geselecteerde ASICS"),
    "15% extra korting op geselecteerde ASICS",
  );
  assert.equal(offerText("10% Korting op Nike", ["Nike"]), "10% korting op Nike");
  assert.equal(offerText("15% Korting op Apple-accessoires"), "15% korting op Apple-accessoires");
  assert.equal(
    offerText("10% Korting op L'Oréal Paris (in de app)"),
    "10% korting op L'Oréal Paris (in de app)",
  );
  assert.equal(
    offerText("20% Studentenkorting (Alleen studenten) via UNiDAYS"),
    "20% studentenkorting (alleen studenten) via UNiDAYS",
  );
  assert.equal(offerText(null), "");
});

test("free-shipping question only when the text is about free shipping", () => {
  assert(mentionsFreeShipping("Verzenden kost €4,95; vanaf €60 is het gratis."));
  assert(mentionsFreeShipping("Vanaf €150 is verzenden gratis."));
  assert(!mentionsFreeShipping("Je kunt je bestelling gratis laten leveren in een Ulla Popken-winkel."));
  assert(!mentionsFreeShipping("Verzenden kost €2,95."));
});

test("month only in the title when the code was tested in the last 45 days (besluit Bart)", () => {
  assert.equal(titlePeriod({ last_verified_at: "2026-11-20" }, now), "november 2026");
  assert.equal(titlePeriod({ last_verified_at: "2026-10-14" }, now), "november 2026");
  assert.equal(titlePeriod({ last_verified_at: "2026-10-01" }, now), "2026");
  assert.equal(titlePeriod({ last_verified_at: null }, now), "2026");
});

test("brand titles lead with the search term, stay short and keep conditions", () => {
  assert.equal(
    brandTitle(brand({ last_verified_at: "2026-11-25" }), now),
    "Bamigo kortingscode november 2026: €10 korting | Kortio",
  );
  assert.equal(brandTitle(brand(), now), "Bamigo kortingscode 2026: €10 korting | Kortio");
  const happy = brandTitle(
    brand({ name: "Happy Size", discount_text: "20% Korting (PLUS-members)" }),
    now,
  );
  assert(happy.length <= 62, happy);
  assert.match(happy, /^Happy Size kortingscode 2026: 20% korting \(PLUS-members\)/);
  assert.match(brandTitle(brand({ name: "16/08", discount_text: "10% Korting" }), now), /^16\/08 \(1608\) kortingscode 2026/);
  for (const name of ["Smartphonehoesjes.nl", "Hippe Geboortekaartjes", "All4running"])
    assert(
      brandTitle(brand({ name, discount_text: "15% Extra korting op geselecteerde ASICS" }), now)
        .length <= 62,
    );
});

test("descriptions mention a recent test, a brand fact and fit in 160 characters", () => {
  const d = brandDescription(
    brand({ name: "AYBL", discount_text: "10% Korting", last_verified_at: "2026-11-20" }),
    brandContent["aybl"],
    now,
  );
  assert(d.length <= 160, d);
  assert.match(d, /^AYBL kortingscode voor 10% korting, getest op 20 november 2026\./);
  for (const [slug, content] of Object.entries(brandContent)) {
    const text = brandDescription(brand({ name: slug }), content, now);
    assert(text.length <= 160, `${slug}: ${text.length}`);
  }
});

test("related brands: same category, not itself, featured first, at most 8", () => {
  const list = Array.from({ length: 12 }, (_, i) =>
    brand({ id: String(i + 2), name: `Merk ${String.fromCharCode(65 + i)}`, is_featured: i === 11 }),
  );
  const other = brand({ id: "99", name: "Ander", primary_category_id: "sport" });
  const self = brand();
  const related = relatedBrands(self, [self, other, ...list]);
  assert.equal(related.length, 8);
  assert(!related.includes(self) && !related.includes(other));
  assert.equal(related[0].name, "Merk L");
  const loose = [brand({ id: "a", primary_category_id: null }), brand({ id: "b", primary_category_id: null })];
  assert.deepEqual(relatedBrands(loose[0], loose), []);
});

test("brand facts are complete sentences with a source on the brand's own site", () => {
  for (const [slug, c] of Object.entries(brandContent)) {
    for (const fact of [c.shipping, c.returns, ...(c.savings ?? [])].filter(Boolean)) {
      assert.match(fact!.text, /[.!?]$/, `${slug}: ${fact!.text}`);
      assert.match(fact!.source, /^https:\/\//, `${slug}: source`);
    }
    if (c.about) assert(c.about.length >= 60 && c.about.length <= 400, `${slug}: about length`);
  }
});

test("category pages have unique slugs and their own copy", () => {
  const slugs = categoryPages.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const c of categoryPages) {
    assert.match(c.heading, /^Kortingscodes voor /);
    assert(c.faq.length >= 2);
  }
});
