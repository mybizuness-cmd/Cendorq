import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const deliveryPath = "src/lib/paid-plan-report-delivery-operating-system.ts";
const emailPath = "src/lib/customer-email-template-contracts.ts";
const runtimePath = "src/lib/customer-revenue-workflow-runtime.ts";
const reportVaultPath = "src/app/dashboard/reports/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-paid-plan-report-delivery-operating-system.mjs";

expect(deliveryPath, [
  "PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM",
  "Every paid plan report must have a plan-specific dashboard copy under /dashboard/reports.",
  "Every paid plan report delivery email must include the approved customer-safe report PDF as an attachment.",
  "Dashboard copy and email attachment must be generated from the same approved report version.",
  "Free Scan is excluded from paid-report attachment requirements",
  "deep-review-report-delivery",
  "build-fix-summary-delivery",
  "ongoing-control-monthly-delivery",
  "dashboardPath: \"/dashboard/reports/deep-review\"",
  "dashboardPath: \"/dashboard/reports/build-fix\"",
  "dashboardPath: \"/dashboard/reports/ongoing-control\"",
  "Email must also link to the dashboard copy at /dashboard/reports/deep-review.",
  "Email must also link to the dashboard copy at /dashboard/reports/build-fix.",
  "Email must also link to the dashboard copy at /dashboard/reports/ongoing-control.",
  "cendorq-deep-review-{business}-{reportVersion}.pdf",
  "cendorq-build-fix-summary-{business}-{reportVersion}.pdf",
  "cendorq-ongoing-control-{business}-{month}.pdf",
  "report_delivery_email_sent_with_attachment",
  "application/pdf",
]);

expect(emailPath, [
  "CustomerEmailAttachmentContract",
  "source?: \"approved-paid-report\" | \"none\"",
  "every paid report delivery email includes the approved customer-safe PDF attachment and dashboard report link",
  "do not send if attachment generation fails",
  "customer-safe PDF generated",
  "attachment delivery audit",
  "deep-review-delivered",
  "build-fix-delivered",
  "ongoing-control-monthly",
  "cendorq-deep-review-{business}-{reportVersion}.pdf",
  "cendorq-build-fix-summary-{business}-{reportVersion}.pdf",
  "cendorq-ongoing-control-{business}-{month}.pdf",
  "approved PDF attachment",
]);

requirePaidEmailAttachment(emailPath, "deep-review-delivered", "cendorq-deep-review-{business}-{reportVersion}.pdf");
requirePaidEmailAttachment(emailPath, "build-fix-delivered", "cendorq-build-fix-summary-{business}-{reportVersion}.pdf");
requirePaidEmailAttachment(emailPath, "ongoing-control-monthly", "cendorq-ongoing-control-{business}-{month}.pdf");

expect(runtimePath, [
  "requirePaidPlanReportDeliveryContract",
  "paidReportDelivery",
  "reportAttachmentRequired: true",
  "reportAttachmentFileNamePattern",
  "reportAttachmentContentType: \"application/pdf\"",
  "paid_report_dashboard_path: \"/dashboard/reports\"",
  "paid_report_attachment_required: \"true\"",
  "paid_report_attachment_content_type: \"application/pdf\"",
  "paid_report_delivery_contract_attached",
]);

expect(reportVaultPath, [
  "Paid plan report delivery operating system",
  "Paid proof",
  "Dashboard + email attachment",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF.",
  "Readiness signal result dashboard-only protected result",
  "AI Readiness Review report dashboard plus email attachment",
  "Signal Repair summary dashboard plus email attachment",
  "Readiness Control monthly summary dashboard plus email attachment",
]);

expect(routesChainPath, [validatorPath]);

forbidden(deliveryPath, [
  "email only",
  "dashboard optional",
  "attachment optional",
  "no attachment required",
  "Every paid plan report must have a dashboard copy at /dashboard/reports.",
]);

boundedLength(deliveryPath, 15000);
boundedLength(reportVaultPath, 18500);
boundedLength(runtimePath, 11500);

if (failures.length) {
  console.error("Paid plan report delivery operating system validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid plan report delivery operating system validation passed with plan-specific dashboard report copies, approved PDF email attachments, backend gates, and audit events.");

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

function requirePaidEmailAttachment(path, key, fileNamePattern) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  const keyIndex = text.indexOf(`key: \"${key}\"`);
  if (keyIndex < 0) {
    failures.push(`${path} missing paid email key: ${key}`);
    return;
  }

  const nextTemplateIndex = text.indexOf("\n  {", keyIndex + 1);
  const block = text.slice(keyIndex, nextTemplateIndex > keyIndex ? nextTemplateIndex : undefined);
  for (const phrase of ["attachment: { required: true", fileNamePattern, "contentType: \"application/pdf\"", "source: \"approved-paid-report\"", "releaseGate:"]) {
    if (!block.includes(phrase)) failures.push(`${path} paid email ${key} missing attachment phrase: ${phrase}`);
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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the paid report delivery standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
