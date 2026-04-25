import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type HealthPayload = {
  ok: true;
  service: "cendorq-platform";
  status: "healthy";
  environment: string;
  commit: string;
  timestamp: string;
};

export function GET() {
  const payload: HealthPayload = {
    ok: true,
    service: "cendorq-platform",
    status: "healthy",
    environment: safeValue(process.env.VERCEL_ENV || process.env.NODE_ENV, "unknown"),
    commit: safeValue(process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA, "unknown"),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    },
  });
}

function safeValue(value: string | undefined, fallback: string) {
  const cleaned = (value || "").trim();
  return cleaned ? cleaned.slice(0, 80) : fallback;
}
