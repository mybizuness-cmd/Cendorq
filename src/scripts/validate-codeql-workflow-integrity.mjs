import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const workflowPath = ".github/workflows/codeql.yml";
const chainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";

expect(workflowPath, [
  "name: CodeQL",
  "push:",
  "pull_request:",
  "- main",
  "schedule:",
  "cron: \"37 10 * * 1\"",
  "permissions:",
  "actions: read",
  "contents: read",
  "security-events: write",
  "runs-on: ubuntu-latest",
  "timeout-minutes: 20",
  "fail-fast: false",
  "javascript-typescript",
  "security-extended,security-and-quality",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
]);

expect(chainIntegrityPath, [
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
]);

forbidden(workflowPath, [
  "actions/checkout@v1",
  "actions/checkout@v2",
  "actions/checkout@v3",
  "actions/checkout@v4",
  "actions/checkout@v5",
  "github/codeql-action/init@v1",
  "github/codeql-action/init@v2",
  "github/codeql-action/init@v3",
  "github/codeql-action/autobuild@v1",
  "github/codeql-action/autobuild@v2",
  "github/codeql-action/autobuild@v3",
  "github/codeql-action/analyze@v1",
  "github/codeql-action/analyze@v2",
  "github/codeql-action/analyze@v3",
  "contents: write",
  "actions: write",
  "packages: write",
  "id-token: write",
  "continue-on-error: true",
]);

if (failures.length) {
  console.error("CodeQL workflow integrity validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("CodeQL workflow integrity validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required CodeQL workflow dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required CodeQL phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden CodeQL workflow phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
