# Cendorq Copy Quality Checklist

Use this checklist for public page copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes.

The goal is simple: keep Cendorq plain, premium, clear, and easy to choose.

## Copy principle

Copy supports conversion. If the language is vague, technical, cluttered, or overpromising, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging public copy changes, confirm:

- The copy is plain and easy to understand.
- The primary action remains clear.
- CTAs use current buyer-path language.
- Headings are specific and useful.
- The page does not sound like a dashboard, route console, or internal tool.
- Claims are supportable and not exaggerated.
- Trust language is calm, direct, and credible.
- Plan descriptions are distinct and easy to compare.
- Old public labels were not revived in active surfaces.
- Copy does not add clutter or competing intent.
- Metadata stays aligned with current buyer language.
- The Free Scan remains the safest first step when the buyer is not ready for deeper work.

## Approved buyer language

Use plain buyer language:

- Free Scan
- Plans
- Deep Review
- Build Fix
- Ongoing Control
- Connect
- make the business easier to understand
- make the business easier to trust
- make the business easier to choose
- stop guessing before spending more

## Language to avoid in active public surfaces

Avoid reviving old public labels:

- Visibility Blueprint
- Presence Infrastructure
- Presence Command
- Start Search Presence Scan

Avoid vague or bloated phrases:

- AI-powered everything
- revolutionary platform
- guaranteed rankings
- instant domination
- unlock your full potential
- best-in-class without proof

## CTA checks

Before changing CTAs, confirm:

- The homepage still favors Free Scan.
- Secondary CTAs do not compete with the main action.
- Link text is clear without surrounding context.
- CTAs match the destination page.
- Button labels do not overpromise.

## Trust checks

Trust copy should be:

- specific
- calm
- credible
- buyer-focused
- easy to verify

Do not use fear, hype, or unsupported guarantees.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting copy changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use copy work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- unsupported guarantees
- technical language that reduces buyer clarity
