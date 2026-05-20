import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/control-snapshot-contract.ts";
const failures = [];

if (!existsSync(join(root, contractPath))) failures.push(`Missing ${contractPath}`);

if (!failures.length) {
  const text = readFileSync(join(root, contractPath), "utf8");
  for (const phrase of [
    "ControlSnapshotPublicShape",
    "SAMPLE_CONTROL_SNAPSHOT",
    "Proof freshness",
    "Competitor clarity",
    "Public fact consistency",
    "Choice Gap",
    "presenceScore",
    "nextAction",
  ]) {
    if (!text.includes(phrase)) failures.push(`${contractPath} missing required phrase: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Control Snapshot contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Control Snapshot contract validation passed.");
