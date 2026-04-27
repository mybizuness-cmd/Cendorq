export type CommandCenterAccessState = {
  allowed: boolean;
  mode: "closed" | "preview";
};

const PREVIEW_HEADER = "x-cendorq-command-center-preview";

export function commandCenterPreviewHeaderName() {
  return PREVIEW_HEADER;
}

export function resolveCommandCenterAccessState(headerValue: string | null): CommandCenterAccessState {
  const configuredPreviewKey = process.env.COMMAND_CENTER_PREVIEW_KEY?.trim();
  if (!configuredPreviewKey) return { allowed: false, mode: "closed" };
  if (!headerValue) return { allowed: false, mode: "closed" };
  if (headerValue !== configuredPreviewKey) return { allowed: false, mode: "closed" };
  return { allowed: true, mode: "preview" };
}
