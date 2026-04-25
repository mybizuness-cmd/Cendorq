## Summary

-
-
-

## Buyer-path impact

Does this change touch the public buyer path?

- [ ] Homepage
- [ ] Free Scan
- [ ] Plans
- [ ] Deep Review
- [ ] Build Fix
- [ ] Ongoing Control
- [ ] Connect
- [ ] No public buyer-path impact

## Conversion check

- [ ] The homepage still has one job: get the right customer to start the Free Scan.
- [ ] No homepage clutter, dashboard behavior, route-console behavior, or multi-offer confusion was added.
- [ ] CTAs still favor the Free Scan when the user is not ready for deeper work.
- [ ] Public language stays plain, strong, and easy to understand.

## Production safety check

- [ ] Canonical routes are still protected.
- [ ] Legacy URLs still redirect into the current buyer path.
- [ ] Discovery files still make sense: robots.txt, sitemap.xml, llms.txt, security.txt, manifest.
- [ ] `/api/health` remains dynamic, no-store, noindex, and lightweight.
- [ ] No old public labels were revived in active surfaces.

## Release history check

- [ ] `CHANGELOG.md` was updated for meaningful production, buyer-path, trust-file, workflow, release, incident, or validation changes.
- [ ] No changelog update is needed because this change is internal-only, cosmetic-only, or otherwise not meaningful for release history.

## Required validation

Run before merge or confirm CI passed:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For deployment verification, run after deploy:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Notes

-
