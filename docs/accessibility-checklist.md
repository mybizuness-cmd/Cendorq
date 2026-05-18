# Cendorq Accessibility Checklist

Use this checklist for buyer-path, public page, layout, copy, component, and navigation changes.

The goal is simple: keep Cendorq easy to read, easy to use, and easy to choose for every serious buyer.

## Accessibility principle

Accessibility supports conversion. If a visitor cannot read, navigate, understand, or act, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. FAQ
7. Contact Us

## Required checks

Before merging public UI or buyer-path changes, confirm:

- Text is readable on mobile and desktop.
- Important content is not hidden behind hover-only behavior.
- Interactive elements are reachable by keyboard.
- Focus states are visible.
- Buttons and links have clear accessible names.
- Link text makes sense out of context.
- Contact Us link text points to `/connect` and says Contact Us for customers.
- Contact Us email link clearly exposes `support@cendorq.com` and is keyboard reachable.
- No untested message-box UI appears as a working support form.
- Headings follow a logical structure.
- Form fields have labels or accessible names.
- Error states are clear and not color-only.
- Color contrast is strong enough for key text and controls.
- Tap targets are comfortable on mobile.
- Motion is not required to understand the page.
- Images and icons that carry meaning have useful alternative text or accessible labels.
- Decorative visuals do not create noise for assistive technology.

## Buyer-path checks

For the homepage and main public path, confirm:

- The primary action remains easy to find.
- The Free Scan path is clear without relying on color alone.
- Plans are understandable without dense comparison clutter.
- Deep Review, Build Fix, and Ongoing Control are distinguishable by meaning, not only by layout.
- FAQ is easy to reach for quick buyer answers.
- Contact Us remains easy to reach for fit, scope, timing, or account help.
- Contact Us does not visually replace Free Scan when the buyer is unsure.

## Copy checks

Public copy should be:

- plain
- direct
- readable
- scannable
- free of unnecessary jargon

Avoid long blocks that make the page harder to scan.

## Mobile checks

On small screens, confirm:

- CTAs remain visible and usable.
- Navigation does not trap the user.
- Content order still makes sense.
- No horizontal scrolling is introduced.
- Important cards, sections, and forms remain readable.
- Contact Us email text is readable, tappable, and not clipped.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting UI changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Non-goals

Do not use accessibility work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- unsupported guarantees
- untested public message boxes
- technical language that reduces buyer clarity
