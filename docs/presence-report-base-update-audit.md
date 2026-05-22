# Presence Report base update audit

This PR stays in draft until final review confirms the latest green head and base alignment.

## Checked state

- Latest checked head: `7622915af9bdf1629089074c78745539603cf79c`.
- Vercel status on that head: green.
- GitHub Actions on that head: CI, Release Control, and CodeQL are green.
- Release Control on that head passed route guardrails, Presence Report validation, lint, typecheck, and build.
- Blocking reviews or review threads: none found at the time of audit.

## Base alignment state

Current compare from `main` to `presence-report-homepage-batch` shows:

- `main` is not ahead of this branch.
- this branch is ahead of `main` by 265 commits.
- the merge base is current `main` at `34357301ed0abca07d89ee863bcf226916ea1916`.

## Public overlap result

The overlapping public files have been carried forward with the Presence Report intent preserved across homepage, Free Scan, Plans, FAQ, Dashboard, header, footer, sitemap, and SEO surfaces.

This branch intentionally supersedes older AI Visibility and Readiness public positioning with AI Search Presence Repair and Presence Report positioning.

## Demo report package result

The protected Free Scan preview and Dashboard Presence Command Snapshot now consume the shared Sandwork Presence Report package through the live scan mapper.

Preserve these boundaries during any later base update or conflict resolution:

- Sandwork demo data remains centralized in `src/lib/sandwork-presence-report-fixture.ts`.
- The Presence Report object index continues exposing the shared demo report package for future report-surface reuse.
- Launch-readiness and merge-readiness continue to guard against hardcoded sample-object regressions.
- Free Scan remains first signal only.
- Public copy avoids rankings, leads, revenue, or AI placement guarantees.

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
2. CI, Release Control, and CodeQL are green on the latest head.
3. Base alignment still shows `main` is not ahead of the branch.
4. Presence Report public positioning remains intact.
5. Safe customer access hardening is not dropped.
6. Sample Report, vertical Sample Report routes, and protected Free Scan Presence Report preview still pass validation.
7. The shared Sandwork demo report package remains the source for protected and dashboard report surfaces.