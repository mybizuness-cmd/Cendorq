const PREVIEW_HEADER = "x-cendorq-command-center-preview";
const MINIMUM_PREVIEW_KEY_LENGTH = 32;

export type CommandCenterAccessState = {
  allowed: boolean;
  mode: "closed" | "preview";
};

export type CommandCenterAccessPolicy = {
  defaultMode: "closed";
  previewHeaderName: typeof PREVIEW_HEADER;
  requiredSecretEnvName: "COMMAND_CENTER_PREVIEW_KEY";
  minimumPreviewKeyLength: 32;
  comparisonMode: "timing-safe";
  publicAccessAllowed: false;
  clientSideBypassAllowed: false;
};

export function commandCenterPreviewHeaderName() {
  return PREVIEW_HEADER;
}

export function getCommandCenterAccessPolicy(): CommandCenterAccessPolicy {
  return {
    defaultMode: "closed",
    previewHeaderName: PREVIEW_HEADER,
    requiredSecretEnvName: "COMMAND_CENTER_PREVIEW_KEY",
    minimumPreviewKeyLength: MINIMUM_PREVIEW_KEY_LENGTH,
    comparisonMode: "timing-safe",
    publicAccessAllowed: false,
    clientSideBypassAllowed: false,
  };
}

export function resolveCommandCenterAccessState(headerValue: string | null): CommandCenterAccessState {
  const configuredPreviewKey = process.env.COMMAND_CENTER_PREVIEW_KEY?.trim();
  if (!isStrongPreviewKey(configuredPreviewKey)) return { allowed: false, mode: "closed" };
  if (!headerValue) return { allowed: false, mode: "closed" };
  if (!timingSafePreviewKeyEqual(headerValue.trim(), configuredPreviewKey)) return { allowed: false, mode: "closed" };
  return { allowed: true, mode: "preview" };
}

function isStrongPreviewKey(value: string | undefined): value is string {
  return typeof value === "string" && value.length >= MINIMUM_PREVIEW_KEY_LENGTH;
}

function timingSafePreviewKeyEqual(candidate: string, expected: string) {
  if (candidate.length !== expected.length) return false;

  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) {
    mismatch |= candidate.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return mismatch === 0;
}
