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
- unauthenticated production reads can access Free Scan submissions.

### High

Use this level when:

- a canonical buyer route is broken.
- a legacy redirect points to the wrong destination.
- a legacy redirect stops returning a real redirect status or `Location` header.
- Free Scan API `OPTIONS` returns the wrong status or `Allow` header.
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
- `/api/free-check` `OPTIONS`
- `/api/free-check` protected read behavior
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`

## Protected smoke failure playbooks

### Strict legacy redirect smoke fails

If a legacy redirect smoke check fails, do not replace the check with final-destination-only validation.

Confirm:

- the legacy source still exists in `next.config.ts`
- the destination is one of the current buyer-path routes
- no legacy route file has been recreated under `src/app`
- the first response returns a real redirect status
- the first response includes a `Location` header
- the followed destination resolves successfully
- sitemap, robots, navigation, footer links, metadata, and manifest shortcuts do not promote the legacy route

Fix the smallest failing surface, then run `pnpm validate:routes` and production smoke again.

### Free Scan API `OPTIONS` smoke fails

If `OPTIONS /api/free-check` fails, do not create fake Free Scan submissions to test the endpoint.

Confirm:

- `src/app/api/free-check/route.ts` still exports `OPTIONS`
- the response status is `204`
- the `Allow` header is exactly `GET,POST,OPTIONS`
- `validate-production-smoke-coverage.mjs` still protects the `OPTIONS` check
- retired public scan labels were not reintroduced while patching the route

Fix the API route or smoke expectation only when the production behavior is actually wrong, then run `pnpm validate:routes`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

### Protected Free Scan API read behavior fails

If unauthenticated production `GET /api/free-check` does not return the protected `401`, treat it as critical until proven otherwise.

Confirm:

- production intake reads still require the admin boundary
- unauthenticated production reads return `ok: false`
- the error remains `The intake console is not authorized to read submissions.`
- localhost remains excluded from protected-read smoke so local development does not require production secrets
- no flag, fallback, or temporary branch opens intake reads publicly
- no public report index, public evidence index, or direct database exposure was introduced

Do not weaken the read boundary to make smoke pass. Restore the closed-by-default behavior, then rerun CI and production smoke.

### Health smoke fails

If `/api/health` fails, first determine whether the issue is route code, hosting, deployment, DNS, network, or workflow-related.

Confirm the endpoint remains:

- dynamic
- no-store
- noindex
- lightweight
- safe to expose publicly
- returning JSON with `ok: true`, `service: cendorq-platform`, and `status: healthy`

Do not add private diagnostics, secrets, customer data, environment dumps, or private backend details to the public health response.

### Discovery or trust file smoke fails

If `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/.well-known/security.txt`, or `/manifest.webmanifest` fails, confirm the file is current, reachable, and aligned with the public/private boundary.

Confirm:

- canonical buyer routes are discoverable where appropriate
- redirected legacy routes are not promoted as active pages
- private reports, private evidence, internal command center routes, private scoring, prompts, and protected APIs are not exposed
- `security.txt` points to the current Connect path
- `llms.txt` uses current buyer language and does not revive retired public labels
- cache and content-type headers still match the production guide

After fixing, run route validation and production smoke before closing the incident.

## Recovery path

Use the smallest safe fix:

1. Revert the bad commit when the cause is clear.
2. Patch the narrow failing surface when a revert is riskier.
3. Keep the homepage focused on Free Scan.
4. Keep canonical routes intact.
5. Keep old public labels out of active public surfaces.
6. Keep strict redirect verification, Free Scan API `OPTIONS`, protected Free Scan API read behavior, and no-fake-submission smoke discipline intact.
7. Re-run CI.
8. Redeploy.
9. Run the production smoke check.

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
- Confirm strict legacy redirects still return redirect status and `Location` before following.
- Confirm Free Scan API `OPTIONS` returns `204` with `Allow: GET,POST,OPTIONS`.
- Confirm protected Free Scan API read behavior remains closed by default.
- Confirm discovery and trust files stay current without exposing private surfaces.
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
- fake Free Scan submissions during smoke checks
- open production intake reads
- final-destination-only redirect validation
