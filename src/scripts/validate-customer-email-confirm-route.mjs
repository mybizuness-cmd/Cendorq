import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const file = "src/app/api/customer/email/confirm/route.ts";
const failures = [];

expect(file, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "revalidate = 0",
  "verifyCustomerEmailConfirmationToken",
  "getCustomerEmailVerificationNoStoreHeaders",
  "setCustomerRememberedSessionCookie",
  "status: 303",
  "recoveryUrl = new URL(\"/login\"",
  "email-link-used",
  "email-link-expired",
  "email-link-invalid",
  "cookieOnly: true",
  "customerIdHashReturned: false",
  "signupEmailHashReturned: false",
  "rawEmailReturned: false",
]);

forbidden(file, [
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "console.log",
  "httpOnly: false",
  "secure: false",
]);

if (failures.length) {
  console.error("Customer email confirm route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirm route validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
