import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const apiPath = "src/app/api/customer/notifications/route.ts";
const listPath = "src/components/customer-notifications/support-lifecycle-notification-list.tsx";
const readRoutePath = "src/app/api/customer/notifications/read/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-notification-center-unread-scope.mjs";

expect(apiPath, [
  "CustomerNotificationScope = \"all\" | \"unread\"",
  "UNREAD_NOTIFICATION_STATES",
  "queued",
  "displayed",
  "sent",
  "const scope = cleanScope(request.nextUrl.searchParams.get(\"scope\"))",
  "scope === \"unread\" && !state ? UNREAD_NOTIFICATION_STATES.has(entry.state) : true",
  "return jsonNoStore({ ok: true, returned: entries.length, scope, entries }, 200)",
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "projectCustomerSupportNotificationRecord(entry)",
]);

expect(listPath, [
  "NotificationFeedScope = \"unread\" | \"all\"",
  "const [feedScope, setFeedScope] = useState<NotificationFeedScope>(\"unread\")",
  "source=support-lifecycle&scope=${scope}&limit=25",
  "void loadNotifications(undefined, \"unread\")",
  "switchScope",
  "Show history",
  "Show unread",
  "The feed opens on unread support lifecycle signals so read acknowledgements actually quiet the dashboard.",
  "No unread support lifecycle notifications are visible.",
  "Read acknowledgements have quieted the live feed.",
  "Showing {state.scope === \"unread\" ? \"unread\" : \"all\"} support lifecycle notifications.",
]);

expect(readRoutePath, [
  "state: \"read\" as const",
  "readAt: entry.readAt || now",
  "markAllSupportLifecycle",
]);

expect(routesChainPath, [validatorPath]);

forbidden(apiPath, [
  "scope = \"all\"",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "internalNotesStored: true",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
]);

forbidden(listPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "customerIdHash",
  "auditEventId",
  "console.log",
]);

if (failures.length) {
  console.error("Notification center unread scope validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center unread scope validation passed with unread-by-default loading, safe all-history toggle, customer-owned notification API filtering, read acknowledgement quieting, and route-chain coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
