import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runnerPath = "src/lib/customer-email-dispatch-runner-runtime.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const failures = [];

expect(runnerPath, [
  "runCustomerEmailDispatchCycle",
  "getCustomerEmailDispatchRunnerRules",
  "CustomerEmailDispatchRunnerInput",
  "CustomerEmailDispatchRunnerResult",
  "prepareCustomerEmailProviderDispatchAttempt",
  "updateCustomerEmailDispatchQueueState",
  "recordCustomerEmailDispatchTransition",
  "deriveRunnerNextState",
  "ready-for-provider",
  "dry-run-ready",
  "hold",
  "suppress",
]);

expect(runnerPath, [
  "dispatch runner must use provider dispatch adapter before queue mutation",
  "dispatch runner must record an audit transition for every queue mutation decision",
  "dispatch runner must never call an external provider directly",
  "dispatch runner must never read provider secrets directly",
  "dispatch runner must never return raw customer email, raw token, token hash, confirmation URL, provider payload, or provider response to browser-safe output",
  "dispatch runner must only mutate queue state through updateCustomerEmailDispatchQueueState",
  "dispatch runner must preserve Cendorq Support <support@cendorq.com> sender identity",
]);

expect(runnerPath, [
  "providerCallMade: false",
  "providerSecretRead: false",
  "browserVisible: false",
  "customerEmailReturned: false",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "confirmationUrlReturned: false",
  "providerPayloadReturned: false",
  "providerResponseReturned: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(queueValidatorPath, [
  "src/lib/customer-email-dispatch-runner-runtime.ts",
  "validate-customer-email-dispatch-runner-runtime.mjs",
  "runCustomerEmailDispatchCycle",
]);

forbidden(runnerPath, [
  "providerCallMade: true",
  "providerSecretRead: true",
  "browserVisible: true",
  "customerEmailReturned: true",
  "rawTokenReturned: true",
  "tokenHashReturned: true",
  "confirmationUrlReturned: true",
  "providerPayloadReturned: true",
  "providerResponseReturned: true",
  "localStorageAllowed: true",
  "sessionStorageAllowed: true",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "sendGrid",
  "resend.emails.send",
  "fetch(\"https://api",
  "process.env.RESEND_API_KEY",
  "process.env.SENDGRID_API_KEY",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer email dispatch runner runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email dispatch runner runtime validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
