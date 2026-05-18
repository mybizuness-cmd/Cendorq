# Mobile access hardening review

Date: 2026-05-17
Branch: next-1017

## Business rule

Cendorq should not push new visitors into a blank account. The main conversion is the Free Scan.

Customer path:

1. Start Free Scan
2. Verify email
3. Open result
4. Choose the right next step
5. Return later with the same email

## Customer-facing copy rule

Use simple language. Avoid internal words like orchestration, posture, workspace theory, protected record, or routing logic.

Preferred language:

- Start with the Free Scan.
- Already have an account?
- Use the same email you used for your Free Scan, form, or plan.
- We could not find a scan or plan for that email. Start the Free Scan first.

## Issues found

1. Free Scan can show scan strength before the customer enters anything. This hurts trust.
2. Signup and login still feel like separate products.
3. Create workspace language distracts from the real business goal.
4. Open dashboard should not appear to anonymous users as a main action.
5. Provider buttons should not show unless provider auth, customer lookup, and session creation are production ready.
6. Some copy is too technical for customers.
7. Mobile needs faster above-the-fold action: Start Free Scan first, account access smaller.

## Fix order

1. Make a clean first Free Scan state show 0% until the customer types.
2. Remove silent stale progress restore or make restored progress explicit.
3. Make signup a Free Scan doorway, not a workspace creation page.
4. Make login one customer access page.
5. Hide provider buttons until fully live.
6. Rewrite copy for customers, not internal operators.
7. Test Free Scan to result to plan recommendation to payment to dashboard.

## Validation checklist

- New mobile visitor sees Start Free Scan first.
- Returning customer sees customer access and same-email helper.
- Unknown email goes to Free Scan.
- Remembered customer opens dashboard automatically.
- Fresh Free Scan shows 0% before entry.
- Submit failure keeps typed answers.
- Result page recommends the correct next step.
- Plan pages clearly separate Free Scan, AI Readiness Review, Signal Repair, and Readiness Control.
- No ranking, AI placement, lead, or revenue guarantees.
