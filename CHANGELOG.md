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
- Maximum protection standard for deny-by-default access, secret protection, anti-exfiltration, threat modeling, prompt-injection containment, report/evidence protection, emergency controls, and partner isolation.
- Foundation hardening standard for no-regression base architecture, route integrity, validation safety, backend readiness, report readiness, AI-agent readiness, and protected public/private boundaries.
- Foundation elevation standard for compounding clarity, conversion, scalability, automation, validation coverage, maintainability, simplicity, and long-horizon foundation improvement.
- System synchronization QA standard for keeping standards, validation, README, SECURITY, release checklist, PR template, CHANGELOG, public routes, backend architecture, reports, and AI-agent workflows coordinated.
- Internal command center standard for the private Cendorq control panel, automation command deck, scan automation, Deep Review automation, Build Fix control, Ongoing Control cycles, report center, data-quality board, and smart insight layer.
- Score threshold operating standard for internal score bands, 65-69 watch-grade, 70-79 operational-grade, 80-89 strong operational-grade, 90-100 authority-grade candidate, routing thresholds, alerts, automation levels, and no-clutter public score display.
- Public drift validation for active SEO defaults, share images, report recommendations, signal summaries, intelligence summaries, active header, footer, mobile dock, manifest, and AI-readable public context.

### Changed

- Hardened legacy public-route governance so `/diagnosis`, `/profile`, `/faq`, `/how-it-works`, old pricing paths, and old shorthand routes redirect into the current buyer path instead of remaining discoverable as active routes.
- Kept sitemap and robots discovery surfaces focused on current buyer-path routes and current policy/trust pages rather than redirected legacy routes.
- Expanded route validation to protect legacy public-route governance, redirect smoke checks, sitemap exclusions, robots allowlist exclusions, active public-label drift, SEO defaults, the header shim, and public discovery surfaces.
- Updated README, production guide, release checklist, route/link checklist, and search discovery checklist with the current legacy public-route policy.
- Added a compact PR template checklist-gate section so the full readiness system is easier to scan and maintain.
- Expanded `pnpm validate:routes` to also enforce public drift validation, closed intelligence, data quality, learning memory, pure signal authority, adaptive signal evolution, resilience, maximum protection, foundation hardening, foundation elevation, system synchronization QA, internal command center, score thresholds, and private operating intelligence standards.
- Synced README, SECURITY, release checklist, and PR template with the full operating standards so future changes must account for closed intelligence, data quality, learning memory, pure signals, adaptive evolution, resilience, maximum protection, foundation hardening, foundation elevation, system synchronization, internal command center, score thresholds, reports, evidence, and closed database posture.
- Sharpened homepage, Free Scan, plan positioning, plan sales-page flow, and SEO defaults around current Cendorq language: plain buyer language, clearer conversion path, protected public/private boundary, stronger organic discovery, and no fake guarantees.
- Aligned active header navigation with the current buyer path: Free Scan, Plans, Deep Review, Build Fix, and Connect.
- Replaced the stale legacy header implementation with a current-header shim so there is only one active header language system.
- Removed retired package labels from `llms.txt` so public AI-readable context stays clean while validation enforces retired-label prevention privately.
- Aligned homepage, layout structured metadata, and Free Scan page metadata with the current Free Scan language.
- Expanded public drift and route validation to block retired scan labels in active public surfaces.
- Defaulted normalized Free Scan intake source to `free-check` while preserving explicit legacy source compatibility for older callers.

### Fixed

- Fixed stale public-route exposure by moving additional legacy URLs into explicit redirects and by preventing legacy routes from being promoted by discovery surfaces.
- Corrected plan routing so Ongoing Control points toward the current Connect path instead of legacy contact language.
- Fixed active header drift that still promoted legacy support routes and older scan naming.
- Fixed route validation drift that depended on retired public labels being listed inside `llms.txt`.
- Fixed homepage, layout, and Free Scan metadata drift from retired scan naming to current Free Scan naming.
- Fixed intake-source drift so unknown Free Scan submissions now normalize to the current `free-check` source instead of the retired scan source.

### Security

- No secret, credential, private runtime value, or private buyer-data behavior changes.
- Added governance and validation protections for closed intelligence, no direct database exposure, protected reports, evidence-gated AI agents, data-quality controls, pure-signal promotion, adaptive signal evolution, resilience/continuity, maximum protection, foundation hardening, system synchronization, internal command center boundaries, score-threshold discipline, and public-surface drift prevention.

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
- maximum-protection impact when deny-by-default access, secrets, exfiltration, threat model, prompt-injection containment, report protection, evidence protection, emergency controls, or partner isolation changed
- foundation-hardening impact when base architecture, route integrity, validation, backend readiness, report readiness, AI-agent readiness, or no-regression foundation rules changed
- foundation-elevation impact when clarity, conversion, scalability, automation, validation coverage, maintainability, simplicity, or long-horizon compounding changed
- system-synchronization impact when standards, validation, README, SECURITY, release checklist, PR template, CHANGELOG, public routes, backend architecture, reports, or AI-agent workflows changed
- internal-command-center impact when dashboard, console, automation command deck, scan automation, paid diagnosis, Build Fix, Ongoing Control, report center, data-quality board, or insight layer changed
- score-threshold impact when score bands, routing thresholds, alerts, automation levels, report labels, public score labels, or authority-grade candidates changed
- public-drift impact when active header, footer, mobile dock, metadata, share images, reports, signals, intelligence summaries, manifest, sitemap, robots, or `llms.txt` changed
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
- lead-intake impact when Free Scan, Connect, forms, fields, validation, success states, routing, or buyer handoff changed
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
