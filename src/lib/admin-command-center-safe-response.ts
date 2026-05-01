import { NextResponse } from "next/server";

export const ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
} as const;

export const ADMIN_COMMAND_CENTER_SAFE_METHODS = ["GET", "OPTIONS"] as const;

export function adminCommandCenterJsonNoStore(payload: unknown, status: number) {
  return NextResponse.json(payload, {
    status,
    headers: ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS,
  });
}

export function adminCommandCenterOptions(projection: string) {
  return adminCommandCenterJsonNoStore({ ok: true, methods: ADMIN_COMMAND_CENTER_SAFE_METHODS, projection }, 200);
}
