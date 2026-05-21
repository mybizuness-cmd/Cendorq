# Presence Report base update audit

This PR stays in draft until the base update or rebase review is complete.

## Checked state

- Latest checked head: `752127ca12254ccf848dc9afd3e9aca84dba20ee`.
- Vercel status on that head: green.
- GitHub Actions run on that head: not attached at the time of audit.
- Blocking reviews or review threads: none found at the time of audit.

## Divergence state

Reverse compare showed:

- `main` is ahead of this branch by 121 commits.
- this branch is ahead of `main` by 164 commits.

## Public overlap result

The overlapping public files on `main` still use the older AI Visibility and Readiness public positioning. This branch intentionally moves the public experience to Presence Report positioning.

During the base update, preserve this branch's Presence Report intent across homepage, Free Scan, Plans, FAQ, Dashboard, header, footer, sitemap, and SEO surfaces.

## Access overlap result

Main also added newer customer access and redirect hardening. During the base update, preserve safe access hardening where it does not conflict with the Presence Report public positioning.

## Required before ready for review

Run:

```bash
pnpm validate:routes
pnpm validate:presence-report
pnpm lint
pnpm typecheck
pnpm build
```

Then confirm:

1. Vercel is green on the latest head.
2. Base update or rebase review is complete.
3. Presence Report public positioning remains intact.
4. Safe customer access hardening is not dropped.
5. Sample Report, vertical Sample Report routes, and protected Free Scan Presence Report preview still pass validation.
