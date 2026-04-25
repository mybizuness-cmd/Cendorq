# Cendorq Trust and Credibility Checklist

Use this checklist for public trust claims, proof points, testimonials, guarantees, security mentions, credibility language, authority statements, and confidence-building content.

The goal is simple: keep Cendorq believable, calm, supportable, and easy to trust.

## Trust principle

Trust supports conversion. If a claim sounds inflated, unsupported, vague, or fear-based, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging trust-sensitive changes, confirm:

- Claims are accurate and supportable.
- Trust language is calm and specific.
- Security mentions do not overstate protections.
- Guarantees are not added unless accurate, supportable, and approved.
- Proof points are clear without sounding exaggerated.
- Testimonials or customer examples are real, permitted, and not misleading.
- No private customer data is exposed in examples, screenshots, or copy.
- No claim implies guaranteed rankings, guaranteed revenue, instant results, or permanent results without maintenance.
- Trust cues support the buyer decision without adding clutter.
- The page remains easy to understand and easy to choose.

## Claim checks

For claim changes, confirm:

- The claim can be backed up.
- The claim uses plain buyer language.
- The claim avoids hype.
- The claim does not create unsupported expectations.
- The claim does not sound like a fear tactic.

## Proof checks

For proof, case study, testimonial, or example changes, confirm:

- Permission exists when needed.
- The example is current and accurate.
- The example does not expose private customer information.
- The example does not imply every buyer will get the same result.
- The proof supports the page goal instead of distracting from it.

## Security and privacy confidence checks

For security or privacy mentions, confirm:

- Language is accurate and not absolute.
- Claims match the real implementation.
- Security contact surfaces remain current.
- Privacy language stays aligned with data handling expectations.
- Public trust files remain accurate.

## Red flags

Avoid unsupported phrases such as:

- guaranteed rankings
- guaranteed revenue
- instant domination
- best in the world
- fully secure
- risk-free results
- permanent traffic without maintenance

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting trust changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use trust work as a reason to add:

- unsupported guarantees
- fear-based messaging
- fake urgency
- customer data exposure
- homepage clutter
- competing CTAs
- technical language that reduces buyer clarity
