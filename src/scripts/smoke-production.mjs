const rawBaseUrl = process.env.CENDORQ_BASE_URL || process.argv[2] || "http://localhost:3000";
const baseUrl = normalizeBaseUrl(rawBaseUrl);

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

const failures = [];

for (const check of checks) {
  await checkTextRoute(check);
}

for (const check of jsonChecks) {
  await checkJsonRoute(check);
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

function normalizeBaseUrl(value) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "http://localhost:3000";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
