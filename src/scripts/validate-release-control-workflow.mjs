import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const workflowPath = ".github/workflows/release-control.yml";
const chainPath = "src/scripts/validate-routes-chain.mjs";
const packagePath = "package.json";

for (const path of [workflowPath, chainPath, packagePath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing release-control dependency: ${path}`);
}

if (!failures.length) {
  const workflowText = read(workflowPath);
  const chainText = read(chainPath);
  const packageText = read(packagePath);

  requireAll(workflowPath, workflowText, [
    "name: Release Control",
    "pull_request:",
    "branches:",
    "- main",
    "push:",
    "permissions:",
    "contents: read",
    "concurrency:",
    "cancel-in-progress: true",
    "runs-on: ubuntu-latest",
    "timeout-minutes: 20",
    "actions/checkout@v6",
    "actions/setup-node@v6",
    "node-version: 24",
    "cache: pnpm",
    "corepack enable",
    "pnpm install --frozen-lockfile",
    "node ./src/scripts/validate-release-control-workflow.mjs",
    "pnpm validate:routes",
    "pnpm lint",
    "pnpm typecheck",
    "pnpm build",
  ]);

  forbidAny(workflowPath, workflowText, [
    "contents: write",
    "pull-requests: write",
    "issues: write",
    "actions: write",
    "security-events: write",
    "continue-on-error: true",
    "npm install",
    "pnpm install --no-frozen-lockfile",
    "--force",
    "NEXT_PUBLIC_",
    "CENDORQ_CUSTOMER_SESSION_SECRET",
    "STRIPE_SECRET_KEY",
    "OPENAI_API_KEY",
    "DATABASE_URL",
  ]);

  if (!chainText.includes("src/scripts/validate-release-control-workflow.mjs")) failures.push(`${chainPath} must include validate-release-control-workflow.mjs in validate:routes coverage.`);
  if (!packageText.includes('"validate:routes": "node ./src/scripts/validate-routes-chain.mjs"')) failures.push(`${packagePath} must keep validate:routes delegated to validate-routes-chain.mjs.`);
}

if (failures.length) {
  console.error("Release-control workflow validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Release-control workflow validation passed with PR/main coverage, read-only permissions, Node 24, frozen pnpm install, validate:routes, lint, typecheck, build, and no broad write permissions or secret exposure.");

function requireAll(path, text, phrases) {
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing required release-control phrase: ${phrase}`);
}

function forbidAny(path, text, phrases) {
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden release-control phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
