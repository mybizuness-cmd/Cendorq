# Cendorq Integration Readiness Checklist

Use this checklist for third-party services, API handoffs, payment providers, AI services, email or CRM handoffs, webhooks, external scripts, service keys, integration failures, and production-support expectations.

The goal is simple: keep integrations intentional, safe, supportable, and invisible unless they help the buyer path.

## Integration principle

Integrations support the product. If an integration adds hidden risk, exposes data, slows the site, breaks the buyer path, or fails without recovery, the production surface is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging integration-sensitive changes, confirm:

- The integration has a clear business reason.
- The integration is needed now, not speculative.
- The user-facing behavior is clear.
- Failure states are recoverable and buyer-friendly.
- Secrets, tokens, API keys, webhook secrets, and credentials are not committed.
- Environment variable expectations are documented safely.
- Public copy does not promise integration behavior that is not implemented.
- Integration errors do not expose internals.
- Logs avoid private buyer data, submitted form content, tokens, and service payloads.
- The integration does not slow or block the public buyer path unnecessarily.
- Privacy, policy, analytics, and data handling expectations remain aligned.

## API handoff checks

For API or service handoff changes, confirm:

- Request and response expectations are clear.
- Timeouts and failures are handled.
- Retries do not duplicate buyer actions unexpectedly.
- Error messages stay plain and useful.
- Service-specific errors are not exposed directly to buyers.
- The buyer is not left unsure what happened.

## Payment and checkout checks

For payment or checkout-related changes, confirm:

- Pricing and offer language are aligned with public plan pages.
- Payment states are clear.
- Success and cancellation paths are recoverable.
- Webhook expectations are documented safely.
- Payment secrets are never exposed client-side.
- The buyer can reach Connect if payment or checkout needs human help.

## AI service checks

For AI-service changes, confirm:

- Inputs avoid unnecessary sensitive data.
- Outputs do not create unsupported guarantees.
- Failure states explain what happens next.
- Prompts, payloads, and responses are not logged with private buyer data by default.
- Public language does not overstate automation quality.

## Email, CRM, and notification checks

For email, CRM, or notification changes, confirm:

- Buyer handoff is understandable.
- Duplicate submissions are handled safely.
- Internal notifications do not expose unnecessary private data.
- Example payloads use fake data only.
- Notification failures do not break the public site.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting integration changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use integration work as a reason to add:

- speculative services
- hidden tracking
- private data exposure
- hardcoded credentials
- blocking scripts
- unsupported guarantees
- homepage clutter
- technical language that reduces buyer clarity
