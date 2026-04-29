import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const dependabotPath = ".github/dependabot.yml";
const codeqlPath = ".github/workflows/codeql.yml";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(dependabotPath, [
  "version: 2",
  "package-ecosystem: npm",
  "package-ecosystem: github-actions",
  "interval: weekly",
  "timezone: America/Los_Angeles",
  "open-pull-requests-limit: 5",
  "open-pull-requests-limit: 3",
  "controlled-update",
  "next-react-platform",
  "typescript-tooling",
  "styling-tooling",
  "lint-tooling",
  "github-actions",
]);

expect(codeqlPath, [
  "name: CodeQL",
  "pull_request:",
  "branches:",
  "schedule:",
  "security-events: write",
  "github/codeql-action/init@v3",
  "security-extended,security-and-quality",
  "github/codeql-action/analyze@v3",
  "javascript-typescript",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(dependabotPath, [
  "automerge: true",
  "auto-merge: true",
  "ignore:",
  "allow-all",
  "skip-validation",
]);

forbidden(codeqlPath, [
  "security-events: none",
  "pull_request: []",
  "push: []",
  "continue-on-error: true",
  "allow-failure",
]);

if (failures.length) {
  console.error("Repo update scanning automation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Repo update scanning automation validation passed.");

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
