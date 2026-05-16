import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const boundaryPath = "src/lib/report-vault-plan-boundary-runtime.ts";
const deliveryPath = "src/lib/paid-plan-report-delivery-operating-system.ts";
const deepReviewPath = "src/app/dashboard/reports/deep-review/page.tsx";
const buildFixPath = "src/app/dashboard/reports/build-fix/page.tsx";
const ongoingControlPath = "src/app/dashboard/reports/ongoing-control/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-paid-report-final-routes.mjs";

expect(boundaryPath, [
  "ReportVaultCustomerRoute",
  "Released paid report copies use plan-specific protected vault routes.",
  "finalRoute: \"/dashboard/reports/deep-review\"",
  "finalRoute: \"/dashboard/reports/build-fix\"",
  "finalRoute: \"/dashboard/reports/ongoing-control\"",
  "customerRoute: finalReportVisible ? definition.finalRoute : definition.fallbackRoute",
  "rawReportPayloadReturned: false",
  "rawPrivatePayloadReturned: false",
]);

expect(deliveryPath, [
  "PaidPlanReportDashboardPath",
  "dashboardPath: \"/dashboard/reports/deep-review\"",
  "dashboardPath: \"/dashboard/reports/build-fix\"",
  "dashboardPath: \"/dashboard/reports/ongoing-control\"",
  "Email must also link to the dashboard copy at /dashboard/reports/deep-review.",
  "Email must also link to the dashboard copy at /dashboard/reports/build-fix.",
  "Email must also link to the dashboard copy at /dashboard/reports/ongoing-control.",
  "Every paid plan report must have a plan-specific dashboard copy under /dashboard/reports.",
]);

expect(deepReviewPath, [
  "requirePaidPlanReportDeliveryContract(\"deep-review\")",
  "path: \"/dashboard/reports/deep-review\"",
  "Release-captain approval recorded",
  "Approved customer-safe PDF generated",
  "no raw evidence",
  "no guaranteed ranking",
  "no guaranteed AI placement",
]);

expect(buildFixPath, [
  "requirePaidPlanReportDeliveryContract(\"build-fix\")",
  "path: \"/dashboard/reports/build-fix\"",
  "Approved fix scope recorded",
  "Approved customer-safe PDF generated",
  "no raw internal notes",
  "no guaranteed outcome",
]);

expect(ongoingControlPath, [
  "requirePaidPlanReportDeliveryContract(\"ongoing-control\")",
  "path: \"/dashboard/reports/ongoing-control\"",
  "Monthly monitoring scope confirmed",
  "Approved customer-safe PDF generated",
  "no algorithm control claim",
  "no guaranteed ranking",
]);

expect(routesChainPath, [validatorPath]);

forbidden(boundaryPath, [
  "return \"/dashboard/reports\"",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
]);

forbidden(deliveryPath, [
  "dashboardPath: \"/dashboard/reports\"",
  "Email must also link to the dashboard copy at /dashboard/reports.\"",
  "Every paid plan report must have a dashboard copy at /dashboard/reports.",
]);

for (const pagePath of [deepReviewPath, buildFixPath, ongoingControlPath]) {
  forbidden(pagePath, ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "rawReportPayloadReturned: true", "rawPrivatePayloadReturned: true"]);
  boundedLength(pagePath, 6500);
}

if (failures.length) {
  console.error("Paid report final route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid report final route validation passed with plan-specific dashboard routes, matching delivery contracts, held-route copy, safe no-guarantee language, and route-chain coverage.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for a paid report final route: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
