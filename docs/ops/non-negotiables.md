# Cendorq Non-Negotiables

## Business

- Free Scan first for new visitors.
- No blank dashboard accounts.
- No fake signup path that does not capture business information.
- No customer-facing create-workspace language.
- No customer-facing system/backend language.
- Paid path is Review, Repair, Control.
- Dashboard shows one best next action, not clutter.

## Access

- Known customers can return through secure email access.
- Unknown emails go to Free Scan.
- Provider buttons stay hidden until real provider callback runtime is production-ready.
- Verified provider email must pass Cendorq customer eligibility before session issuance.
- Same-email recovery copy must stay small and helpful.
- Authentication is not authorization.

## Security

- No session authority in localStorage, sessionStorage, URLs, analytics, emails, HTML, or public JavaScript.
- No raw provider tokens or raw provider payloads in customer-facing records.
- No account-existence leakage.
- No cross-customer data exposure.
- Protected APIs require server-validated session, ownership, and safe failure posture.

## Build operation

- Work in batches.
- Keep user updates short.
- Check Vercel after commits.
- Do not move to the next implementation batch while deployment is failing.
- Use validators to lock every product rule.
- Prefer repo-owned docs over chat memory.
