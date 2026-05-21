import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const filePath = "src/lib/repair-queue-priority.ts";
const failures = [];

expect(filePath, [
  "RepairQueuePriority",
  "RepairQueuePriorityInput",
  "RepairQueuePriorityResult",
  "prioritizeRepairQueue",
  "trustWeakness",
  "choiceWeakness",
  "actionWeakness",
  "proofRisk",
]);

if (failures.length) {
  console.error("Repair Queue priority validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Repair Queue priority validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
