import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const safetyPath = "src/lib/owner-public-company-url-safety.ts";
const failures = [];

expect(safetyPath, [
  "OwnerPublicCompanyUrlSafetyResult",
  "OWNER_PUBLIC_COMPANY_URL_SAFETY_STANDARD",
  "validateOwnerPublicCompanyUrl",
  "public-url-accepted",
  "missing-url",
  "invalid-url",
  "unsupported-protocol",
  "blocked-local-host",
  "blocked-private-host",
  "blocked-credentialed-url",
  "blocked-oversized-url",
  "fetchAllowed: true",
  "screenshotsAllowed: true",
  "credentialsAllowed: false",
  "privateNetworkAllowed: false",
  "localhost",
  "127.0.0.1",
  "192.168.",
  "Owner report test mode can inspect public company URLs only.",
  "must reject localhost, private network, credentialed, unsupported protocol, and oversized URLs",
]);

forbidden(safetyPath, [
  "credentialsAllowed: true",
  "privateNetworkAllowed: true",
  "fetchAllowed: true,\n    screenshotsAllowed: true,\n    credentialsAllowed: true",
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "guaranteed accuracy",
  "guaranteed ranking",
  "guaranteed ROI",
]);

if (failures.length) {
  console.error("Owner public company URL safety validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner public company URL safety validation passed.");

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
