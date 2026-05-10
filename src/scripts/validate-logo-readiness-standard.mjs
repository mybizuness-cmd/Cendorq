import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/brand-trademark-operating-standard.md", [
    "Logo ownership and proprietary readiness",
    "confirm who created the logo",
    "source files, exported SVG/PNG versions, dates, and design notes",
    "written ownership, assignment, or license rights",
    "run visual clearance",
    "Signal mark design direction",
    "simple enough to recognize at small size",
    "strong silhouette before color",
    "works on light, dark, PDF, email, dashboard, and favicon contexts",
    "Cendorq signal mark",
    "Cendorq combined wordmark-plus-signal lockup",
  ]],
  ["src/layout/site-header-conversion.tsx", [
    "function BrandMark()",
    "bg-cyan-500",
    "bg-slate-950",
    "bg-indigo-400",
  ]],
  ["src/scripts/validate-routes-chain.mjs", [
    "src/scripts/validate-logo-readiness-standard.mjs",
  ]],
  ["src/scripts/validate-routes-chain-integrity.mjs", [
    "src/scripts/validate-logo-readiness-standard.mjs",
  ]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Logo readiness standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Logo readiness standard validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
