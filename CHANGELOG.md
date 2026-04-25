# Changelog

All meaningful Cendorq production changes should be recorded here.

Keep entries short, buyer-focused, and production-aware. Avoid internal jargon.

## Unreleased

Use this section for changes that have merged but are not yet included in a named release note.

### Added

- Release history baseline.
- Copy quality checklist for public page copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes.
- Privacy and data handling checklist for public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, and integration changes.
- Accessibility checklist for buyer-path, public page, layout, copy, component, and navigation changes.
- Performance checklist for buyer-path, public page, layout, component, asset, animation, and script changes.
- Search discovery checklist for metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, and public trust surface changes.
- Dependency checklist for package updates, lockfile changes, GitHub Actions updates, runtime pins, dependency automation, and tooling changes.

### Changed

- Added a PR template release-history gate so meaningful production, buyer-path, trust-file, workflow, release, incident, or validation changes explicitly consider `CHANGELOG.md` before merge.
- Added a PR template copy quality gate so public copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes explicitly consider `docs/copy-quality-checklist.md` before merge.
- Added a PR template privacy and data handling gate so public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, and integration changes explicitly consider `docs/privacy-data-checklist.md` before merge.
- Added a PR template accessibility gate so public UI and buyer-path usability changes explicitly consider `docs/accessibility-checklist.md` before merge.
- Added a PR template performance gate so public UI, asset, script, animation, and buyer-path performance changes explicitly consider `docs/performance-checklist.md` before merge.
- Added a PR template search discovery gate so metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, and public trust surface changes explicitly consider `docs/search-discovery-checklist.md` before merge.
- Added a PR template dependency gate so package, lockfile, GitHub Actions, runtime pin, dependency automation, and tooling changes explicitly consider `docs/dependency-checklist.md` before merge.

### Fixed

- No production fixes in this entry.

### Security

- No security-sensitive behavior changes in this entry.

## Release note format

For future release notes, include:

- what changed
- why it changed
- buyer-path impact
- production-safety impact
- copy-quality impact when public language, CTAs, headings, metadata, trust messaging, or plan descriptions changed
- privacy/data impact when forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integrations changed
- dependency impact when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling changed
- search-discovery impact when metadata, crawler files, canonical routes, redirects, or trust surfaces changed
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
