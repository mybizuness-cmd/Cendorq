import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const contractPath = "src/lib/command-center/paid-report-delivery-ops.ts";
const panelPath = "src/app/command-center/paid-report-delivery-ops-panel.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-center-paid-report-delivery-ops.mjs";

expect(contractPath, [
  "PAID_REPORT_DELIVERY_COMMAND_CENTER_CONTROLS",
  "report-production",
  "attachment-generation",
  "release-approval",
  "email-delivery",
  "resend-control",
  "delivery-audit",
  "paid_report_created",
  "customer_safe_pdf_generated",
  "paid_report_approved",
  "report_delivery_email_sent_with_attachment",
  "report_delivery_resend_reviewed",
  "delivery_audit_record_created",
  "A paid report is not complete until dashboard copy is published, approved PDF is generated, report-ready email is sent with attachment, and delivery audit is recorded.",
  "metadata-only",
]);

expect(panelPath, [
  "Paid report delivery ops",
  "Dashboard copy, PDF attachment, approval, resend, and audit must agree.",
  "Metadata-only operator view",
  "Report production status",
  "Attachment generation status",
  "Release approval gate",
  "Email delivery status",
  "Resend controls",
  "Delivery audit visibility",
  "Blocked shortcut:",
  "Audit event ·",
  "No raw evidence, customer secrets, provider payloads, prompts, internal notes, payment data, or cross-customer records.",
]);

expect(registryPath, [
  "paid-report-delivery-ops",
  "Paid report delivery ops",
  "Show paid report production status, attachment generation, release approval, email delivery, resend controls, and delivery audit posture.",
  "Paid report delivery ops stay metadata-only",
  "order: 177",
]);

expect(pagePath, [
  "PaidReportDeliveryOpsPanel",
  "./paid-report-delivery-ops-panel",
  "<PaidReportDeliveryOpsPanel />",
]);

expect(routesChainPath, [validatorPath]);

forbidden(contractPath, [
  "raw provider payloads allowed",
  "resend without approval",
  "attachment optional",
  "dashboard optional",
]);

forbidden(panelPath, [
  "customer email body",
  "raw evidence payload",
  "payment data value",
  "secret value",
]);

boundedLength(contractPath, 10500);
boundedLength(panelPath, 10500);

if (failures.length) {
  console.error("Command center paid report delivery ops validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center paid report delivery ops validation passed with metadata-only production status, attachment generation, approval, resend, and delivery audit controls.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for command center paid report delivery ops standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
