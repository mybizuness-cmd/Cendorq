# Cendorq Manual QA and Acceptance Checklist

Use this checklist for final human review, browser checks, mobile checks, buyer-path walkthroughs, acceptance criteria, regression risk, visual review, copy review, and post-change signoff.

The goal is simple: make sure the change feels ready to a real buyer before it reaches production.

## Manual QA principle

Automated checks protect the code path. Manual QA protects the buyer experience. If a change technically passes but feels confusing, broken, crowded, stale, or unfinished, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging buyer-facing changes, confirm:

- The changed page or flow was reviewed manually.
- The primary buyer path still makes sense.
- The Free Scan path remains easy to find.
- Plans remain easy to compare.
- Deep Review, Build Fix, and Ongoing Control remain distinct.
- Connect remains easy to reach when a buyer needs conversation first.
- The page feels calm, polished, and trustworthy.
- CTAs match their destination.
- No new dead ends were introduced.
- No old public labels were revived.
- No sensitive data, secrets, or internal details are visible.
- Acceptance criteria are clear enough to know when the change is done.

## Browser and viewport checks

For public UI changes, review at least:

- one desktop viewport
- one mobile viewport
- navigation and footer behavior
- CTA taps/clicks
- form readability when relevant
- obvious layout shift or crowding

## Buyer-path walkthrough

Walk through the path as a new buyer:

1. Start on the homepage.
2. Find the Free Scan.
3. Compare Plans.
4. Understand Deep Review, Build Fix, and Ongoing Control.
5. Reach Connect when human help is needed.

Confirm the experience is understandable without internal context.

## Regression checks

Before merge, look for regressions in:

- route navigation
- link destinations
- page hierarchy
- copy clarity
- mobile readability
- form states
- policy or trust surfaces
- discovery files when public routes changed

## Acceptance criteria checks

For each meaningful change, confirm:

- The expected outcome is stated.
- The changed behavior matches the expected outcome.
- Non-goals remain out of scope.
- Known tradeoffs are noted when relevant.
- Follow-up work is not described as already complete.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting manual QA changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use manual QA work as a reason to add:

- vague signoff language
- skipped validation
- hidden known issues
- homepage clutter
- unsupported claims
- internal-only language on public pages
- technical language that reduces buyer clarity
