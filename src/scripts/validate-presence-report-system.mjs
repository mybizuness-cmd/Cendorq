import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();

const validators = [
  "src/scripts/validate-presence-report-public-contract.mjs",
  "src/scripts/validate-presence-report-next-move-typing.mjs",
  "src/scripts/validate-presence-report-next-move-helper.mjs",
  "src/scripts/validate-presence-report-next-move-policy.mjs",
  "src/scripts/validate-presence-report-next-move-policy-panel.mjs",
  "src/scripts/validate-presence-report-preview-component.mjs",
  "src/scripts/validate-presence-report-preview-system.mjs",
  "src/scripts/validate-business-truth-profile-contract.mjs",
  "src/scripts/validate-choice-gap-contract.mjs",
  "src/scripts/validate-control-snapshot-contract.mjs",
  "src/scripts/validate-presence-report-proof-map.mjs",
  "src/scripts/validate-presence-report-evidence-boundary.mjs",
  "src/scripts/validate-presence-report-evidence-record-contracts.mjs",
  "src/scripts/validate-presence-report-evidence-readiness-runtime.mjs",
  "src/scripts/validate-presence-report-customer-safe-render-runtime.mjs",
  "src/scripts/validate-presence-report-retrieval-workflow-contracts.mjs",
  "src/scripts/validate-operator-release-gate-contracts.mjs",
  "src/scripts/validate-operator-approval-flow-runtime.mjs",
  "src/scripts/validate-category-proof-standard-contracts.mjs",
  "src/scripts/validate-presence-report-route-map.mjs",
  "src/scripts/validate-presence-report-object-index.mjs",
  "src/scripts/validate-presence-report-package-source.mjs",
  "src/scripts/validate-presence-report-generation-adapter.mjs",
  "src/scripts/validate-live-scan-presence-report-mapping.mjs",
  "src/scripts/validate-sandwork-presence-report-fixture.mjs",
  "src/scripts/validate-repair-queue-priority.mjs",
  "src/scripts/validate-presence-report-release-gate.mjs",
  "src/scripts/validate-presence-report-launch-readiness.mjs",
  "src/scripts/validate-dashboard-presence-command-snapshot.mjs",
  "src/scripts/validate-protected-free-scan-presence-result.mjs",
  "src/scripts/validate-public-sitemap-surface.mjs",
  "src/scripts/validate-presence-report-merge-readiness.mjs",
];

const missing = validators.filter((validatorPath) => !existsSync(join(root, validatorPath)));
if (missing.length) {
  console.error("Presence Report system validation is missing validator files:");
  for (const validatorPath of missing) console.error(`- ${validatorPath}`);
  process.exit(1);
}

for (const validatorPath of validators) {
  console.log(`\n[presence-report-system] ${validatorPath}`);
  const result = spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) {
    console.error(`[presence-report-system] failed to start ${validatorPath}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`[presence-report-system] ${validatorPath} exited with status ${result.status ?? "unknown"}`);
    process.exit(result.status ?? 1);
  }
}

console.log("Presence Report system validation passed with protected report routing, package-source, evidence record contracts, evidence readiness runtime, customer-safe render runtime, retrieval workflow contracts, operator release gates, operator approval flow runtime, category proof standards, and merge-readiness coverage.");
