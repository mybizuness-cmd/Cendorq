# Changelog

All meaningful Cendorq production changes should be recorded here.

Keep entries short, buyer-focused, and production-aware. Avoid internal jargon.

## Unreleased

Use this section for changes that have merged but are not yet included in a named release note.

### Added

- Release history baseline.
- Accessibility checklist for buyer-path, public page, layout, copy, component, and navigation changes.
- Performance checklist for buyer-path, public page, layout, component, asset, animation, and script changes.

### Changed

- Added a PR template release-history gate so meaningful production, buyer-path, trust-file, workflow, release, incident, or validation changes explicitly consider `CHANGELOG.md` before merge.
- Added a PR template accessibility gate so public UI and buyer-path usability changes explicitly consider `docs/accessibility-checklist.md` before merge.
- Added a PR template performance gate so public UI, asset, script, animation, and buyer-path performance changes explicitly consider `docs/performance-checklist.md` before merge.

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
