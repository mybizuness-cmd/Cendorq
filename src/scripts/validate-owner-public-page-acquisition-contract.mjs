import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/owner-public-page-acquisition-contract.ts";
const failures = [];

expect(contractPath, [
  "OwnerPublicPageAcquisitionTarget",
  "OwnerPublicPageAcquisitionProjection",
  "OWNER_PUBLIC_PAGE_ACQUISITION_STANDARD",
  "buildOwnerPublicPageAcquisitionProjection",
  "owner-public-company-preview-acquisition",
  "safe-public-url-only",
  "robotsRespectRequired: true",
  "timeoutMs: 8000",
  "maxBytes: 500000",
  "rawHtmlStored: false",
  "rawScreenshotStored: false",
  "rawHtmlReturned: false",
  "rawScreenshotReturned: false",
  "credentialsAllowed: false",
  "privateNetworkAllowed: false",
  "privateCredentialReturned: false",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "Only safe public company URLs may enter owner report test acquisition.",
  "must not store or return raw HTML, raw screenshots, credentials, session data, private network responses, or private customer data",
]);

forbidden(contractPath, [
  "rawHtmlStored: true",
  "rawScreenshotStored: true",
  "rawHtmlReturned: true",
  "rawScreenshotReturned: true",
  "credentialsAllowed: true",
  "privateNetworkAllowed: true",
  "privateCredentialReturned: true",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "guaranteed ranking",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Owner public page acquisition contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner public page acquisition contract validation passed.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
