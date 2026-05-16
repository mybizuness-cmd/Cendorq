import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const providerConfigPath = "src/lib/customer-auth-provider-config.ts";
const providerCallbackPath = "src/app/api/auth/callback/[provider]/route.ts";
const signupPath = "src/app/signup/page.tsx";
const loginPath = "src/app/login/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-provider-callback-ready-gate.mjs";

expect(providerConfigPath, [
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY = false",
  "isCustomerAuthProviderCallbackSessionRuntimeReady",
  "CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY === true",
  "isCustomerAuthProviderCallbackSessionRuntimeReady() && readEnabledFlag(process.env[provider.readyEnvKey])",
  "Provider buttons stay hidden until",
  "provider callback session runtime",
  "token exchange",
  "profile fetch",
  "workspace creation or restoration",
  "Cendorq session creation",
]);

expect(providerCallbackPath, [
  "provider-callback-pending",
  "Token exchange, profile fetch",
  "account creation/restoration",
  "durable Cendorq session creation",
  "implemented before the customer can honestly be marked signed in",
]);

expect(signupPath, [
  "CUSTOMER_AUTH_PROVIDERS.filter((provider) => isCustomerAuthProviderConfigured(provider))",
  "configuredProviders.length > 0",
  "Send secure access link",
]);

expect(loginPath, [
  "CUSTOMER_AUTH_PROVIDERS.filter((provider) => isCustomerAuthProviderConfigured(provider))",
  "configuredProviders.length > 0",
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

if (failures.length) {
  console.error("Provider callback ready gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Provider callback ready gate validation passed with provider buttons hidden until callback/session runtime is genuinely implemented.");

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
