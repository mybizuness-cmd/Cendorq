# Public Buyer Path Regression Checklist

## Purpose

Use this checklist before changing public pages, navigation, CTAs, route labels, or product proof sections.

The goal is to improve the public buyer path without creating validation drift, noisy sections, or competing routes.

## Protected buyer path

Every public change should keep this path easy to understand:

1. Start the Free Scan.
2. See the Product / Sample Report.
3. Choose plan depth only when needed.
4. Return through Customer Access when work already exists.
5. Use Contact Us when the question is specific.

## Page roles

- `/` should keep the Free Scan as the primary next action.
- `/free-check` should collect enough context for a first signal.
- `/sample-report` should demonstrate the product object.
- `/plans` should help customers choose depth.
- `/plans/deep-review` should explain cause-finding depth.
- `/plans/build-fix` should explain scoped repair depth.
- `/plans/ongoing-control` should explain ongoing watch depth.
- `/faq` should remove hesitation without becoming another sales page.
- `/login` should return verified customers to existing context.
- `/connect` should route Contact Us, support, fit, scope, or timing questions.

## Regression checks

Before merging a public buyer-path change, confirm:

- The primary next action is still clear.
- The change does not create a second competing CTA path.
- Public language does not promise rankings, revenue, leads, or AI placement.
- Contact Us language points to `/connect` and direct email behavior.
- Customer Access does not imply a blank account can be created.
- The Sample Report remains the public product proof surface.
- Plan pages still separate first signal, cause, repair, and control.
- FAQ stays a hesitation reducer, not a hidden pricing page.
- Free Scan remains the safest first step when the issue is unclear.

## Navigation guardrail

The shared header may use the protected `Product` label for `/sample-report`.

Do not rename validator-protected shared navigation labels unless route validation is intentionally updated in the same batch.

## Non-goals

Do not add:

- homepage clutter
- route-console language
- fake dashboards
- untested public message boxes
- fake success states
- generic SEO dashboard positioning
- public internal scoring logic
- private report evidence
- claims that a platform will rank, cite, or recommend the business

## Validation expectation

Run before merge readiness:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

## Batch 11 note

This checklist follows the public route product path ledger and captures the regression checks needed before the next public route or product-proof batch.
