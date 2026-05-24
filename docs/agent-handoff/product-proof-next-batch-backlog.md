# Product Proof Next Batch Backlog

## Purpose

Define the next safe product-proof implementation batches without adding noisy public sections or weakening route validation.

## Current product path

1. Free Scan
2. Product / Sample Report
3. Plans
4. Deep Review
5. Build Fix
6. Ongoing Control
7. FAQ
8. Customer Access
9. Contact Us

## Next implementation candidates

### Batch A: Sample Report proof density

Improve `/sample-report` only if the page can make the product object clearer without adding sales clutter.

Safe targets:

- Presence Score
- Choice Gap
- Evidence Boundary
- Repair Queue
- Next Move

Avoid outcome guarantees, fake live data, fake customer results, and claims about rankings, leads, revenue, or AI placement.

### Batch B: Plans depth clarity

Improve plan pages only if each page makes one decision clearer:

- Free Scan = first signal
- Deep Review = cause
- Build Fix = scoped repair
- Ongoing Control = watch and drift control

### Batch C: FAQ hesitation reducer

Improve `/faq` only when the change reduces confusion around where to start, what the Sample Report means, how Customer Access works, and what Cendorq does not guarantee.

### Batch D: Customer Access clarity

Improve `/login` only if it protects the rule: no blank account detour, return with existing email, first-time users start Free Scan.

## Merge gate

Run before merge readiness:

- pnpm validate:routes
- pnpm lint
- pnpm typecheck
- pnpm build

## Guardrail

Do not rename validator-protected shared navigation labels unless route validation is intentionally updated in the same PR.
