import { buildFreeScanRequiredUrl, resolveCustomerAccessEligibility, type CustomerAccessEligibilityResult } from "@/lib/customer-access-eligibility";
import type { CustomerAuthProviderKey } from "@/lib/customer-auth-provider-config";

export type VerifiedProviderIdentityForAccess = {
  providerKey: CustomerAuthProviderKey;
  verifiedEmail: string;
  emailVerified: boolean;
  providerSubjectHash?: string;
};

export type ProviderCallbackAccessDecision =
  | {
      ok: true;
      decision: "allow-dashboard-session";
      providerKey: CustomerAuthProviderKey;
      customerIdHash: string;
      signupEmailHash: string;
      customerEmailHash: string;
      primaryDestination: string;
      matchedSources: CustomerAccessEligibilityResult["matchedSources"];
      safeCustomerMessage: string;
    }
  | {
      ok: false;
      decision: "route-free-scan" | "provider-email-not-verified" | "provider-email-missing";
      providerKey: CustomerAuthProviderKey;
      redirectUrl: URL;
      safeCustomerMessage: string;
      safeHelpText: string;
    };

export const CUSTOMER_PROVIDER_CALLBACK_ACCESS_GATE_STANDARD = [
  "Provider callback access starts after the provider confirms identity and profile email.",
  "Provider identity must include a verified email before Cendorq can consider dashboard access.",
  "resolveCustomerAccessEligibility must run on the verified provider email before any Cendorq session is issued.",
  "Known Free Scan or paid customers can continue to the protected dashboard destination.",
  "Unknown provider emails must route to Free Scan with same-email recovery copy instead of a blank dashboard.",
] as const;

export async function evaluateProviderCallbackCustomerAccess(input: {
  identity: VerifiedProviderIdentityForAccess;
  baseUrl: string;
  requestedDestination?: string | null;
}): Promise<ProviderCallbackAccessDecision> {
  const providerKey = input.identity.providerKey;
  const redirectUrl = buildFreeScanRequiredUrl(input.baseUrl, {
    method: "provider",
    provider: providerKey,
    returnTo: input.requestedDestination,
  });
  redirectUrl.searchParams.set("auth", "free-scan-required");

  if (!input.identity.verifiedEmail) {
    return {
      ok: false,
      decision: "provider-email-missing",
      providerKey,
      redirectUrl,
      safeCustomerMessage: "We could not confirm an email from that access option. Start the Free Scan first.",
      safeHelpText: "Already have an account? Use the same email you used when you submitted your Free Scan or bought a plan.",
    };
  }

  if (!input.identity.emailVerified) {
    return {
      ok: false,
      decision: "provider-email-not-verified",
      providerKey,
      redirectUrl,
      safeCustomerMessage: "That access option did not confirm your email. Start the Free Scan first or use secure email access.",
      safeHelpText: "Already have an account? Use the same email you used when you submitted your Free Scan or bought a plan.",
    };
  }

  const eligibility = await resolveCustomerAccessEligibility({
    email: input.identity.verifiedEmail,
    requestedDestination: input.requestedDestination,
  });

  if (!eligibility.eligible) {
    return {
      ok: false,
      decision: "route-free-scan",
      providerKey,
      redirectUrl,
      safeCustomerMessage: "We couldn’t find a Cendorq account for that email. Start the Free Scan first.",
      safeHelpText: "Already have an account? Use the same email you used when you submitted your Free Scan or bought a plan. If you used a different email then, try that one.",
    };
  }

  return {
    ok: true,
    decision: "allow-dashboard-session",
    providerKey,
    customerIdHash: eligibility.customerIdHash,
    signupEmailHash: eligibility.signupEmailHash,
    customerEmailHash: eligibility.customerEmailHash,
    primaryDestination: eligibility.primaryDestination,
    matchedSources: eligibility.matchedSources,
    safeCustomerMessage: "We found your Cendorq account. Continue to your dashboard.",
  };
}
