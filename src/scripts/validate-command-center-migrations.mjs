import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const migrationDir = join(root, "db", "migrations");
const failures = [];

const requiredMigrations = [
  "0001_command_center_foundation.sql",
  "0002_command_center_delivery_automation.sql",
  "0003_command_center_signal_intelligence.sql",
  "0004_command_center_data_governance.sql",
  "0005_command_center_access_control.sql",
];

if (!existsSync(migrationDir)) {
  failures.push("Missing migration directory: db/migrations");
} else {
  const migrations = readdirSync(migrationDir)
    .filter((name) => name.endsWith(".sql"))
    .sort();

  for (const required of requiredMigrations) {
    if (!migrations.includes(required)) failures.push(`Missing required Command Center migration: ${required}`);
  }

  const seenNumbers = new Set();
  migrations.forEach((name, index) => {
    const match = /^(\d{4})_[a-z0-9_]+\.sql$/.exec(name);
    if (!match) failures.push(`Migration file must use ordered snake_case format: ${name}`);
    if (!match) return;

    const number = Number(match[1]);
    const expectedNumber = index + 1;
    if (seenNumbers.has(number)) failures.push(`Duplicate migration number: ${match[1]}`);
    seenNumbers.add(number);
    if (number !== expectedNumber) failures.push(`Migration ordering gap: expected ${String(expectedNumber).padStart(4, "0")} but found ${match[1]} in ${name}`);
  });

  for (const name of migrations) validateMigration(name, readFileSync(join(migrationDir, name), "utf8"));
}

if (failures.length) {
  console.error("Command Center migration safety validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center migration safety validation passed. Migrations are ordered, named consistently, additive by default, private-source-of-truth aligned, and protected from casual destructive operations while allowing controlled idempotent constraint replacement.");

function validateMigration(name, sql) {
  if (!sql.includes("create table if not exists")) failures.push(`${name} must define additive tables with create table if not exists.`);
  if (!sql.includes("created_at timestamptz not null default now()")) failures.push(`${name} must preserve created_at timestamps for operational traceability.`);
  if (!sql.includes("updated_at") && !name.includes("signal_intelligence")) failures.push(`${name} should include updated_at tracking where mutable records exist.`);

  const normalized = sql.toLowerCase();
  const destructivePatterns = [
    /\bdrop\s+table\b/,
    /\bdrop\s+column\b/,
    /\btruncate\s+table\b/,
    /\bdelete\s+from\b/,
  ];
  for (const pattern of destructivePatterns) {
    if (pattern.test(normalized)) failures.push(`${name} contains a destructive SQL operation that needs a separate reviewed rollback plan.`);
  }

  const alterDropMatches = normalized.match(/\balter\s+table\s+[^;]+\s+drop\s+(?!constraint\s+if\s+exists)[^;]+/g) || [];
  for (const match of alterDropMatches) {
    failures.push(`${name} contains a destructive alter operation that needs a separate reviewed rollback plan: ${match}`);
  }

  const forbiddenPublicPatterns = [
    "next_public",
    "public report index",
    "public intelligence index",
    "public evidence index",
    "public backup export",
  ];
  for (const phrase of forbiddenPublicPatterns) {
    if (normalized.includes(phrase)) failures.push(`${name} contains forbidden public/private boundary phrase: ${phrase}`);
  }

  const requiredPrivacyAnchors = ["private", "created_at"];
  for (const phrase of requiredPrivacyAnchors) {
    if (!normalized.includes(phrase)) failures.push(`${name} should include private operating context: ${phrase}`);
  }
}
