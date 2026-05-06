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
  "Every paid plan report must have a dashboard copy at /dashboard/reports.",
  "Every paid plan report delivery email must include the approved customer-safe report PDF as an attachment.",
  "Dashboard copy and email attachment must be generated from the same approved report version.",
  "Free Scan is excluded from paid-report attachment requirements",
  "deep-review-report-delivery",
  "build-fix-summary-delivery",
  "ongoing-control-monthly-delivery",
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
  "cendorq-deep-review-{business}-{reportVersion}.pdf",
  "cendorq-build-fix-summary-{business}-{reportVersion}.pdf",
  "cendorq-ongoing-control-{business}-{month}.pdf",
  "approved PDF attachment",
]);

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
  "See every approved report in the dashboard, then recover paid reports from email.",
  "Dashboard + attachment.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF attachment.",
  "Deep Review report dashboard plus email attachment",
  "Build Fix summary dashboard plus email attachment",
  "Ongoing Control monthly summary dashboard plus email attachment",
  "Free Scan result dashboard-only protected result",
]);

expect(routesChainPath, [validatorPath]);

forbidden(deliveryPath, [
  "email only",
  "dashboard optional",
  "attachment optional",
  "no attachment required",
]);

forbidden(emailPath, [
  "deep-review-delivered",
  "attachment: NO_ATTACHMENT,\n  },\n  {\n    key: \"build-fix-delivered\"",
  "build-fix-delivered",
  "attachment: NO_ATTACHMENT,\n  },\n  {\n    key: \"ongoing-control-monthly\"",
]);

boundedLength(deliveryPath, 14500);
boundedLength(reportVaultPath, 17000);
boundedLength(runtimePath, 10000);

if (failures.length) {
  console.error("Paid plan report delivery operating system validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid plan report delivery operating system validation passed with dashboard report copies, approved PDF email attachments, backend gates, and audit events.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the paid report delivery standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
