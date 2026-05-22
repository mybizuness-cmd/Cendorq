import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const readinessPath = "docs/presence-report-merge-readiness.md";
const statusPath = "docs/presence-report-batch-status.md";
const runbookPath = "docs/presence-report-validation-runbook.md";
const packagePath = "package.json";
const systemValidatorPath = "src/scripts/validate-presence-report-system.mjs";
const thisValidatorPath = "src/scripts/validate-presence-report-merge-readiness.mjs";
const fixtureValidatorPath = "src/scripts/validate-sandwork-presence-report-fixture.mjs";
const objectIndexPath = "src/lib/presence-report-object-index.ts";

expect(readinessPath, [
  "Presence Report merge readiness",
  "pnpm validate:routes",
  "pnpm validate:presence-report",
  "pnpm lint",
  "pnpm typecheck",
  "pnpm build",
  "Latest PR head must be green in Vercel.",
  "Main has changed public pages that overlap this branch.",
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/app/sitemap.ts",
  "src/lib/seo.ts",
  "Free Scan remains first signal only.",
  "Sample Report remains example, not a promise.",
  "Presence Report recommendations stay evidence-led.",
  "Public sitemap includes Sample Report and vertical sample routes",
  "Demo fixture readiness",
  "src/lib/sandwork-presence-report-fixture.ts",
  "Protected Free Scan preview and Dashboard Presence Command Snapshot consume the shared Sandwork report package",
  "Presence Report object index exposes the shared demo report package",
  "src/scripts/validate-sandwork-presence-report-fixture.mjs",
  "Sandwork demo data stays centralized in the shared report package",
]);

expect(statusPath, [
  "Update branch against main before merge because public pages overlap current main changes.",
  "Presence Report merge-readiness checklist.",
  "Keep the PR draft until merge-readiness and base-update review are complete.",
]);

expect(runbookPath, [
  "Presence Report validation runbook",
  "pnpm validate:routes",
  "pnpm validate:presence-report",
  "Release Gate checks approved facts",
  "Merge readiness checks base-update risk",
  "src/lib/sandwork-presence-report-fixture.ts",
  "src/scripts/validate-sandwork-presence-report-fixture.mjs",
]);

expect(packagePath, [
  "validate:presence-report",
  "node ./src/scripts/validate-presence-report-system.mjs",
]);

expect(systemValidatorPath, [
  thisValidatorPath,
  fixtureValidatorPath,
  "Presence Report system validation passed with merge-readiness coverage.",
]);

expect(objectIndexPath, [
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "demoReportPackage",
]);

if (failures.length) {
  console.error("Presence Report merge readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report merge readiness validation passed with deployment, local validation, package shortcut, base update, sitemap, navigation, Sandwork fixture, object index, and system-chain coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
