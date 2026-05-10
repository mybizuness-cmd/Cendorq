import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const standardPath = "docs/build-gate-hardening-standard.md";
const workflowPath = ".github/workflows/build-gates.yml";
const codeqlWorkflowPath = ".github/workflows/codeql.yml";
const packagePath = "package.json";
const docsIndexPath = "docs/command-center-docs-index.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const integrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const validatorPath = "src/scripts/validate-build-gate-hardening-standard.mjs";

expect(standardPath, [
  "# Build Gate Hardening Standard",
  "internal release discipline for preventing avoidable issues",
  "detecting regressions early",
  "blocking unsafe changes",
  "preserving rollback paths",
  "No production-impacting change should ship only because the code compiles.",
  "maximum practical prevention, detection, rollback, and recovery",
  "The build system must not claim that nothing can ever break.",
]);

expect(standardPath, [
  "## Required gates",
  "dependency install using the locked package manager",
  "route-chain validation",
  "typecheck",
  "lint",
  "production build",
  "security/static analysis workflow where available",
  "production smoke checks when a real target is configured",
  "release-captain review before merge or deployment",
]);

expect(standardPath, [
  "## Build workflow requirements",
  "run on pull requests to `main`",
  "run on pushes to `main`",
  "allow manual dispatch",
  "use minimal repository permissions",
  "install with `pnpm` through Corepack",
  "run `pnpm install --frozen-lockfile`",
  "run `pnpm validate:routes`",
  "run `pnpm typecheck`",
  "run `pnpm lint`",
  "run `pnpm build`",
  "avoid `continue-on-error: true`",
  "avoid broad write permissions",
  "avoid printing secrets or environment values",
  "avoid deploying automatically from the validation workflow",
]);

expect(standardPath, [
  "## Build-gate philosophy",
  "broken routes",
  "stale public copy",
  "unsafe claims",
  "private data exposure drift",
  "broken report/billing/support/document access rules",
  "missing dashboard message mirrors",
  "email-only or PDF-only access drift",
  "unsafe legal or security language",
  "dependency and workflow posture drift",
  "TypeScript regressions",
  "lint regressions",
  "production build failures",
  "command-center validation drift",
  "acquisition-to-retention lifecycle drift",
]);

expect(standardPath, [
  "## Rollback and recovery posture",
  "a clear branch and commit trail",
  "validation output",
  "review context",
  "rollback awareness",
  "smoke-test target separation",
  "ability to pause risky document/report/billing/support delivery if needed",
]);

expect(standardPath, [
  "## Security posture in build",
  "minimal workflow permissions",
  "no secret printing",
  "no production mutation in validation workflow",
  "no broad write tokens",
  "no automatic deployment from validation checks",
  "dependency updates remain reviewable",
  "failed checks are release blockers unless explicitly reviewed and documented",
]);

expect(standardPath, [
  "## Public discovery vs private data in build",
  "public pages, sitemap, metadata, robots, share images, and `llms.txt` can support discovery",
  "private dashboards, reports, billing, support, admin, command-center, customer documents, and customer-specific files must not become public discovery surfaces",
  "robots.txt is not a privacy control",
  "noindex/no-store and authenticated access must protect private surfaces where applicable",
]);

expect(workflowPath, [
  "name: Build Gates",
  "pull_request:",
  "push:",
  "workflow_dispatch:",
  "permissions:",
  "contents: read",
  "concurrency:",
  "cancel-in-progress: true",
  "actions/checkout@v6",
  "actions/setup-node@v5",
  "node-version: \"24\"",
  "cache: pnpm",
  "corepack enable",
  "pnpm install --frozen-lockfile",
  "pnpm validate:routes",
  "pnpm typecheck",
  "pnpm lint",
  "pnpm build",
]);

expect(codeqlWorkflowPath, [
  "name: CodeQL",
  "permissions:",
  "contents: read",
  "security-events: write",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
]);

expect(packagePath, [
  "\"packageManager\": \"pnpm@9.15.9\"",
  "\"node\": \">=24.0.0\"",
  "\"validate:routes\": \"node ./src/scripts/validate-routes-chain.mjs\"",
  "\"typecheck\": \"tsc --noEmit\"",
  "\"lint\": \"eslint .\"",
  "\"build\": \"next build\"",
]);

expect(docsIndexPath, [
  "docs/build-gate-hardening-standard.md",
  validatorPath,
]);

expect(routesChainPath, [validatorPath]);
expect(integrityPath, [validatorPath, "build gate hardening"]);

forbidden(workflowPath, [
  "continue-on-error: true",
  "contents: write",
  "actions: write",
  "pull-requests: write",
  "id-token: write",
  "secrets.",
  "npm install",
  "pnpm install --no-frozen-lockfile",
  "vercel deploy",
  "deploy",
]);

forbidden(standardPath, [
  "nothing can ever break is guaranteed",
  "build gates guarantee no issues",
  "validation may be disabled to ship faster",
  "continue-on-error is allowed",
  "production mutation in validation workflow is allowed",
  "secrets may be printed",
]);

if (failures.length) {
  console.error("Build gate hardening standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Build gate hardening standard validation passed with locked install, validate:routes, typecheck, lint, production build, CodeQL adjacency, minimal workflow permissions, no deploy mutation, rollback posture, and safe public/private discovery boundaries.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
