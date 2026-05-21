import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const providerConfigPath = "src/lib/customer-auth-provider-config.ts";
const providerCallbackPath = "src/app/api/auth/callback/[provider]/route.ts";
const providerEligibilityGatePath = "src/lib/customer-provider-callback-access-gate.ts";
const providerRuntimeBoundaryPath = "src/lib/customer-auth-provider-runtime-boundary.ts";
const signupPath = "src/app/signup/page.tsx";
const loginPath = "src/app/login/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-provider-callback-ready-gate.mjs";

expect(providerConfigPath, [
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY: boolean = false",
  "isCustomerAuthProviderCallbackSessionRuntimeReady",
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY === true",
  "Provider buttons stay hidden until",
  "existing customer lookup",
  "Cendorq session creation",
  "SAFE_DASHBOARD_RETURN_PATHS",
  "safeDashboardReturnPath",
  "Provider return paths must stay inside approved dashboard routes.",
]);

expect(providerRuntimeBoundaryPath, [
  "projectCustomerAuthProviderRuntimeReadiness",
  "canShowCustomerButton: false",
  "canIssueCendorqSession: false",
  "safeFallback: \"secure-email-access\"",
]);

expect(providerEligibilityGatePath, [
  "CUSTOMER_PROVIDER_CALLBACK_ACCESS_GATE_STANDARD",
  "evaluateProviderCallbackCustomerAccess",
  "resolveCustomerAccessEligibility",
  "buildFreeScanRequiredUrl",
  "Provider identity must include a verified email before Cendorq can consider dashboard access.",
  "Unknown provider emails must route to Free Scan with same-email recovery copy instead of a blank dashboard.",
  "allow-dashboard-session",
  "route-free-scan",
]);

expect(providerCallbackPath, [
  "projectCustomerAuthProviderRuntimeReadiness",
  "readiness.canIssueCendorqSession",
  "provider-callback-pending",
  "redirectNoStore",
  "NO_STORE_HEADERS",
  "X-Robots-Tag",
  "readPostedCallbackPayload",
  "request.formData()",
]);

expect(signupPath, ["Send secure access link"]);
expect(loginPath, ["Send secure access link", "provider-callback-pending"]);
expect(routesChainPath, [validatorPath]);

if (failures.length) {
  console.error("Provider callback ready gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Provider callback ready gate validation passed with runtime fallback and no-store redirect safety.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
