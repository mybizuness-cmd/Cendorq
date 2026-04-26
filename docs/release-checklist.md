# Cendorq Release Checklist

Use this checklist before and after production releases.

The goal is simple: ship without weakening the buyer path, public language, trust assets, health checks, crawler files, legacy route behavior, production safety gates, closed intelligence, data quality, pure signal authority, adaptive learning, resilience, maximum protection, foundation hardening, foundation elevation, system synchronization, internal command center boundaries, or score threshold discipline.

For production failures, smoke-check failures, or buyer-path regressions, use [`docs/incident-response.md`](incident-response.md).

For closed intelligence, public/private boundary, report access, private scoring, AI-agent evidence, or direct database exposure changes, use [`docs/closed-intelligence-operating-standard.md`](closed-intelligence-operating-standard.md).

For source-aware, confidence-scored, freshness-aware, externally observed, self-reported, AI-generated, or human-reviewed data changes, use [`docs/data-quality-governance-standard.md`](data-quality-governance-standard.md).

For raw, exploration, operational, authority, rejected, outcome-linked, or long-term memory changes, use [`docs/learning-memory-standard.md`](learning-memory-standard.md).

For pure signal, authority eligibility, confidence, freshness, source quality, evidence strength, manipulation risk, or signal promotion/demotion changes, use [`docs/pure-signal-authority-standard.md`](pure-signal-authority-standard.md).

For evolving pure signal definitions, drift detection, candidate rules, safe experimentation, backtesting, foresight watchlists, or adaptive signal standards, use [`docs/adaptive-signal-evolution-standard.md`](adaptive-signal-evolution-standard.md).

For safe degradation, backups, vendor changes, resilience, continuity, rollback, recovery, downtime, platform shifts, or long-horizon survival changes, use [`docs/resilience-continuity-standard.md`](resilience-continuity-standard.md).

For deny-by-default access, secrets, exfiltration prevention, threat modeling, prompt-injection containment, report protection, evidence protection, emergency controls, or partner isolation changes, use [`docs/maximum-protection-standard.md`](maximum-protection-standard.md).

For base-system protection, validation safety, backend readiness, report readiness, AI-agent readiness, route integrity, and no-regression foundation work, use [`docs/foundation-hardening-standard.md`](foundation-hardening-standard.md).

For improving the foundation beyond baseline stability, conversion clarity, scalability, automation, validation coverage, and long-horizon compounding, use [`docs/foundation-elevation-standard.md`](foundation-elevation-standard.md).

For keeping standards, validation, README, SECURITY, PR gates, release notes, public routes, backend architecture, and AI-agent workflows synchronized, use [`docs/system-synchronization-qa-standard.md`](system-synchronization-qa-standard.md).

For internal control panel, command center, automation command deck, scan automation, Deep Review automation, Build Fix control, Ongoing Control cycles, report center, data-quality board, and smart insight layer changes, use [`docs/internal-command-center-standard.md`](internal-command-center-standard.md).

For score bands, routing thresholds, 65-69 watch-grade, 70-79 operational-grade, 80-89 strong operational-grade, 90-100 authority-grade candidate, alerts, automation levels, or no-clutter public score display changes, use [`docs/score-threshold-operating-standard.md`](score-threshold-operating-standard.md).

For public copy, CTAs, headings, metadata, trust messaging, plan descriptions, or buyer-path language changes, use [`docs/copy-quality-checklist.md`](copy-quality-checklist.md).

For public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integration changes, use [`docs/privacy-data-checklist.md`](privacy-data-checklist.md).

For public UI, layout, copy, component, or navigation changes, use [`docs/accessibility-checklist.md`](accessibility-checklist.md).

For public page, component, asset, animation, or script changes, use [`docs/performance-checklist.md`](performance-checklist.md).

For metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, legacy route handling, or public trust surface changes, use [`docs/search-discovery-checklist.md`](search-discovery-checklist.md).

For route, link, redirect, canonical route, legacy route, navigation, footer, CTA, or 404 changes, use [`docs/route-link-integrity-checklist.md`](route-link-integrity-checklist.md).

For package updates, lockfile changes, GitHub Actions updates, runtime pins, dependency automation, or tooling changes, use [`docs/dependency-checklist.md`](dependency-checklist.md).

For hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, or deployment configuration changes, use [`docs/deployment-environment-checklist.md`](deployment-environment-checklist.md).

For health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, or operational visibility changes, use [`docs/observability-diagnostics-checklist.md`](observability-diagnostics-checklist.md).

Record meaningful production changes in [`CHANGELOG.md`](../CHANGELOG.md).

## Release principle

The homepage has one job:

> Get the right customer to start the Free Scan.

Every release must preserve that focus.

## Operating principle

The public surface sells the outcome. The private system holds the engine.

Every release must preserve:

- closed intelligence
- public/private boundary
- no direct database exposure
- protected reports and evidence
- evidence-gated AI-agent findings
- data quality
- learning memory separation
- pure signal authority
- adaptive signal evolution
- resilience and continuity
- maximum protection
- foundation hardening
- foundation elevation
- system synchronization QA
- internal command center boundaries
- score threshold discipline

## Pre-merge checklist

Before merging a production change:

- Confirm the change has a clear outcome.
- Confirm the buyer path is still simple:
  - Free Scan
  - Plans
  - Deep Review
  - Build Fix
  - Ongoing Control
  - Connect
- Confirm public copy is plain, premium, clear, credible, powerful, and easy to choose.
- Confirm no old public labels were revived in active public surfaces.
- Confirm closed intelligence was checked for private scoring, private reports, AI-agent prompts, client evidence, direct database exposure, public report indexes, or public evidence indexes.
- Confirm data quality was checked for source labels, confidence, freshness, evidence, self-reported data, externally observed data, AI-generated data, and human-reviewed data.
- Confirm learning memory was checked for raw, exploration, operational, authority, and rejected memory boundaries.
- Confirm pure signal authority was checked for source quality, evidence strength, freshness, independence, consistency, context completeness, manipulation risk, privacy class, outcome linkage, and authority eligibility.
- Confirm adaptive signal evolution was checked for versioned standards, drift detection, safe experiments, candidate rules, promotion, demotion, and rollback.
- Confirm resilience was checked for safe degradation, recovery, vendor risk, backup expectations, no-downtime behavior, and platform shifts.
- Confirm maximum protection was checked for deny-by-default access, secrets, exfiltration, threat modeling, prompt-injection containment, report/evidence protection, emergency controls, and partner isolation.
- Confirm foundation hardening was checked for route integrity, validation safety, backend readiness, AI-agent readiness, report readiness, and no-regression base strength.
- Confirm foundation elevation was checked for clarity, conversion, automation, validation coverage, scalability, simplicity, and long-horizon compounding.
- Confirm system synchronization was checked when standards, validation, README, SECURITY, release checklist, PR template, CHANGELOG, public routes, backend architecture, reports, or AI-agent workflows changed.
- Confirm internal command center boundaries were checked when dashboard, console, automation, report center, paid workflow, monthly workflow, data-quality board, or insight-layer changes were involved.
- Confirm score threshold rules were checked when percentages, routing, alerts, automation levels, report labels, public score labels, or authority-grade candidate logic changed.
- Confirm privacy and data handling were checked for public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integration changes.
- Confirm dependency safety was checked for package, lockfile, GitHub Actions, runtime pin, dependency automation, or tooling changes.
- Confirm deployment environment safety was checked for hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, or deployment configuration changes.
- Confirm observability and diagnostics were checked for health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, or operational visibility changes.
- Confirm no secrets, private customer data, private keys, tokens, private prompts, service-role credentials, or report secrets were committed.
- Confirm the homepage does not gain clutter, public dashboard behavior, route-console behavior, or competing CTAs.
- Confirm canonical routes are still the source of truth.
- Confirm legacy public URLs still redirect into the current buyer path.
- Confirm legacy routes are not promoted by sitemap entries or robots allowlists.
- Confirm crawler and trust files still make sense.
- Confirm search discovery was checked for metadata, crawler, canonical route, redirect, sitemap, robots, `llms.txt`, manifest, health, or trust-surface changes.
- Confirm the health endpoint remains lightweight, dynamic, no-store, and noindex.
- Confirm accessibility was checked for public UI and buyer-path changes.
- Confirm performance was checked for public UI, asset, script, animation, and buyer-path changes.
- Confirm `CHANGELOG.md` is updated for meaningful production changes.

Run locally when practical:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

## Merge checklist

Before merging the PR:

- Confirm GitHub CI passed on Node 24.
- Confirm the PR template quality gates are answered.
- Confirm CODEOWNERS review routing is intact.
- Confirm no secrets, private customer data, private keys, tokens, service-role credentials, report secrets, or private prompts were committed.
- Confirm public copy remains plain, direct, buyer-friendly, conversion-focused, and ad-safe.
- Confirm closed intelligence gates were answered for private scoring, data access, reports, evidence, AI-agent prompts, and public/private boundary.
- Confirm data quality and learning gates were answered when data, reports, scores, signals, memory, or AI-agent outputs changed.
- Confirm pure signal and adaptive evolution gates were answered when signal definitions, source weighting, confidence, freshness, promotion, demotion, or authority memory changed.
- Confirm resilience and maximum protection gates were answered when storage, vendors, recovery, downtime, platform shifts, backups, exfiltration risk, secrets, report access, evidence access, or continuity changed.
- Confirm foundation hardening, foundation elevation, and system synchronization gates were answered when standards, validation, docs, routes, backend architecture, frontend foundation, or AI-agent foundation changed.
- Confirm internal command center and score threshold gates were answered when internal dashboard, workflow automation, report center, score bands, routing logic, alerts, or automation thresholds changed.
- Confirm copy quality expectations were considered when public language, CTAs, headings, metadata, trust messaging, or plan descriptions changed.
- Confirm privacy expectations were considered when public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integrations changed.
- Confirm dependency expectations were considered when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling changed.
- Confirm deployment environment expectations were considered when hosting, domain, DNS, environment variables, redirects, headers, health, smoke checks, or deployment configuration changed.
- Confirm observability expectations were considered when health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, or operational visibility changed.
- Confirm route/link expectations were considered when canonical routes, legacy routes, navigation, footer links, CTAs, redirects, or 404 behavior changed.
- Confirm search discovery expectations were considered when metadata, crawler files, canonical routes, redirects, or trust surfaces changed.
- Confirm accessibility expectations were considered when public UI changed.
- Confirm performance expectations were considered when public UI, assets, scripts, or component behavior changed.
- Confirm release history is updated when the change is meaningful.

## Post-deploy checklist

After production deploy:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

or run the **Production Smoke Check** workflow manually from GitHub Actions.

Confirm these production surfaces are healthy:

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

Confirm these legacy public routes resolve into the current buyer path:

- `/pricing`
- `/pricing/full-diagnosis`
- `/pricing/optimization`
- `/pricing/monthly-partner`
- `/contact`
- `/how-it-works`
- `/diagnosis`
- `/profile`
- `/faq`
- `/freecheck`
- `/full-diagnosis`
- `/optimization`
- `/monthly-partner`

## Rollback checklist

If production weakens, breaks, or becomes unclear:

- Stop new risky changes.
- Identify the merge commit that introduced the issue.
- Revert the smallest safe change.
- Redeploy.
- Run the production smoke check.
- Confirm the Free Scan path and canonical routes are restored.
- Confirm legacy route redirects are restored.
- Confirm closed intelligence was not weakened or exposed.
- Confirm private data, reports, evidence, score inputs, and memory were not exposed.
- Confirm data-quality and learning-memory boundaries were not corrupted.
- Confirm maximum protection, foundation hardening, and system synchronization did not drift.
- Open a production safety issue if the failure exposed a missing guard.
- Follow the incident response runbook if impact is active or unclear.

## Scheduled checks

The production smoke workflow runs automatically every day against `https://cendorq.com`.

If a scheduled smoke check fails:

- Treat it as production-sensitive.
- Check whether the issue is site behavior, hosting, network, or workflow-related.
- Fix the smallest safe surface.
- Run the smoke check again after the fix.
- Use the incident response runbook when the failure is reproducible or customer-facing.

## Release notes standard

For meaningful releases, note in `CHANGELOG.md`:

- what changed
- why it changed
- buyer-path impact
- production-safety impact
- closed-intelligence impact when private scoring, reports, evidence, AI-agent prompts, database access, or public/private boundaries changed
- data-quality impact when source labels, confidence, freshness, evidence, or signal classes changed
- learning-memory impact when raw, exploration, operational, authority, rejected, or outcome memory changed
- pure-signal impact when authority eligibility, promotion, demotion, confidence, source quality, evidence strength, or manipulation risk changed
- adaptive-evolution impact when signal standards, drift detection, candidate rules, safe experiments, backtesting, or foresight watchlists changed
- resilience impact when backups, recovery, safe degradation, vendors, rollback, downtime, or continuity changed
- maximum-protection impact when deny-by-default access, secrets, exfiltration, threat model, prompt-injection containment, report protection, evidence protection, emergency controls, or partner isolation changed
- foundation-hardening impact when base architecture, route integrity, validation, backend readiness, report readiness, AI-agent readiness, or no-regression foundation rules changed
- foundation-elevation impact when clarity, conversion, scalability, automation, validation coverage, maintainability, or long-horizon compounding changed
- system-synchronization impact when standards, validation, README, SECURITY, release checklist, PR template, CHANGELOG, public routes, backend architecture, reports, or AI-agent workflows changed
- internal-command-center impact when dashboard, console, automation command deck, scan automation, paid diagnosis, Build Fix, Ongoing Control, report center, data-quality board, or insight layer changed
- score-threshold impact when score bands, routing thresholds, alerts, automation levels, report labels, public score labels, or authority-grade candidates changed
- route/link impact when navigation, canonical routes, redirects, legacy routes, sitemap links, crawler-facing routes, or buyer-path connections changed
- copy-quality impact when public language, CTAs, headings, metadata, trust messaging, or plan descriptions changed
- privacy/data impact when forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integrations changed
- dependency impact when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling changed
- deployment-environment impact when hosting, domain, DNS, environment variables, redirects, headers, health, smoke checks, or deployment configuration changed
- observability impact when health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, or operational visibility changed
- search-discovery impact when metadata, crawler files, canonical routes, redirects, legacy routes, or trust surfaces changed
- accessibility impact when public UI changed
- performance impact when public UI, assets, scripts, or component behavior changed
- validation completed
- post-deploy smoke result

Keep release notes clear and short. Avoid internal jargon.
