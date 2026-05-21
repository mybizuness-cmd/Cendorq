import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const readinessPath = "docs/presence-report-merge-readiness.md";
const statusPath = "docs/presence-report-batch-status.md";
const runbookPath = "docs/presence-report-validation-runbook.md";
const systemValidatorPath = "src/scripts/validate-presence-report-system.mjs";
const thisValidatorPath = "src/scripts/validate-presence-report-merge-readiness.mjs";

expect(readinessPath, [
  "Presence Report merge readiness",
  "pnpm validate:routes",
  "node ./src/scripts/validate-presence-report-system.mjs",
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
]);

expect(statusPath, [
  "Update branch against main before merge because public pages overlap current main changes.",
  "Presence Report merge-readiness checklist.",
  "Keep the PR draft until merge-readiness and base-update review are complete.",
]);

expect(runbookPath, [
  "Presence Report validation runbook",
  "pnpm validate:routes",
  "node ./src/scripts/validate-presence-report-system.mjs",
  "Release Gate checks approved facts",
  "Merge readiness checks base-update risk",
]);

expect(systemValidatorPath, [
  thisValidatorPath,
  "Presence Report system validation passed with merge-readiness coverage.",
]);

if (failures.length) {
  console.error("Presence Report merge readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report merge readiness validation passed with deployment, local validation, base update, sitemap, navigation, and system-chain coverage.");

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
