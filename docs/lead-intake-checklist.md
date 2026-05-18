# Cendorq Lead Intake Checklist

Use this checklist for Free Scan, Contact Us, form, field, validation, success state, error state, routing, and buyer handoff changes.

The goal is simple: make it easy for the right buyer to ask for help without confusion, friction, or data risk.

## Lead intake principle

Lead intake supports conversion and trust. If a form is unclear, asks for too much, fails silently, or leaves the buyer unsure what happens next, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. FAQ
7. Contact Us

## Required checks

Before merging intake or form changes, confirm:

- The form has a clear purpose.
- The requested fields are minimal and useful.
- Required fields are truly required.
- Labels are clear without placeholder-only meaning.
- The submit action matches what happens next.
- Success states tell the buyer what to expect.
- Error states are plain, helpful, and recoverable.
- Validation does not feel hostile or overly technical.
- The form does not collect sensitive information unnecessarily.
- The Free Scan remains the safest first step for unsure buyers.
- Contact Us remains easy to reach for buyers who need fit, scope, timing, or account help.
- Contact Us is served by `/connect` while customer-facing labels say Contact Us.
- Contact Us uses direct email to `support@cendorq.com` unless a real tested send pipeline exists.
- No untested public message box appears as a working support form.
- No form behavior adds dashboard, route-console, or internal-tool feel.

## Field checks

For field changes, confirm:

- Each field has a clear reason to exist.
- Field names are buyer-friendly.
- Optional fields are clearly optional.
- Required fields do not create unnecessary friction.
- Field order matches how a buyer thinks.
- If a future Contact Us form is added, it must collect a reply email and business name before submission.

## Validation checks

For validation changes, confirm:

- Errors explain what needs to change.
- Errors are visible near the affected field when possible.
- Keyboard users can recover from errors.
- Mobile users can complete the form without layout issues.
- Validation does not expose internals or private system details.

## Success and handoff checks

After submit, confirm:

- The buyer sees a clear next step.
- The success message does not overpromise.
- Any follow-up timing is realistic and supportable.
- The handoff path is understandable.
- The buyer is not left on a dead end.
- A future Contact Us form must not show success unless the message was sent to `support@cendorq.com`.

## Privacy checks

For intake changes, confirm:

- No secrets, tokens, private keys, or credentials are exposed.
- Submitted information is not logged unnecessarily.
- Error messages do not reveal internals.
- Example data does not include private customer information.
- Contact Us should ask customers to email from the address where they want the reply until a real form pipeline exists.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting intake changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Non-goals

Do not use lead intake work as a reason to add:

- unnecessary fields
- hidden tracking
- untested public message boxes
- homepage clutter
- competing CTAs
- unsupported guarantees
- technical language that reduces buyer clarity
