# Cendorq Conversion Quality Checklist

Use this checklist for homepage, public buyer-path, CTA, plan, trust cue, layout hierarchy, friction reduction, and offer-positioning changes.

The goal is simple: keep Cendorq easy to understand, easy to trust, and easy to choose.

## Conversion principle

Conversion quality protects the buyer path. If a visitor cannot quickly understand the next step, trust the offer, or choose the right path, the public site is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging conversion-sensitive changes, confirm:

- The homepage still has one primary job: get the right customer to start the Free Scan.
- The primary CTA is easy to find and understand.
- Secondary CTAs do not compete with the main action.
- The buyer path remains simple and ordered.
- Plans are easy to compare without clutter.
- Deep Review, Build Fix, and Ongoing Control stay distinct.
- Trust cues support the decision without sounding exaggerated.
- Page hierarchy makes the next step obvious.
- Friction is reduced, not moved elsewhere.
- No dashboard behavior, route-console behavior, or internal-tool feel was added.
- No old public labels were revived in active surfaces.

## Homepage checks

For homepage changes, confirm:

- The Free Scan path remains the safest first step.
- The page does not add competing offers above the primary action.
- The headline, supporting copy, and CTA work together.
- The visitor can understand the value without technical knowledge.
- The page feels premium, calm, and direct.

## Plan checks

For plan or offer changes, confirm:

- Each plan has a clear role.
- Plan names use current buyer language.
- Plan differences are meaningful and easy to understand.
- Pricing or scope language does not create confusion.
- The path from Plans to the next action is clear.

## Trust checks

Trust cues should be:

- specific
- calm
- credible
- relevant
- easy to verify

Avoid hype, fear, unsupported guarantees, and vague authority claims.

## Friction checks

Before merging, ask:

- Did this change make the next step easier?
- Did this change remove confusion?
- Did this change add a new decision the buyer does not need?
- Did this change make the page heavier, louder, or less direct?

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting conversion changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use conversion work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- unsupported guarantees
- technical language that reduces buyer clarity
