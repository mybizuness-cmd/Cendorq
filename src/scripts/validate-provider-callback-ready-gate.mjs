import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/customer-auth-provider-config.ts", ["CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY: boolean = false", "isCustomerAuthProviderCallbackSessionRuntimeReady", "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY === true", "Provider buttons stay hidden until", "existing customer lookup", "Cendorq session creation", "SAFE_DASHBOARD_RETURN_PATHS", "safeDashboardReturnPath", "Provider return paths must stay inside approved dashboard routes."]],
  ["src/lib/customer-auth-provider-runtime-boundary.ts", ["projectCustomerAuthProviderRuntimeReadiness", "canShowCustomerButton: false", "canIssueCendorqSession: false", "safeFallback: \"secure-email-access\""]],
  ["src/lib/customer-provider-callback-access-gate.ts", ["CUSTOMER_PROVIDER_CALLBACK_ACCESS_GATE_STANDARD", "evaluateProviderCallbackCustomerAccess", "resolveCustomerAccessEligibility", "buildFreeScanRequiredUrl", "Provider identity must include a verified email before Cendorq can consider dashboard access.", "Unknown provider emails must route to Free Scan with same-email recovery copy instead of a blank dashboard.", "allow-dashboard-session", "route-free-scan"]],
  ["src/app/api/auth/callback/[provider]/route.ts", ["projectCustomerAuthProviderRuntimeReadiness", "readiness.canIssueCendorqSession", "provider-callback-pending", "redirectNoStore", "NO_STORE_HEADERS", "X-Robots-Tag", "readPostedCallbackPayload", "request.formData()"]],
  ["src/app/signup/page.tsx", ["Start with the Free Scan.", "Start Free Scan", "Use customer access", "Already have an account?", "same email", "Free Scan captures the first AI Visibility signal"]],
  ["src/app/login/page.tsx", ["Send secure access link", "provider-callback-pending"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-provider-callback-ready-gate.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Provider callback ready gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Provider callback ready gate validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
