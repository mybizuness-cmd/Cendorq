import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const providerConfigPath = "src/lib/customer-auth-provider-config.ts";
const providerCallbackPath = "src/app/api/auth/callback/[provider]/route.ts";
const providerEligibilityGatePath = "src/lib/customer-provider-callback-access-gate.ts";
const signupPath = "src/app/signup/page.tsx";
const loginPath = "src/app/login/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-provider-callback-ready-gate.mjs";

expect(providerConfigPath, [
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY: boolean = false",
  "isCustomerAuthProviderCallbackSessionRuntimeReady",
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY === true",
  "isCustomerAuthProviderCallbackSessionRuntimeReady() && readEnabledFlag(process.env[provider.readyEnvKey])",
  "Provider buttons stay hidden until",
  "provider callback session runtime",
  "token exchange",
  "profile fetch",
  "existing customer lookup",
  "Cendorq session creation",
]);

expect(providerEligibilityGatePath, [
  "CUSTOMER_PROVIDER_CALLBACK_ACCESS_GATE_STANDARD",
  "evaluateProviderCallbackCustomerAccess",
  "resolveCustomerAccessEligibility",
  "buildFreeScanRequiredUrl",
  "Provider identity must include a verified email before Cendorq can consider dashboard access.",
  "resolveCustomerAccessEligibility must run on the verified provider email before any Cendorq session is issued.",
  "Unknown provider emails must route to Free Scan with same-email recovery copy instead of a blank dashboard.",
  "We couldn’t find a Cendorq account for that email. Start the Free Scan first.",
  "Already have an account? Use the same email you used when you submitted your Free Scan or bought a plan.",
  "allow-dashboard-session",
  "route-free-scan",
]);

expect(providerCallbackPath, [
  "provider-callback-pending",
  "server-side token exchange",
  "profile fetch",
  "verified email confirmation",
  "evaluateProviderCallbackCustomerAccess before any durable Cendorq session",
  "Unknown provider emails must route to Free Scan instead of opening",
  "back to secure email access",
]);

expect(signupPath, [
  "Send secure access link",
]);

expect(loginPath, [
  "Send secure access link",
  "provider-callback-pending",
]);

expect(routesChainPath, [validatorPath]);

forbidden(providerConfigPath, [
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY = true",
  "provider callback session runtime ready by default",
  "skip token exchange",
  "skip profile fetch",
  "skip session creation",
]);

forbidden(providerCallbackPath, [
  "setCustomerRememberedSessionCookie(response",
  "return NextResponse.redirect(new URL(returnTo",
  "auth=provider-success",
  "provider-success",
  "raw provider token",
  "localStorage",
  "sessionStorage",
]);

forbidden(providerEligibilityGatePath, [
  "localStorage",
  "sessionStorage",
  "raw provider token",
  "rawProviderPayload",
  "create blank dashboard",
]);

if (failures.length) {
  console.error("Provider callback ready gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Provider callback ready gate validation passed with provider buttons hidden until callback/session runtime and existing-customer eligibility are genuinely implemented.");

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
