# Cendorq Configuration Safety Checklist

Use this checklist for environment variables, public and private configuration, runtime defaults, local templates, deployment values, feature flags, config naming, config drift, and production safety changes.

The goal is simple: keep configuration safe, documented, predictable, and impossible to confuse with secrets.

## Configuration principle

Configuration supports production safety. If a config value is unclear, unsafe by default, exposed publicly by mistake, or different between environments without a reason, the production surface is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging configuration-sensitive changes, confirm:

- No real secrets, tokens, private keys, API keys, webhook secrets, or credentials are committed.
- `.env.example` uses safe placeholder values only.
- Public variables are intentionally public.
- Private variables are never exposed client-side.
- Required environment variables are documented clearly.
- Defaults are safe for local development.
- Production values are not copied into docs, tests, screenshots, or examples.
- Config names are plain and predictable.
- Config changes do not break the buyer path when missing or invalid.
- Error messages do not reveal secret values or internal service details.
- Deployment, integration, privacy, and observability expectations remain aligned.

## Environment variable checks

For environment variable changes, confirm:

- The variable name explains its purpose.
- The variable has a safe example value when needed.
- The variable is documented in the right place.
- The variable is not duplicated under multiple names.
- The variable is not required in environments where it is unused.

## Public/private config checks

For config exposure changes, confirm:

- Client-exposed values are intentionally safe.
- Server-only values stay server-only.
- Build-time values do not leak runtime secrets.
- Logs never print secret values.
- Error output redacts sensitive configuration details.

## Drift checks

Before merging, check for drift between:

- `.env.example`
- deployment environment values
- smoke check expectations
- health endpoint expectations
- README or production docs
- integration setup notes

## Failure-state checks

When config is missing or invalid, confirm:

- The app fails safely.
- The buyer path does not expose internals.
- Health or smoke checks can identify the issue.
- Operational messages are useful without leaking secrets.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting configuration changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use configuration work as a reason to add:

- hardcoded credentials
- production secrets in examples
- unsafe defaults
- unclear feature flags
- private config in public bundles
- hidden tracking
- technical language that reduces buyer clarity
