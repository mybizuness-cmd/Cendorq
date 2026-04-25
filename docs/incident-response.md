# Cendorq Incident Response Runbook

Use this runbook when production breaks, scheduled smoke checks fail, public trust files are wrong, or a release weakens the buyer path.

## Incident principle

Protect the buyer path first:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

If a change makes the site harder to understand, harder to trust, or harder to choose, treat it as production-sensitive.

## Severity guide

### Critical

Use this level when:

- `/` is unavailable or misleading.
- `/free-check` is unavailable.
- `/connect` is unavailable.
- `/api/health` fails.
- production deploy is broken.
- public pages expose secrets, private data, or unsafe content.
- trust files or crawler files actively mislead visitors, crawlers, or scanners.

### High

Use this level when:

- a canonical buyer route is broken.
- a legacy redirect points to the wrong destination.
- the homepage adds clutter or competing CTAs.
- public labels regress to old language.
- the production smoke check fails for a stable reason.

### Medium

Use this level when:

- docs, templates, or guidance are wrong but production still works.
- scheduled checks are noisy but not hiding a production issue.
- non-critical copy weakens clarity but does not block action.

## First response checklist

When an incident is found:

- Do not start broad refactors.
- Identify the failing surface.
- Confirm whether the issue is reproducible.
- Check the latest merged PR.
- Check whether CI passed before merge.
- Check whether the issue is code, hosting, DNS, network, or workflow-related.
- Open a production safety issue if tracking is needed.

## Verification commands

Run local validation when possible:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

Run production smoke verification:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

or run the **Production Smoke Check** workflow manually from GitHub Actions.

## Critical surfaces to check

Check these first:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`

## Recovery path

Use the smallest safe fix:

1. Revert the bad commit when the cause is clear.
2. Patch the narrow failing surface when a revert is riskier.
3. Keep the homepage focused on Free Scan.
4. Keep canonical routes intact.
5. Keep old public labels out of active public surfaces.
6. Re-run CI.
7. Redeploy.
8. Run the production smoke check.

## Communication notes

Keep updates short and factual:

- what failed
- who or what is affected
- current status
- next action
- validation result

Avoid guesses. Say what is known, what is being checked, and what changed.

## After-action checklist

After the incident is resolved:

- Confirm production smoke passes.
- Confirm the buyer path is intact.
- Confirm release checklist guidance was followed or updated.
- Add a route guard if the incident revealed a missing protection.
- Update docs if the response path was unclear.
- Close or update the production safety issue.

## Non-goals during incidents

Do not use incidents as a reason to add:

- homepage clutter
- dashboard behavior
- route-console behavior
- competing CTAs
- unsupported guarantees
- broad rewrites unrelated to the failure
