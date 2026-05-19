const fixtures = [
  {
    fixtureId: "fixture-apple-full-stack-preview",
    companyName: "Apple",
    companyUrl: "https://www.apple.com",
    requestedPlans: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    testPurpose: "full-stack-preview",
  },
  {
    fixtureId: "fixture-nike-free-scan-smoke",
    companyName: "Nike",
    companyUrl: "https://www.nike.com",
    requestedPlans: ["free-scan"],
    testPurpose: "free-scan-smoke",
  },
  {
    fixtureId: "fixture-shopify-paid-plan-depth",
    companyName: "Shopify",
    companyUrl: "https://www.shopify.com",
    requestedPlans: ["deep-review", "build-fix"],
    testPurpose: "paid-plan-depth",
  },
  {
    fixtureId: "fixture-airbnb-ongoing-control-cycle",
    companyName: "Airbnb",
    companyUrl: "https://www.airbnb.com",
    requestedPlans: ["ongoing-control"],
    testPurpose: "ongoing-control-cycle",
  },
];

const route = "/api/command-center/owner-report-test-mode";

console.log("Owner report test fixtures");
console.log("Mode: owner-only backend terminal/API smoke commands");
console.log("Safety: public URLs only, no checkout, no customer delivery, no billing mutation, no entitlement mutation");
console.log("");

for (const fixture of fixtures) {
  const payload = JSON.stringify({
    companyName: fixture.companyName,
    companyUrl: fixture.companyUrl,
    requestedPlans: fixture.requestedPlans,
  });

  console.log(`# ${fixture.fixtureId} | ${fixture.testPurpose}`);
  console.log(`curl -X POST ${route} -H 'Content-Type: application/json' -d '${payload}'`);
  console.log("");
}

console.log("Discovery endpoint:");
console.log(`curl ${route}`);
