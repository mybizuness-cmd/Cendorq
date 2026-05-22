import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/business-truth-profile-contract.ts";
const failures = [];

if (!existsSync(join(root, contractPath))) failures.push(`Missing ${contractPath}`);

if (!failures.length) {
  const text = readFileSync(join(root, contractPath), "utf8");
  for (const phrase of [
    "BusinessTruthProfilePublicShape",
    "SAMPLE_BUSINESS_TRUTH_PROFILE",
    "approvedClaims",
    "restrictedClaims",
    "knownCompetitors",
    "complianceNotes",
    "Cendorq must not promise rankings, leads, revenue, or AI placement.",
    "Do not invent credentials, reviews, guarantees, locations, or service claims.",
  ]) {
    if (!text.includes(phrase)) failures.push(`${contractPath} missing required phrase: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Business Truth Profile contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Business Truth Profile contract validation passed.");
