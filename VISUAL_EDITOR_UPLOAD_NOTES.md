# Visual Editor Upload Notes

This package is a full Next.js 15 / React 19 / TypeScript codebase.

## Best path

If your visual editor supports a full code project or repository import, use this package as the source project.

## Important boundary

Most visual editors do **not** import a full Next.js application zip directly into their no-code layer 1:1.
If your editor is mainly a visual page builder, the safer path is:

1. create or open the code project workspace
2. upload or sync this repository there
3. let the visual editor read the codebase from the project

## If the editor accepts direct code uploads

Use the included zip as the project upload source.

## If the editor only accepts page-by-page code

Use the repo as the source of truth and paste/replace files from:

- `src/app/`
- `src/components/`
- `src/layout/`
- `src/lib/`

## Canonical system names locked in

- Cendorq
- Search Presence Scan
- Visibility Blueprint
- Presence Infrastructure
- Presence Command
