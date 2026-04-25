# Cendorq Privacy and Data Handling Checklist

Use this checklist for public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, and integration changes.

The goal is simple: keep Cendorq safe, minimal, and trustworthy with customer data.

## Privacy principle

Privacy supports trust. If a visitor cannot understand what is collected, where it goes, or why it is needed, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging privacy-sensitive changes, confirm:

- No secrets, tokens, private keys, or credentials are committed.
- `.env.example` contains placeholders only.
- Public forms only request information that is needed.
- Form labels make clear what the visitor is submitting.
- Customer-sensitive information is not logged unnecessarily.
- Console output does not expose private data.
- Error messages do not leak internals, credentials, tokens, or customer data.
- Analytics or third-party scripts are necessary and documented.
- Third-party scripts do not weaken performance, trust, or buyer clarity.
- Public health checks remain safe to expose.
- Security contact and reporting surfaces stay current.
- No private customer data is used in examples, docs, screenshots, or tests.

## Public form checks

For form changes, confirm:

- The form has a clear purpose.
- The requested fields are minimal.
- Required fields are truly required.
- The submit action is clear.
- Success and error states are understandable.
- The form does not make unsupported privacy or outcome guarantees.

## Environment checks

For environment changes, confirm:

- New variables are documented in `.env.example` when safe.
- Real values are never committed.
- Variable names do not reveal private systems unnecessarily.
- Production-only values are not assumed in local checks.
- CI and smoke checks can run without private secrets unless intentionally required.

## Logging checks

For logging or diagnostics changes, confirm:

- Logs avoid names, emails, URLs, tokens, submitted form content, and private customer data unless strictly necessary.
- Logs are useful for operations without exposing sensitive information.
- Debug logging is not enabled by default in production.

## Third-party checks

For third-party scripts, analytics, embeds, or integrations, confirm:

- The need is clear.
- The surface is documented.
- The script does not block the buyer path.
- The script does not add avoidable tracking or data collection.
- The script does not create avoidable performance or security risk.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting privacy or data handling changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use privacy work as a reason to add:

- unnecessary form fields
- hidden tracking
- homepage clutter
- competing CTAs
- unsupported guarantees
- technical language that reduces buyer clarity
