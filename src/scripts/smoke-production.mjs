const rawBaseUrl = process.env.CENDORQ_BASE_URL || process.argv[2] || "http://localhost:3000";
const baseUrl = normalizeBaseUrl(rawBaseUrl);
const isLocalBaseUrl = isLocalhostBaseUrl(baseUrl);

const checks = [
  { path: "/", expect: ["Cendorq"] },
  { path: "/free-check", expect: ["free scan"] },
  { path: "/plans", expect: ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control"] },
  { path: "/plans/deep-review", expect: ["Deep Review"] },
  { path: "/plans/build-fix", expect: ["Build Fix"] },
  { path: "/plans/ongoing-control", expect: ["Ongoing Control"] },
  { path: "/connect", expect: ["Connect"] },
  { path: "/robots.txt", expect: ["Sitemap"] },
  { path: "/sitemap.xml", expect: ["/free-check", "/plans", "/connect"] },
  { path: "/llms.txt", expect: ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control"] },
  { path: "/.well-known/security.txt", expect: ["Contact:", "https://cendorq.com/connect"] },
];

const redirectChecks = [
  { path: "/pricing", destination: "/plans" },
  { path: "/pricing/full-diagnosis", destination: "/plans/deep-review" },
  { path: "/pricing/optimization", destination: "/plans/build-fix" },
  { path: "/pricing/monthly-partner", destination: "/plans/ongoing-control" },
  { path: "/contact", destination: "/connect" },
  { path: "/how-it-works", destination: "/plans" },
  { path: "/diagnosis", destination: "/plans/deep-review" },
  { path: "/profile", destination: "/plans" },
  { path: "/faq", destination: "/plans" },
];

const jsonChecks = [
  {
    path: "/api/health",
    expect: {
      ok: true,
      service: "cendorq-platform",
      status: "healthy",
    },
  },
];

const optionChecks = [
  {
    path: "/api/free-check",
    allow: "GET,POST,OPTIONS",
  },
];

const protectedReadChecks = [
  {
    path: "/api/free-check",
    expectedStatus: 401,
    expectError: "The intake console is not authorized to read submissions.",
  },
];

const closedCommandCenterChecks = [
  {
    path: "/command-center",
    expect: ["Private Command Center", "Closed by default.", "No customer records"],
    forbid: ["Private configuration checklist", "Schema anchors", "DATABASE_URL", "STRIPE_SECRET_KEY"],
  },
  {
    path: "/command-center/intake",
    expect: ["Private Command Center", "Intake Inbox is closed by default.", "No customer records"],
    forbid: ["Schema anchors", "requiredPermission", "DATABASE_URL", "STRIPE_SECRET_KEY"],
  },
];

const protectedCommandCenterApiChecks = [
  {
    path: "/api/command-center/readiness",
    expectedStatus: 401,
    expectError: "The Command Center readiness endpoint is not authorized.",
  },
  {
    path: "/api/command-center/owner-configuration/evidence",
    expectedStatus: 404,
    expectError: "not_available",
  },
  {
    path: "/api/command-center/owner-configuration/workflow",
    expectedStatus: 404,
    expectError: "not_available",
  },
];

const failures = [];

for (const check of checks) {
  await checkTextRoute(check);
}

for (const check of redirectChecks) {
  await checkRedirectRoute(check);
}

for (const check of jsonChecks) {
  await checkJsonRoute(check);
}

for (const check of optionChecks) {
  await checkOptionsRoute(check);
}

for (const check of protectedReadChecks) {
  await checkProtectedReadRoute(check);
}

for (const check of closedCommandCenterChecks) {
  await checkClosedCommandCenterRoute(check);
}

for (const check of protectedCommandCenterApiChecks) {
  await checkProtectedJsonErrorRoute(check);
}

if (failures.length) {
  console.error(`Production smoke check failed for ${baseUrl}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Production smoke check passed for ${baseUrl}.`);

async function checkTextRoute({ path, expect }) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { redirect: "follow" }).catch((error) => ({ error }));

  if ("error" in response) {
    failures.push(`${path} could not be fetched: ${response.error.message}`);
    return;
  }

  if (!response.ok) {
    failures.push(`${path} returned ${response.status}`);
    return;
  }

  const text = await response.text();
  for (const phrase of expect) {
    if (!text.includes(phrase)) failures.push(`${path} did not include expected phrase: ${phrase}`);
  }
}

async function checkRedirectRoute({ path, destination }) {
  const url = new URL(path, baseUrl);
  const redirectResponse = await fetch(url, { redirect: "manual" }).catch((error) => ({ error }));

  if ("error" in redirectResponse) {
    failures.push(`${path} could not be fetched for redirect verification: ${redirectResponse.error.message}`);
    return;
  }

  if (!isRedirectStatus(redirectResponse.status)) {
    failures.push(`${path} expected redirect status but returned ${redirectResponse.status}`);
    return;
  }

  const locationHeader = redirectResponse.headers.get("location") || "";
  if (!locationHeader) {
    failures.push(`${path} returned redirect status ${redirectResponse.status} without a Location header`);
    return;
  }

  const targetUrl = new URL(locationHeader, url);
  const targetPath = normalizePathname(targetUrl.pathname);
  if (targetPath !== destination) {
    failures.push(`${path} expected Location path ${destination} but got ${targetPath}`);
    return;
  }

  const followResponse = await fetch(url, { redirect: "follow" }).catch((error) => ({ error }));

  if ("error" in followResponse) {
    failures.push(`${path} could not be fetched after redirect follow: ${followResponse.error.message}`);
    return;
  }

  if (!followResponse.ok) {
    failures.push(`${path} returned ${followResponse.status} during redirect follow`);
    return;
  }

  const finalUrl = new URL(followResponse.url);
  if (normalizePathname(finalUrl.pathname) !== destination) {
    failures.push(`${path} should resolve to ${destination} but resolved to ${finalUrl.pathname}`);
  }
}

async function checkJsonRoute({ path, expect }) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { redirect: "follow" }).catch((error) => ({ error }));

  if ("error" in response) {
    failures.push(`${path} could not be fetched: ${response.error.message}`);
    return;
  }

  if (!response.ok) {
    failures.push(`${path} returned ${response.status}`);
    return;
  }

  const payload = await response.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    failures.push(`${path} did not return JSON.`);
    return;
  }

  for (const [key, value] of Object.entries(expect)) {
    if (payload[key] !== value) failures.push(`${path} expected ${key}=${String(value)} but got ${String(payload[key])}`);
  }
}

async function checkOptionsRoute({ path, allow }) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { method: "OPTIONS", redirect: "follow" }).catch((error) => ({ error }));

  if ("error" in response) {
    failures.push(`${path} OPTIONS could not be fetched: ${response.error.message}`);
    return;
  }

  if (response.status !== 204) {
    failures.push(`${path} OPTIONS expected 204 but returned ${response.status}`);
    return;
  }

  const allowHeader = response.headers.get("allow") || "";
  if (allowHeader !== allow) failures.push(`${path} OPTIONS expected Allow=${allow} but got ${allowHeader || "empty"}`);
}

async function checkProtectedReadRoute({ path, expectedStatus, expectError }) {
  if (isLocalBaseUrl) return;

  await checkProtectedJsonErrorRoute({ path, expectedStatus, expectError });
}

async function checkClosedCommandCenterRoute({ path, expect, forbid }) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { redirect: "follow" }).catch((error) => ({ error }));

  if ("error" in response) {
    failures.push(`${path} closed Command Center route could not be fetched: ${response.error.message}`);
    return;
  }

  if (!response.ok) {
    failures.push(`${path} closed Command Center route returned ${response.status}`);
    return;
  }

  const text = await response.text();
  for (const phrase of expect) {
    if (!text.includes(phrase)) failures.push(`${path} closed Command Center route missing expected phrase: ${phrase}`);
  }
  for (const phrase of forbid) {
    if (text.includes(phrase)) failures.push(`${path} closed Command Center route exposed forbidden phrase: ${phrase}`);
  }
}

async function checkProtectedJsonErrorRoute({ path, expectedStatus, expectError }) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, { method: "GET", redirect: "follow" }).catch((error) => ({ error }));

  if ("error" in response) {
    failures.push(`${path} protected JSON route could not be fetched: ${response.error.message}`);
    return;
  }

  if (response.status !== expectedStatus) {
    failures.push(`${path} protected JSON route expected ${expectedStatus} but returned ${response.status}`);
    return;
  }

  const payload = await response.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    failures.push(`${path} protected JSON route did not return JSON.`);
    return;
  }

  if (payload.ok !== false) failures.push(`${path} protected JSON route should return ok=false.`);
  if (payload.error !== expectError) failures.push(`${path} protected JSON route returned unexpected error message.`);
}

function isRedirectStatus(status) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

function normalizeBaseUrl(value) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "http://localhost:3000";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isLocalhostBaseUrl(value) {
  const parsed = new URL(value);
  return parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1" || parsed.hostname === "0.0.0.0";
}

function normalizePathname(value) {
  const normalized = value.replace(/\/+$/, "");
  return normalized || "/";
}
