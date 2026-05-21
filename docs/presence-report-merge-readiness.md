# Presence Report merge readiness

This checklist is the merge gate for the Presence Report homepage batch.

## Required validation

Run these before marking the PR ready:

```bash
pnpm validate:routes
pnpm validate:presence-report
pnpm lint
pnpm typecheck
pnpm build
```

## Green deployment state

- Latest PR head must be green in Vercel.
- PR stays draft until local validation is reviewed.
- PR body must name the latest green head SHA.

## Base update state

Main has changed public pages that overlap this branch.
Before merge, update or rebase the branch and re-check:

- `src/app/page.tsx`
- `src/app/free-check/page.tsx`
- `src/app/plans/page.tsx`
- `src/app/faq/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/layout/site-header-conversion.tsx`
- `src/layout/site-footer.tsx`
- `src/app/sitemap.ts`
- `src/lib/seo.ts`

## Product-object boundaries

- Free Scan remains first signal only.
- Sample Report remains example, not a promise.
- Presence Report recommendations stay evidence-led.
- Business Truth Profile remains the safe truth layer.
- Repair Queue ranks what to fix first.
- Control Snapshot remains the recurring retention object.
- No hidden scoring internals are exposed publicly.
- No rankings, leads, revenue, or AI placement guarantees are introduced.

## Ready-for-review condition

Mark ready only when:

1. Vercel is green.
2. Local validation is green.
3. Base update/rebase review is complete.
4. Public navigation still links to Sample Report, Plans, FAQ, Free Scan, and customer access.
5. Public sitemap includes Sample Report and vertical sample routes, while protected customer routes remain excluded.
6. Dashboard still shows the Presence command snapshot without becoming a generic dashboard.
