import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/device-experience-performance-standard.md", [
    "Device Experience and Performance Standard",
    "Mobile is the main entrance. Desktop is the command room.",
    "public pages must lead with the strongest action on mobile",
    "plan comparison must remain readable on mobile",
    "dashboard surfaces must keep state and next action visible",
    "billing, report vault, support, and notifications must remain recoverable on small screens",
    "performance review should track LCP, INP, and CLS",
    "compressed desktop layout on mobile",
    "buried primary action",
    "tiny tap targets",
    "pricing comparison that only works on desktop",
  ]],
  ["src/lib/unified-experience-alignment.ts", [
    "Mobile is the main entrance; desktop is the command room",
  ]],
  ["docs/owner-operating-manual.md", [
    "mobile is the main entrance and desktop is the command room",
    "Mobile-first and desktop-command-room audit after every major surface change",
  ]],
  ["src/scripts/validate-routes-chain.mjs", [
    "src/scripts/validate-device-experience-performance-standard.mjs",
  ]],
  ["src/scripts/validate-routes-chain-integrity.mjs", [
    "src/scripts/validate-device-experience-performance-standard.mjs",
    "docs/device-experience-performance-standard.md",
  ]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Device experience and performance standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Device experience and performance standard validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
