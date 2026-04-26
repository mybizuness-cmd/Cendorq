# Changelog

All meaningful Cendorq production changes should be recorded here.

Keep entries short, buyer-focused, and production-aware. Avoid internal jargon.

## Unreleased

Use this section for changes that have merged but are not yet included in a named release note.

### Added

- Release history baseline.
- AI-agent handoff guide for ChatGPT-to-ChatGPT continuation, future AI-agent sessions, master handoff instructions, backend handoff summaries, next-session prompts, and project continuity.
- Final hardening sweep guide for three independent deep analyses and five independent hardening passes before major readiness, launch-adjacent, backend-prep, or production milestone changes.
- Backend handoff checklist for backend ZIP files, API routes, databases, services, background jobs, authentication, payments, AI services, email, CRM, storage, webhooks, and server-side integrations.
- Manual QA and acceptance checklist for final human review, browser checks, mobile checks, buyer-path walkthroughs, acceptance criteria, regression risk, visual review, copy review, and post-change signoff.
- Content freshness checklist for public copy freshness, dated claims, screenshots, examples, plan language, route references, release notes, public labels, and outdated buyer-path assumptions.
- Configuration safety checklist for environment variables, public and private configuration, runtime defaults, local templates, deployment values, feature flags, config naming, config drift, and production safety changes.
- Integration readiness checklist for third-party services, API handoffs, payment providers, AI services, email or CRM handoffs, webhooks, external scripts, service keys, integration failures, and production-support expectations.
- Analytics and tracking checklist for analytics scripts, tracking pixels, event names, attribution, conversion measurement, privacy-sensitive telemetry, consent-sensitive changes, and buyer-path reporting.
- Policy and legal surface checklist for public policy pages, terms language, privacy language, security contact surfaces, disclaimers, compliance-sensitive copy, data-use statements, and legal-adjacent public content.
- Trust and credibility checklist for public trust claims, proof points, testimonials, guarantees, security mentions, credibility language, authority statements, and confidence-building content.
- Route and link integrity checklist for navigation, internal links, buttons, anchors, redirects, canonical routes, 404 behavior, sitemap links, crawler-facing routes, and buyer-path connection changes.
- Offer integrity checklist for Plans, Deep Review, Build Fix, Ongoing Control, pricing, scope, guarantee, package, comparison, and offer-positioning changes.
- Lead intake checklist for Free Scan, Connect, form, field, validation, success state, error state, routing, and buyer handoff changes.
- Conversion quality checklist for homepage, public buyer-path, CTA, plan, trust cue, layout hierarchy, friction reduction, and offer-positioning changes.
- Visual quality checklist for public layout, spacing, hierarchy, responsive behavior, card density, trust cues, visual polish, and premium-feel changes.
- Copy quality checklist for public page copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes.
- Privacy and data handling checklist for public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, and integration changes.
- Accessibility checklist for buyer-path, public page, layout, copy, component, and navigation changes.
- Performance checklist for buyer-path, public page, layout, component, asset, animation, and script changes.
- Search discovery checklist for metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, and public trust surface changes.
- Dependency checklist for package updates, lockfile changes, GitHub Actions updates, runtime pins, dependency automation, and tooling changes.
- Deployment environment checklist for hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, and deployment configuration changes.
- Observability and diagnostics checklist for health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, and operational visibility changes.
- Redirect smoke checks for legacy public routes so production verification confirms old URLs resolve into the current buyer path.
- Closed intelligence operating standard for closed-by-default database posture, protected reports, public/private boundary, evidence-gated AI agents, private operating intelligence, and no direct database exposure.
- Data quality governance standard for source-aware, confidence-scored, freshness-aware, evidence-linked, self-reported, externally observed, AI-generated, and human-reviewed data.
- Learning memory standard for raw, exploration, operational, authority, rejected, outcome-linked, and no-downtime learning memory.
- Pure signal authority standard for source quality, evidence strength, freshness, independence, consistency, context completeness, manipulation risk, privacy class, outcome linkage, authority eligibility, promotion, and demotion.
- Adaptive signal evolution standard for versioned pure-signal definitions, drift detection, candidate rules, safe experiments, backtesting, foresight watchlists, promotion guardrails, demotion, and reversible evolution.
- Resilience and continuity standard for safe degradation, backups, vendor-risk awareness, recovery, rollback, abuse handling, legal/privacy shifts, long-horizon survival, and continuity.

### Changed

- Hardened legacy public-route governance so `/diagnosis`, `/profile`, `/faq`, `/how-it-works`, old pricing paths, and old shorthand routes redirect into the current buyer path instead of remaining discoverable as active routes.
- Kept sitemap and robots discovery surfaces focused on current buyer-path routes and current policy/trust pages rather than redirected legacy routes.
- Expanded route validation to protect legacy public-route governance, redirect smoke checks, sitemap exclusions, and robots allowlist exclusions.
- Updated README, production guide, release checklist, route/link checklist, and search discovery checklist with the current legacy public-route policy.
- Added a compact PR template checklist-gate section so the full readiness system is easier to scan and maintain.
- Added a PR template AI-agent handoff gate so ChatGPT-to-ChatGPT continuation, future AI-agent sessions, master handoff instructions, backend handoff summaries, next-session prompts, and project continuity explicitly consider `docs/ai-agent-handoff.md` before merge.
- Added a PR template final hardening gate so major readiness, launch-adjacent, broad hardening, backend-prep, and production milestone changes explicitly consider `docs/final-hardening-sweep.md` before merge.
- Added a PR template backend handoff gate so backend ZIPs, API routes, databases, services, jobs, authentication, payments, AI services, email, CRM, storage, webhooks, and server-side integrations explicitly consider `docs/backend-handoff-checklist.md` before merge.
- Added a PR template manual QA and acceptance gate so final human review, browser checks, mobile checks, buyer-path walkthroughs, acceptance criteria, regression risk, visual review, copy review, and post-change signoff explicitly consider `docs/manual-qa-acceptance-checklist.md` before merge.
- Added a PR template content freshness gate so public copy freshness, dated claims, screenshots, examples, plan language, route references, release notes, public labels, and outdated buyer-path assumptions explicitly consider `docs/content-freshness-checklist.md` before merge.
- Added a PR template configuration safety gate so environment variables, public and private configuration, runtime defaults, local templates, deployment values, feature flags, config naming, config drift, and production safety changes explicitly consider `docs/configuration-safety-checklist.md` before merge.
- Added a PR template integration readiness gate so third-party services, API handoffs, payment providers, AI services, email or CRM handoffs, webhooks, external scripts, service keys, integration failures, and production-support expectations explicitly consider `docs/integration-readiness-checklist.md` before merge.
- Added a PR template analytics and tracking gate so analytics scripts, tracking pixels, event names, attribution, conversion measurement, privacy-sensitive telemetry, consent-sensitive changes, and buyer-path reporting explicitly consider `docs/analytics-tracking-checklist.md` before merge.
- Added a PR template policy and legal surface gate so public policy pages, terms language, privacy language, security contact surfaces, disclaimers, compliance-sensitive copy, data-use statements, and legal-adjacent public content explicitly consider `docs/policy-legal-surface-checklist.md` before merge.
- Added a PR template trust and credibility gate so public trust claims, proof points, testimonials, guarantees, security mentions, credibility language, authority statements, and confidence-building content explicitly consider `docs/trust-credibility-checklist.md` before merge.
- Added a PR template route and link integrity gate so navigation, internal links, buttons, anchors, redirects, canonical routes, 404 behavior, sitemap links, crawler-facing routes, and buyer-path connection changes explicitly consider `docs/route-link-integrity-checklist.md` before merge.
- Added a PR template offer integrity gate so Plans, Deep Review, Build Fix, Ongoing Control, pricing, scope, guarantee, package, comparison, and offer-positioning changes explicitly consider `docs/offer-integrity-checklist.md` before merge.
- Added a PR template lead intake gate so Free Scan, Connect, form, field, validation, success state, error state, routing, and buyer handoff changes explicitly consider `docs/lead-intake-checklist.md` before merge.
- Added a PR template conversion quality gate so homepage, buyer-path, CTA, plan, trust cue, hierarchy, friction, and offer-positioning changes explicitly consider `docs/conversion-quality-checklist.md` before merge.
- Added a PR template visual quality gate so public layout, spacing, hierarchy, responsive behavior, card density, trust cues, visual polish, and premium-feel changes explicitly consider `docs/visual-quality-checklist.md` before merge.
- Added a PR template copy quality gate so public copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes explicitly consider `docs/copy-quality-checklist.md` before merge.
- Added a PR template privacy and data handling gate so public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, and integration changes explicitly consider `docs/privacy-data-checklist.md` before merge.
- Added a PR template accessibility gate so public UI and buyer-path usability changes explicitly consider `docs/accessibility-checklist.md` before merge.
- Added a PR template performance gate so public UI, asset, script, animation, and buyer-path performance changes explicitly consider `docs/performance-checklist.md` before merge.
- Added a PR template search discovery gate so metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, and public trust surface changes explicitly consider `docs/search-discovery-checklist.md` before merge.
- Added a PR template dependency gate so package, lockfile, GitHub Actions, runtime pin, dependency automation, and tooling changes explicitly consider `docs/dependency-checklist.md` before merge.
- Added a PR template deployment environment gate so hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, and deployment configuration changes explicitly consider `docs/deployment-environment-checklist.md` before merge.
- Added a PR template observability and diagnostics gate so health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, and operational visibility changes explicitly consider `docs/observability-diagnostics-checklist.md` before merge.
- Expanded `pnpm validate:routes` to also enforce closed intelligence, data quality, learning memory, pure signal authority, adaptive signal evolution, resilience, and private operating intelligence standards.
- Synced README, SECURITY, release checklist, and PR template with the full intelligence standards so future changes must account for data quality, learning memory, pure signals, adaptive evolution, resilience, reports, evidence, and closed database posture.

### Fixed

- Fixed stale public-route exposure by moving additional legacy URLs into explicit redirects and by preventing legacy routes from being promoted by discovery surfaces.

### Security

- No secret, credential, private runtime value, or private buyer-data behavior changes.
- Added governance and validation protections for closed intelligence, no direct database exposure, protected reports, evidence-gated AI agents, data-quality controls, pure-signal promotion, adaptive signal evolution, and resilience/continuity expectations.

## Release note format

For future release notes, include:

- what changed
- why it changed
- buyer-path impact
- production-safety impact
- closed-intelligence impact when private scoring, reports, evidence, AI-agent prompts, database access, or public/private boundaries changed
- data-quality impact when source labels, confidence, freshness, evidence, self-reported data, externally observed data, AI-generated data, or human-reviewed data changed
- learning-memory impact when raw, exploration, operational, authority, rejected, outcome-linked, or no-downtime learning memory changed
- pure-signal impact when source quality, evidence strength, freshness, independence, consistency, context completeness, manipulation risk, privacy class, outcome linkage, authority eligibility, promotion, or demotion changed
- adaptive-evolution impact when pure-signal definitions, signal versions, drift detection, candidate rules, safe experiments, backtesting, foresight watchlists, promotion guardrails, demotion, rollback, or reversible evolution changed
- resilience impact when safe degradation, backups, vendor-risk awareness, recovery, rollback, downtime, platform shifts, abuse handling, legal/privacy shifts, long-horizon survival, or continuity changed
- AI-agent-handoff impact when ChatGPT-to-ChatGPT continuation, future AI-agent sessions, master handoff instructions, backend handoff summaries, next-session prompts, or project continuity changed
- final-hardening impact when major readiness, launch-adjacent, broad hardening, backend-prep, or production milestone work changed
- backend-handoff impact when backend ZIPs, API routes, databases, services, jobs, authentication, payments, AI services, email, CRM, storage, webhooks, or server-side integrations changed
- manual-QA impact when final human review, browser checks, mobile checks, buyer-path walkthroughs, acceptance criteria, regression risk, visual review, copy review, or post-change signoff changed
- content-freshness impact when public copy freshness, dated claims, screenshots, examples, plan language, route references, release notes, public labels, or buyer-path assumptions changed
- configuration-safety impact when environment variables, public/private configuration, runtime defaults, local templates, deployment values, feature flags, config naming, config drift, or production safety changed
- integration-readiness impact when third-party services, API handoffs, payment providers, AI services, email or CRM handoffs, webhooks, external scripts, service keys, integration failures, or production-support expectations changed
- analytics/tracking impact when analytics scripts, tracking pixels, event names, attribution, conversion measurement, privacy-sensitive telemetry, consent-sensitive changes, or buyer-path reporting changed
- policy/legal impact when policy pages, terms, privacy, security contact surfaces, disclaimers, compliance-sensitive copy, data-use statements, or legal-adjacent public content changed
- trust/credibility impact when public trust claims, proof points, testimonials, guarantees, security mentions, credibility language, authority statements, or confidence-building content changed
- route/link impact when navigation, links, buttons, anchors, redirects, legacy routes, canonical routes, 404 behavior, sitemap links, crawler-facing routes, or buyer-path connections changed
- offer-integrity impact when Plans, Deep Review, Build Fix, Ongoing Control, pricing, scope, guarantee, package, comparison, or offer-positioning changed
- lead-intake impact when Free Scan, Connect, forms, fields, validation, success states, error states, routing, or buyer handoff changed
- conversion-quality impact when homepage, buyer-path, CTA, plan, trust cue, hierarchy, friction, or offer-positioning changed
- visual-quality impact when public layout, spacing, hierarchy, responsive behavior, card density, trust cues, visual polish, or premium feel changed
- copy-quality impact when public language, CTAs, headings, metadata, trust messaging, or plan descriptions changed
- privacy/data impact when forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integrations changed
- dependency impact when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling changed
- deployment-environment impact when hosting, domain, DNS, environment variables, redirects, headers, health, smoke checks, or deployment configuration changed
- observability impact when health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, or operational visibility changed
- search-discovery impact when metadata, crawler files, canonical routes, redirects, legacy routes, or trust surfaces changed
- accessibility impact when public UI changed
- performance impact when public UI, assets, scripts, or component behavior changed
- validation completed
- post-deploy smoke result when applicable

## Required language standard

Use plain buyer language:

- Free Scan
- Plans
- Deep Review
- Build Fix
- Ongoing Control
- Connect

Do not revive old public labels in release notes unless documenting historical context clearly.
