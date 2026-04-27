# Command Center File Storage Readiness

This checklist protects the future File Vault before screenshots, PDFs, report exports, evidence files, client uploads, and before-after assets are stored.

## Principle

Files are private operational assets. File metadata belongs in Cendorq. File contents belong in private object storage with server-side access control.

## Required server-only configuration

Required server-only configuration:

- `FILE_STORAGE_PROVIDER`
- `FILE_STORAGE_SERVER_TOKEN`

Do not expose file storage values in public output, client code, docs, logs, screenshots, or readiness responses.

## Provider direction

Acceptable starting providers:

- Vercel Blob
- Cloudflare R2
- S3-compatible storage

The provider stores objects. Cendorq owns:

- file ownership
- linked business, report, project, task, evidence, or monthly cycle records
- audit history
- download authorization
- retention and export tracking

## Required capabilities

Before enabling uploads, file storage must support:

- server-side upload authorization
- private object storage
- file owner tracking
- signed download flow
- audit trail
- no public file listing

## Before wiring uploads

Confirm:

- `command_center_files` exists
- `evidence_records` exists
- `backup_exports` exists
- access control foundation exists
- data governance foundation exists
- readiness endpoint remains protected
- production smoke still protects Command Center routes

## After wiring uploads

Confirm:

- unauthorized users cannot upload files
- unauthorized users cannot list files
- unauthorized users cannot download files
- file metadata is linked to an owner record
- object keys are not treated as public URLs
- downloads are checked server-side
- audit events record sensitive file operations

## Non-negotiables

- No public file bucket.
- No public file listing.
- No raw storage token exposure.
- No client-only file authorization.
- No direct public object URLs for private files.
- No file content in public routes.
- No weakening validation to make uploads pass.
