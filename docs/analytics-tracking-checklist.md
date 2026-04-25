# Cendorq Analytics and Tracking Checklist

Use this checklist for analytics scripts, tracking pixels, event names, attribution, conversion measurement, privacy-sensitive telemetry, consent-sensitive changes, and buyer-path reporting.

The goal is simple: keep measurement useful without weakening buyer trust, privacy, speed, or clarity.

## Analytics principle

Analytics supports decisions. If tracking collects too much, slows the site, exposes private information, or creates policy risk, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging analytics or tracking changes, confirm:

- The tracking has a clear business reason.
- Events use plain, stable names.
- Events map to the buyer path without creating clutter.
- No sensitive form content is collected.
- No private customer data is logged or sent to third parties unnecessarily.
- Tracking does not expose secrets, tokens, private keys, or credentials.
- Third-party scripts are necessary, documented, and performance-safe.
- Privacy language remains accurate when tracking behavior changes.
- Consent-sensitive behavior is handled intentionally when relevant.
- Tracking failures do not break the buyer path.
- The site remains fast and mobile-safe.

## Event naming checks

For event changes, confirm:

- Event names are stable and readable.
- Events describe buyer actions, not internal implementation details.
- Event names avoid private data.
- Similar events use consistent naming.
- Deprecated events are not revived without a clear reason.

## Script and pixel checks

For script or pixel changes, confirm:

- The script is needed.
- The script is loaded in the safest practical way.
- The script does not block critical page rendering.
- The script does not create layout shift.
- The script does not duplicate existing tracking.
- The script does not conflict with policy or privacy language.

## Privacy checks

For tracking changes, confirm:

- Submitted form content is not tracked unless explicitly necessary and approved.
- URLs do not leak private data.
- Query parameters are safe.
- Debug logs are not enabled in production by default.
- Data-use statements remain accurate.

## Buyer-path measurement checks

Measurement should help answer:

- Are buyers starting the Free Scan?
- Are buyers comparing Plans?
- Are buyers choosing Deep Review, Build Fix, or Ongoing Control?
- Are buyers reaching Connect when they need conversation first?
- Are there broken steps or high-friction paths?

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting analytics changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use analytics work as a reason to add:

- hidden tracking
- private data exposure
- unnecessary third-party scripts
- blocking scripts
- policy drift
- homepage clutter
- technical language that reduces buyer clarity
