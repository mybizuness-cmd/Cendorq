import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const packagePath = "package.json";
const lockfilePath = "pnpm-lock.yaml";
const chainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const docsPath = "docs/dependency-lockfile-integrity.md";

checkExists(packagePath);
checkExists(lockfilePath);
checkExists(chainIntegrityPath);
checkExists(docsPath);

if (!failures.length) {
  const pkg = JSON.parse(read(packagePath));
  const lockfile = read(lockfilePath);
  const chainIntegrity = read(chainIntegrityPath);
  const docs = read(docsPath);

  checkValue(pkg.packageManager, "pnpm@9.15.9", "packageManager");
  checkValue(pkg.engines?.node, ">=24.0.0", "engines.node");
  checkValue(pkg.scripts?.["validate:routes"], "node ./src/scripts/validate-routes-chain.mjs", "scripts.validate:routes");

  checkValue(pkg.dependencies?.next, "^16.2.4", "dependencies.next");
  checkValue(pkg.dependencies?.react, "^19.0.0", "dependencies.react");
  checkValue(pkg.dependencies?.["react-dom"], "^19.0.0", "dependencies.react-dom");
  checkValue(pkg.devDependencies?.["@typescript-eslint/parser"], "^8.59.0", "devDependencies.@typescript-eslint/parser");
  checkValue(pkg.devDependencies?.typescript, "^6.0.3", "devDependencies.typescript");
  checkValue(pkg.devDependencies?.eslint, "^10.2.1", "devDependencies.eslint");

  requireText(lockfilePath, lockfile, [
    "lockfileVersion: '9.0'",
    "specifier: ^8.59.0",
    "version: 8.59.1",
    "specifier: ^16.2.4",
    "version: 16.2.4",
    "specifier: ^19.0.0",
    "version: 19.2.5",
    "specifier: ^6.0.3",
    "version: 6.0.3",
    "specifier: ^10.2.1",
    "version: 10.2.1",
  ]);

  requireText(chainIntegrityPath, chainIntegrity, [
    "src/scripts/validate-dependency-lockfile-integrity.mjs",
    "package.json",
    "pnpm-lock.yaml",
  ]);

  requireText(docsPath, docs, [
    "# Dependency Lockfile Integrity",
    "package.json",
    "pnpm-lock.yaml",
    "pnpm@9.15.9",
    ">=24.0.0",
    "validate:routes",
    "Next resolved version: `16.2.4`",
    "React resolved version: `19.2.5`",
    "TypeScript resolved version: `6.0.3`",
    "ESLint resolved version: `10.2.1`",
    "TypeScript ESLint parser resolved version: `8.59.1`",
    "Do not let dependency PRs merge with unreviewed package and lockfile drift.",
  ]);
}

if (failures.length) {
  console.error("Dependency lockfile integrity validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dependency lockfile integrity validation passed.");

function checkValue(actual, expected, label) {
  if (actual !== expected) failures.push(`${packagePath} expected ${label} to be ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}`);
}

function requireText(path, text, phrases) {
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function checkExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required file: ${path}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
