import test from "node:test";
import assert from "node:assert/strict";
import { serializeJSON } from "../lib/seo.ts";

test("public database text cannot break out of the initial HTML JSON script", () => {
  const value = { name: '</script><script>alert("x")</script>', code: "A&B" };
  const serialized = serializeJSON(value);
  assert(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), value);
});
