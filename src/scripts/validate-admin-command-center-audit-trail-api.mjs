import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/audit/route.ts";
const responsePath = "src/lib/admin-command-center-safe-response.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "NextRequest",
  "adminCommandCenterJsonNoStore",
  "@/lib/admin-command-center-safe-response",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
  "projection: \"admin-command-center-audit-trail\"",
]);

expect(apiPath, [
  "projectAdminCommandCenterAccess",
  "projectAdminCommandCenterAuditEvent",
  "safe-read-reviewed",
  "mission-brief-reviewed",
  "report-release-reviewed",
  "review-audit-trail",
  "mutationRequested: false",
  "auditContextPresent: true",
  "safeProjectionOnly: access.safeProjectionOnly",
  "immutable: event.immutable",
]);

expect(apiPath, [
  "events: events.map",
  "eventId: event.eventId",
  "eventType: event.eventType",
  "decision: event.decision",
  "reasonCodes: event.reasonCodes",
  "evidenceRefCount: event.evidenceRefCount",
  "approvalRefCount: event.approvalRefCount",
  "safeProjectionOnly: event.safeProjectionOnly",
  "noStoreRequired: event.noStoreRequired",
]);

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "adminCommandCenterJsonNoStore",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-audit-trail-api.mjs",
]);

forbidden(apiPath, [
  "NextResponse.json",
  "function jsonNoStore",
  "headers: {",
  "Cache-Control",
  "X-Robots-Tag",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "console.log",
  "rawPayload",
  "privateKey",
  "sessionToken",
  "csrfToken",
  "mutationRequested: true",
]);

if (failures.length) {
  console.error("Admin command center audit trail API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center audit trail API validation passed with shared safe response coverage.");

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
