import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "../api/send-merk.ts";

async function call(method: string, body?: unknown) {
  const result: { status: number; body: any; headers: Record<string, string> } =
    { status: 0, body: null, headers: {} };
  const res = {
    setHeader: (name: string, value: string) => {
      result.headers[name] = value;
    },
    status: (code: number) => {
      result.status = code;
      return res;
    },
    json: (value: unknown) => {
      result.body = value;
    },
  };
  await handler({ method, body }, res);
  return result;
}
test("capability endpoint and valid submission offer a truthful fallback without mail configuration", async () => {
  for (const name of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"])
    delete process.env[name];
  const availability = await call("GET");
  assert.equal(availability.status, 200);
  assert.equal(availability.body.canSendEmail, false);
  assert.equal(availability.headers["Cache-Control"], "no-store");
  const submission = await call("POST", {
    Merknaam: "Test",
    Omschrijving: "10% korting",
    Email: "test@example.com",
  });
  assert.equal(submission.status, 503);
});
test("invalid emails and header line breaks are rejected before attempting mail delivery", async () => {
  const invalid = await call("POST", {
    Merknaam: "Test",
    Omschrijving: "10%",
    Email: "not-an-email",
  });
  assert.equal(invalid.status, 400);
  const injected = await call("POST", {
    Merknaam: "Test\r\nExtra header",
    Omschrijving: "10%",
    Email: "test@example.com",
  });
  assert.equal(injected.status, 400);
});
