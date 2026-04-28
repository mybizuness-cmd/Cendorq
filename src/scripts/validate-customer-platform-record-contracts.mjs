import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractsPath = "src/lib/customer-platform-record-contracts.ts";
const shieldPath = "src/lib/cendorq-shield-standard.ts";
const packagePath = "package.json";

validateTextFile(contractsPath, [
  "CUSTOMER_PLATFORM_RECORD_CONTRACTS",
  "CUSTOMER_PLATFORM_RECORD_GUARDS",
  "getCustomerPlatformRecordContracts",
  "CustomerAccountRecordContract",
  "CustomerEmailConfirmationRecordContract",
  "CustomerTrustedDeviceRecordContract",
  "CustomerSessionRecordContract",
  "CustomerDashboardAccessRecordContract",
  "CustomerBillingEntitlementRecordContract",
  "CustomerSecurityEventRecordContract",
  "HostileInputRecordContract",
  "CustomerLockoutRecoveryRecordContract",
  "customer-account",
  "customer-email-confirmation",
  "customer-trusted-device",
  "customer-session",
  "customer-dashboard-access",
  "customer-billing-entitlement",
  "customer-security-event",
  "hostile-input",
  "customer-lockout-recovery",
  "primaryEmailHash",
  "emailVerified",
  "tokenHash",
  "resendCount",
  "deviceFingerprintHash",
  "risk-based",
  "emailVerifiedRequired: true",
  "objectOwnershipRequired: true",
  "propertyAllowlistRequired: true",
  "invoiceAccessEnabled",
  "safeMetadataOnly: true",
  "rawPayloadStored: false",
  "downstreamProcessingAllowed: false",
  "reauthRequired: true",
  "tokenRevocationRequired: true",
  "supportPathRequired: true",
  "no dashboard access without verified email",
  "no customer object access without object ownership",
  "no billing access without entitlement",
  "no raw hostile input payload storage",
  "no raw security event payload storage",
  "no unsafe redirect after email confirmation",
  "no welcome email duplication",
  "no trusted device without challenge path",
  "no risky session without reauthentication, rotation, revocation, or lockout path",
]);

validateTextFile(shieldPath, [
  "CENDORQ_SHIELD_RULES",
  "Device and session fortress",
  "Authorization ownership core",
  "Hostile input rejection",
  "compromised-device-or-risky-session",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-customer-platform-record-contracts.mjs",
]);

validateForbidden(contractsPath, [
  "rawPayloadStored: true",
  "downstreamProcessingAllowed: true",
  "emailVerifiedRequired: false",
  "objectOwnershipRequired: false",
  "propertyAllowlistRequired: false",
  "tokenRevocationRequired: false",
  "supportPathRequired: false",
  "storeRawPassword",
  "plainToken",
  "sessionIdInUrl",
]);

if (failures.length) {
  console.error("Customer platform record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform record contracts validation passed. Account, email confirmation, trusted device, session, dashboard access, billing entitlement, security event, hostile input, and lockout/recovery records preserve verified identity, object ownership, entitlement, privacy, and Shield controls.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required customer platform record dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required customer platform record phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden customer platform record phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
