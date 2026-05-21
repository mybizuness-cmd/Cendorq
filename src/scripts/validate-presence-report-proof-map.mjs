import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const proofMapPath = "src/lib/presence-report-proof-map.ts";
const failures = [];

expect(proofMapPath, [
  "PresenceReportProofMapSignal",
  "SAMPLE_PRESENCE_REPORT_PROOF_MAP",
  "Recent reviews",
  "Credentials and policies",
  "Photos and real-world proof",
  "repairDirection",
]);

if (failures.length) {
  console.error("Presence Report proof map validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report proof map validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
