import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/seamless-responsive-sync-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "SEAMLESS_RESPONSIVE_SYNC_CONTRACT",
  "seamless-responsive-sync-v1",
  "fast, coherent, synchronized, responsive, and protected",
  "public pages",
  "customer dashboard",
  "APIs",
  "notifications",
  "support lifecycle",
  "operator command surfaces",
  "Every surface must feel instant, connected, and dependable.",
  "free-scan-room",
  "plans-path",
  "signup-and-verification",
  "customer-dashboard",
  "notification-center",
  "support-status",
  "operator-command-center",
  "every route needs a clear next step and safe fallback",
  "every protected customer surface needs loading, empty, success, and recoverable error states",
  "Free Scan completion must connect to dashboard next action",
  "support request submission must connect to support status and notifications",
  "billing and plan state must connect to dashboard, report entitlements, and plan comparison",
  "critical public and dashboard pages must avoid unnecessary client-only rendering",
  "client components must be small, purposeful, and isolated",
  "protected API responses should use no-store",
  "customer-owned state must not be shown as current unless sourced from protected APIs or explicit safe projections",
  "operator surfaces must show which section, gate, role, and projection is active",
  "read-only review must remain visually and functionally separate from guarded mutation",
  "every sync or responsiveness layer requires validation before merge",
  "SEAMLESS_RESPONSIVE_SYNC_HARD_LOCKS",
  "SEAMLESS_RESPONSIVE_SYNC_BLOCKED_PATTERNS",
  "no disconnected customer journey",
  "no stale protected customer state presented as live truth",
  "no unbounded customer or operator lists",
  "no new page without mobile-responsive hierarchy and accessible focus states",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "disconnected customer journey allowed",
  "stale state allowed",
  "unbounded lists allowed",
  "skip loading states allowed",
  "skip error states allowed",
  "browser secrets allowed",
  "bypass ownership check allowed",
  "disable validation for speed",
]);

if (failures.length) {
  console.error("Seamless responsive sync validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Seamless responsive sync validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
