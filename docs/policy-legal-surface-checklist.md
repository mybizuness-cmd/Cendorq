# Cendorq Policy and Legal Surface Checklist

Use this checklist for public policy pages, terms language, privacy language, security contact surfaces, disclaimers, compliance-sensitive copy, data-use statements, and legal-adjacent public content.

The goal is simple: keep public policy surfaces accurate, clear, supportable, and aligned with the real product.

## Policy principle

Policy and legal-adjacent content supports trust. If public policy language is vague, outdated, overbroad, or inconsistent with the product, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging policy-sensitive changes, confirm:

- Policy language matches the real product behavior.
- Terms, privacy, and security references stay current.
- Disclaimers are clear without sounding evasive.
- Data-use statements are accurate and not overbroad.
- Security contact surfaces are easy to find and current.
- No unsupported legal, compliance, privacy, or security claim was added.
- No policy language conflicts with public forms, analytics, third-party scripts, or data handling.
- No customer data, private examples, secrets, tokens, or credentials are exposed.
- Policy content remains plain enough for a buyer to understand.
- Policy changes do not add fear-based messaging or unnecessary friction.

## Privacy and data-use checks

For privacy or data-use changes, confirm:

- The language matches actual data collection.
- The language matches actual storage and processing expectations.
- Public variables do not imply private data handling.
- Analytics or third-party references are accurate if mentioned.
- Form intake language matches what the buyer submits.

## Terms and disclaimer checks

For terms or disclaimer changes, confirm:

- The language is clear and supportable.
- Offer expectations are not contradicted.
- Guarantees are not implied accidentally.
- Limitations are understandable.
- The language does not sound like internal legal boilerplate when plain buyer language would help.

## Security contact checks

For security contact changes, confirm:

- `/.well-known/security.txt` stays accurate.
- Security contact paths remain reachable.
- Public security language does not overpromise.
- Security guidance does not expose internals.
- Security policy references stay aligned.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting policy changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use policy work as a reason to add:

- unsupported guarantees
- fake compliance claims
- absolute security claims
- hidden data-use changes
- confusing disclaimers
- homepage clutter
- technical language that reduces buyer clarity
