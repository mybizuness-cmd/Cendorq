import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/choice-gap-contract.ts";
const failures = [];

if (!existsSync(join(root, contractPath))) failures.push(`Missing ${contractPath}`);

if (!failures.length) {
  const text = readFileSync(join(root, contractPath), "utf8");
  for (const phrase of [
    "ChoiceGapPublicShape",
    "SAMPLE_CHOICE_GAP",
    "customerEffect",
    "aiEffect",
    "repairDirection",
    "Competitor explains the service faster.",
    "Competitor shows proof closer to action.",
    "Competitor answers buyer questions better.",
  ]) {
    if (!text.includes(phrase)) failures.push(`${contractPath} missing required phrase: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Choice Gap contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Choice Gap contract validation passed.");
