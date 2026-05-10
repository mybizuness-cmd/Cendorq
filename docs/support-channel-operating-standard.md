# Support Channel Operating Standard

Cendorq support should feel calm, fast, accurate, and connected. Support is not only a help inbox. It is part of trust, retention, recovery, billing clarity, report confidence, lifecycle value, customer safety, and reputation protection.

## Core rule

Every support channel must route the customer to the right source of truth: dashboard, report vault, billing center, support status, support request, verified customer message, provider-authoritative billing record, or qualified escalation path.

## Support channel map

Recommended owner-controlled addresses:

- `support@cendorq.com` for general customer help
- `billing@cendorq.com` for payment, invoice, receipt, refund, and subscription questions
- `reports@cendorq.com` for report access, report correction, report readiness, and vault questions
- `security@cendorq.com` for responsible security concerns and suspicious activity reports
- `partners@cendorq.com` for referral, article, sponsorship, and partner inquiries
- `legal@cendorq.com` or counsel-managed address for formal legal notices when ready

These aliases should route into an approved inbox, help desk, or ticketing system instead of unmanaged personal inboxes.

## Dashboard-first support

The dashboard remains the preferred customer recovery path.

Rules:

- important support status should be visible from the dashboard where applicable
- support email should link customers back to the verified support status or support center
- customers should not have to search old email threads to know what is happening
- support should not request passwords, card numbers, private keys, provider secrets, verification codes, unrelated sensitive material, or raw private platform access
- support should use safe summaries and request only what is needed to resolve the issue
- every important support email should have a matching dashboard message or support-status update when the issue affects access, billing, reports, delivery, or next action

## Billing support

Billing questions should point to provider-authoritative state and the billing center.

Rules:

- do not ask customers to send card numbers by email or support form
- receipts, invoices, payment status, plan state, and subscription status should remain provider-authoritative or billing-center-confirmed
- billing support should explain the current state, next step, and recovery route
- billing PDFs should be provider-authoritative or billing-center-confirmed and should never expose raw provider payloads
- refund, cancellation, chargeback, and subscription issues require careful review and should not be handled by unsupported AI-only replies

## Report support

Report questions should route through the report vault first.

Rules:

- released reports should be recoverable from verified dashboard access
- PDFs may mirror released report state but should not become the only source of truth
- report correction requests should preserve evidence, customer context, confidence, and review state
- report support should not expose raw evidence dumps, private prompts, exact scoring weights, internal review notes, or cross-customer examples
- correction, dispute, and high-risk report questions should be reviewed before final customer response

## Security and abuse support

Security-related support must be handled calmly and conservatively.

Rules:

- suspicious emails, links, attachments, files, URLs, screenshots, and PDFs should be treated as untrusted until reviewed
- customers should be told not to send passwords, card numbers, private keys, admin credentials, provider secrets, or verification codes
- security reports should route to `security@cendorq.com` or the approved security workflow
- support should preserve relevant metadata without exposing it in public or customer-facing surfaces
- account access issues should prefer verified dashboard, verified email, and safe recovery paths
- malware, phishing, impersonation, spoofing, account-takeover, and payment-fraud issues should be escalated

## AI-assisted support posture

AI can help support become faster, but it must not become careless.

Rules:

- AI may help draft, classify, summarize, and route support work
- human review is needed for sensitive billing, security, legal, cancellation, correction, refund, account access, abuse, or high-risk report issues
- AI outputs must stay grounded in customer-safe records
- AI should not invent status, promise outcomes, expose private mechanics, or provide legal/security guarantees
- support should be transparent, accurate, empathetic, and specific

## Response quality

Every response should include:

1. acknowledgement of the customer issue
2. current known status
3. safest next action
4. where to check status again
5. what not to send if sensitive data is involved

## Owner setup checklist

- create required email aliases
- connect aliases to the approved help desk or inbox
- confirm SPF, DKIM, and DMARC posture for the domain
- create support categories and routing rules
- connect billing questions to billing-center/provider state
- connect report questions to report-vault state
- connect dashboard messages to important email updates
- define escalation paths for billing, reports, security, legal, urgent customer issues, account access, abuse, suspicious attachments, payment disputes, and high-risk corrections
- review support patterns monthly for product, dashboard, lifecycle, documentation, security, and conversion improvements

## Final rule

Support should reduce anxiety, prove the system is alive, and move the customer to resolution without exposing sensitive data, creating duplicate confusion, or weakening the verified dashboard/report-vault/billing-center source of truth.
