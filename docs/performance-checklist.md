# Cendorq Performance Checklist

Use this checklist for buyer-path, public page, layout, component, asset, animation, and script changes.

The goal is simple: keep Cendorq fast, lightweight, mobile-safe, and easy to act on.

## Performance principle

Performance supports conversion. If a visitor waits, hesitates, or loses trust because the page feels heavy, the buyer path is weakened.

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

- The page still loads quickly on mobile.
- Critical copy and CTAs appear without unnecessary delay.
- No unnecessary client-side JavaScript was added.
- No heavy dependency was added without a clear need.
- Images are sized appropriately and not larger than necessary.
- Icons and decorative visuals stay lightweight.
- Animations do not block understanding or action.
- Third-party scripts are avoided unless clearly necessary.
- Fonts, assets, and metadata do not create avoidable weight.
- New components do not introduce layout shift.
- Contact Us uses a lightweight direct email link to `support@cendorq.com` unless a real tested send pipeline exists.
- No untested public message box adds unnecessary JavaScript, network behavior, or fake success states.
- The homepage remains focused and not visually overloaded.

## Buyer-path checks

For the homepage and main public path, confirm:

- The Free Scan action remains fast to find and fast to use.
- Plans remain easy to scan without dense comparison clutter.
- Deep Review, Build Fix, and Ongoing Control sections stay clear and lightweight.
- FAQ remains easy to reach without slowing the path.
- Contact Us remains easy to reach for fit, scope, timing, or account help.
- Contact Us is served by `/connect` while customer-facing labels say Contact Us.
- No slow-loading decorative element competes with the primary action.

## Mobile checks

On small screens, confirm:

- No horizontal scrolling is introduced.
- Important content appears in a sensible order.
- CTAs remain visible and tappable.
- Cards and sections do not feel crowded.
- Contact Us email text is readable, tappable, and not clipped.
- The page can be understood without waiting for animation.

## Asset checks

When adding or changing assets:

- Use the smallest practical image size.
- Prefer modern image formats when appropriate.
- Avoid unnecessary video or large background media.
- Do not add unused assets.
- Keep public trust and crawler files lightweight.

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

Do not use performance work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- unsupported guarantees
- untested public message boxes
- technical language that reduces buyer clarity
