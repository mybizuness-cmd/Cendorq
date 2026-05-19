export type OwnerPublicCompanyUrlSafetyResult = {
  ok: boolean;
  normalizedUrl: string;
  reason:
    | "public-url-accepted"
    | "missing-url"
    | "invalid-url"
    | "unsupported-protocol"
    | "blocked-local-host"
    | "blocked-private-host"
    | "blocked-credentialed-url"
    | "blocked-oversized-url";
  fetchAllowed: boolean;
  screenshotsAllowed: boolean;
  credentialsAllowed: false;
  privateNetworkAllowed: false;
};

const BLOCKED_HOSTS = new Set(["localhost", "0.0.0.0", "127.0.0.1", "::1"]);
const PRIVATE_IPV4_PREFIXES = ["10.", "127.", "169.254.", "172.16.", "172.17.", "172.18.", "172.19.", "172.20.", "172.21.", "172.22.", "172.23.", "172.24.", "172.25.", "172.26.", "172.27.", "172.28.", "172.29.", "172.30.", "172.31.", "192.168."];

export const OWNER_PUBLIC_COMPANY_URL_SAFETY_STANDARD = [
  "Owner report test mode can inspect public company URLs only.",
  "Owner report test mode must reject localhost, private network, credentialed, unsupported protocol, and oversized URLs.",
  "Owner report test mode must not accept passwords, private keys, session tokens, customer accounts, or non-public company data.",
  "Public URL acceptance only authorizes safe preview acquisition; it does not authorize checkout, customer delivery, entitlement mutation, billing mutation, or report release.",
] as const;

export function validateOwnerPublicCompanyUrl(input: string): OwnerPublicCompanyUrlSafetyResult {
  if (!input.trim()) return blocked("missing-url");
  if (input.length > 260) return blocked("blocked-oversized-url");

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return blocked("invalid-url");
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return blocked("unsupported-protocol");
  if (url.username || url.password) return blocked("blocked-credentialed-url");

  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith(".localhost")) return blocked("blocked-local-host");
  if (isPrivateHost(host)) return blocked("blocked-private-host");

  url.hash = "";
  return {
    ok: true,
    normalizedUrl: url.toString().slice(0, 260),
    reason: "public-url-accepted",
    fetchAllowed: true,
    screenshotsAllowed: true,
    credentialsAllowed: false,
    privateNetworkAllowed: false,
  };
}

function isPrivateHost(host: string) {
  if (PRIVATE_IPV4_PREFIXES.some((prefix) => host.startsWith(prefix))) return true;
  if (host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) return true;
  return false;
}

function blocked(reason: OwnerPublicCompanyUrlSafetyResult["reason"]): OwnerPublicCompanyUrlSafetyResult {
  return {
    ok: false,
    normalizedUrl: "",
    reason,
    fetchAllowed: false,
    screenshotsAllowed: false,
    credentialsAllowed: false,
    privateNetworkAllowed: false,
  };
}
