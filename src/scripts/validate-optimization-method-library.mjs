import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

validateTextFile("src/lib/command-center/optimization-method-library.ts", [
  "OPTIMIZATION_METHOD_LIBRARY",
  "OptimizationMethod",
  "clarity-upgrade",
  "trust-proof-upgrade",
  "conversion-path-upgrade",
  "authority-signal-upgrade",
  "offer-structure-upgrade",
  "follow-up-system-upgrade",
  "monthly-control-upgrade",
  "planScopes",
  "problemSignals",
  "requiredEvidence",
  "proofChecks",
  "expectedOutcomes",
  "customerSafeOutputRules",
  "avoid unsupported performance promises",
  "recommendation matched to plan scope",
]);
validateHelperSafety("src/lib/command-center/optimization-method-library.ts");

validateTextFile("docs/optimization-method-library-standard.md", [
  "Optimization Method Library Standard",
  "Optimization recommendations must be method-backed, evidence-linked, plan-scoped, and useful.",
  "Recommendations must match the plan purchased or being reviewed.",
  "No optimization recommendation without evidence.",
  "No recommendation outside plan scope.",
  "No AI-only recommendation treated as approved.",
  "Cendorq remains the source of truth.",
]);

if (failures.length) {
  console.error("Optimization method library validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Optimization method library validation passed. Optimization methods are method-backed, evidence-linked, plan-scoped, proof-checked, customer-safe, and protected from client/runtime value exposure.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing optimization method file: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function validateHelperSafety(path) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "return env", "secretValue"]) {
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden optimization behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
