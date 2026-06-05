# Cendorq Strategic Research Batch 39: Report Rendering

Cendorq needs one approved report package with multiple render targets.

## Render targets

- Dashboard Report View;
- PDF Report Document;
- Email Summary;
- Report Vault Card;
- Delivery History Row;
- Support Context Summary;
- Operator Release View.

## Shared requirements

Each renderer must preserve:

- report type;
- business identity;
- plan depth;
- Presence Score;
- Choice Gap;
- Repair Priorities;
- evidence confidence;
- limitations;
- recommended next command.

## Renderer differences

- dashboard is interactive and CTA-ready;
- PDF is paginated and executive-ready;
- email is concise and action-oriented;
- vault is historical and access-controlled;
- operator view includes internal status and release state.

## Agent instruction

- The Report Designer chooses modules by artifact target.
- The Delivery Agent sends or stores the rendered artifact only after release approval.
- Dashboard, PDF, and email must share the same approved source package.
- A difference in wording is acceptable only if the meaning, score, findings, limitation, and next command remain consistent.

## Final command

Rendering discipline prevents inconsistent customer experiences. Cendorq reports must feel tailored to each surface while staying synchronized to one approved truth package.