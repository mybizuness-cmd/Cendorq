## Summary

-
-
-

## Command design impact

This PR follows the Cendorq command design standard:

- [ ] Apple-level trust and authority
- [ ] Google-level simplicity
- [ ] ChatGPT-level immediate action
- [ ] The affected surface answers: What is the safest next command?
- [ ] Primary action remains obvious.
- [ ] Secondary actions do not compete with the main path.
- [ ] Public/private boundaries remain intact.
- [ ] Fallback, error, loading, or not-found states recover into homepage, Free Scan, or Plans instead of legacy paths.

Use `docs/command-design-operating-standard.md` before changing public pages, fallback states, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, or validation guardrails.

## Buyer path impact

- [ ] Homepage
- [ ] Free Scan
- [ ] Plans
- [ ] Deep Review
- [ ] Build Fix
- [ ] Ongoing Control
- [ ] Connect
- [ ] Dashboard or protected customer surface
- [ ] Intake console or internal operator surface
- [ ] Report shell or report rendering surface
- [ ] Loading, error, or not-found fallback
- [ ] No buyer-path impact

## Validation

Run before merge or confirm CI passed:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

## Notes

-
