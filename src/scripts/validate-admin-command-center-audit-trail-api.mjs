import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/audit/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "NextRequest",
  "NextResponse",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
  "projection: \"admin-command-center-audit-trail\"",
  "jsonNoStore",
  "Cache-Control",
  "no-store, max-age=0",
  "X-Robots-Tag",
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

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-audit-trail-api.mjs",
]);

forbidden(apiPath, [
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

console.log("Admin command center audit trail API validation passed.");

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
