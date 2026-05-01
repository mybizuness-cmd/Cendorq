import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-business-command-center.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(componentPath, [
  "DashboardBusinessCommandCenter",
  "Business command center",
  "This is where the customer controls the business journey",
  "Cendorq guiding the smartest next move",
  "premium control room for the customer",
  "Customer feeling to create",
  "I know where my business stands, what Cendorq sees, and what I should do next.",
  "clarity keeps them inside the dashboard",
  "trust makes them listen",
  "control makes them comfortable buying",
  "proof makes the next plan feel logical",
]);

expect(componentPath, [
  "Know what matters now",
  "Stay in control of scope",
  "Move with proof",
  "Keep momentum without pressure",
  "Current priority",
  "Scope control",
  "Proof-led decisions",
  "Calm momentum",
]);

expect(componentPath, [
  "Diagnose",
  "Decide",
  "Act",
  "Protect",
  "Customer controls",
  "Cendorq guides",
  "what they control",
  "how Cendorq helps",
  "conversion path",
  "safe, evidence-backed, and connected",
]);

expect(componentPath, [
  "The customer should feel this is the control center for business progress, not a static account page.",
  "The customer owns the decisions; Cendorq guides the strategy, sequencing, and safeguards.",
  "Every module should answer: what is happening, why it matters, what is safe to do next, and what improves if they continue.",
  "Conversion should come from confidence, education, proof, and visible momentum—not pressure or confusion.",
]);

expect(dashboardPath, [
  "DashboardBusinessCommandCenter",
  "./dashboard-business-command-center",
  "<DashboardBusinessCommandCenter />",
  "Customer business command center",
  "Control the next move. Cendorq guides the smartest path.",
  "private command center for your business progress",
  "You stay in control. Cendorq keeps the next action clear.",
]);

expect(routesChainPath, [
  "src/scripts/validate-dashboard-business-command-center.mjs",
]);

forbidden(componentPath, [
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed inbox",
  "guaranteed primary inbox",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "urgent upgrade required",
  "password=",
  "token=",
  "privateKey=",
  "cardNumber=",
  "bankDetail=",
  "rawPayload=",
  "rawEvidence=",
  "operatorIdentity=",
  "internalNote=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Dashboard business command center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard business command center validation passed.");

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
