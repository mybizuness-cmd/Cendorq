type CendorqEmailSendInput = {
  to: string;
  subject: string;
  preheader: string;
  html: string;
  text: string;
  replyTo?: string;
  tags?: Record<string, string>;
};

type CendorqEmailSendResult =
  | {
      ok: true;
      provider: "resend";
      id: string;
      skipped: false;
    }
  | {
      ok: true;
      provider: "resend";
      id: "email-provider-not-configured";
      skipped: true;
    }
  | {
      ok: false;
      provider: "resend";
      error: string;
      skipped: false;
    };

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Cendorq Support <support@cendorq.com>";
const DEFAULT_REPLY_TO = "support@cendorq.com";
const MAX_SUBJECT_LENGTH = 140;
const MAX_PREHEADER_LENGTH = 220;
const TAG_NAME_LIMIT = 40;
const TAG_VALUE_LIMIT = 80;

export async function sendCendorqEmail(input: CendorqEmailSendInput): Promise<CendorqEmailSendResult> {
  const apiKey = cleanEnv(process.env.RESEND_API_KEY);
  const to = cleanEmail(input.to);
  const subject = cleanSubject(input.subject);
  const preheader = cleanPreheader(input.preheader);
  const html = typeof input.html === "string" ? input.html : "";
  const text = typeof input.text === "string" ? input.text : "";

  if (!apiKey) {
    return { ok: true, provider: "resend", id: "email-provider-not-configured", skipped: true };
  }

  if (!to || !subject || !html || !text) {
    return { ok: false, provider: "resend", error: "Email payload is missing a safe recipient, subject, html, or text body.", skipped: false };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: cleanSender(process.env.EMAIL_FROM) || DEFAULT_FROM,
        to,
        reply_to: cleanEmail(input.replyTo || process.env.EMAIL_REPLY_TO || process.env.SUPPORT_EMAIL) || DEFAULT_REPLY_TO,
        subject,
        html: withHiddenPreheader(preheader, html),
        text,
        tags: projectTags(input.tags),
      }),
    });

    const payload = (await response.json().catch(() => null)) as { id?: unknown; message?: unknown; error?: unknown } | null;
    if (!response.ok) {
      return {
        ok: false,
        provider: "resend",
        error: cleanText(payload?.message || payload?.error || `Resend returned ${response.status}`, 240),
        skipped: false,
      };
    }

    return { ok: true, provider: "resend", id: cleanText(payload?.id, 120) || "sent", skipped: false };
  } catch (error) {
    return {
      ok: false,
      provider: "resend",
      error: error instanceof Error ? cleanText(error.message, 240) : "Resend request failed.",
      skipped: false,
    };
  }
}

export function buildCendorqEmailLayout({
  title,
  intro,
  ctaLabel,
  ctaUrl,
  secondary,
}: {
  title: string;
  intro: string;
  ctaLabel: string;
  ctaUrl: string;
  secondary?: string;
}) {
  const safeTitle = escapeHtml(cleanText(title, 180));
  const safeIntro = escapeHtml(cleanText(intro, 900));
  const safeCta = escapeHtml(cleanText(ctaLabel, 90));
  const safeUrl = escapeHtml(cleanUrl(ctaUrl));
  const safeSecondary = escapeHtml(cleanText(secondary, 900));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;background:#ffffff;color:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border:1px solid #e2e8f0;border-radius:28px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 0 28px;">
                <div style="font-size:14px;letter-spacing:0.16em;font-weight:700;color:#020617;">CENDORQ</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 10px 28px;">
                <h1 style="margin:0;font-size:36px;line-height:1.02;letter-spacing:-0.04em;color:#020617;">${safeTitle}</h1>
                <p style="margin:22px 0 0 0;font-size:16px;line-height:1.75;color:#475569;">${safeIntro}</p>
                ${safeSecondary ? `<p style="margin:16px 0 0 0;font-size:14px;line-height:1.7;color:#64748b;">${safeSecondary}</p>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 34px 28px;">
                <a href="${safeUrl}" style="display:inline-block;border:1px solid #020617;border-radius:999px;background:#ffffff;color:#020617;text-decoration:none;font-size:15px;font-weight:700;padding:15px 24px;">${safeCta}</a>
                <p style="margin:22px 0 0 0;font-size:12px;line-height:1.7;color:#64748b;">If the button does not work, copy and paste this link into your browser:<br /><span style="word-break:break-all;color:#334155;">${safeUrl}</span></p>
              </td>
            </tr>
          </table>
          <p style="max-width:620px;margin:18px auto 0 auto;font-size:12px;line-height:1.7;color:#64748b;text-align:left;">Cendorq will never ask for your password, private key, card number, or session token by email. This message is transactional and tied to your Cendorq account or plan activity.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildCendorqEmailText({ title, intro, ctaLabel, ctaUrl, secondary }: { title: string; intro: string; ctaLabel: string; ctaUrl: string; secondary?: string }) {
  return [
    "Cendorq",
    "",
    cleanText(title, 180),
    "",
    cleanText(intro, 900),
    secondary ? `\n${cleanText(secondary, 900)}` : "",
    "",
    `${cleanText(ctaLabel, 90)}: ${cleanUrl(ctaUrl)}`,
    "",
    "Cendorq will never ask for your password, private key, card number, or session token by email.",
  ]
    .filter(Boolean)
    .join("\n");
}

function withHiddenPreheader(preheader: string, html: string) {
  const safePreheader = escapeHtml(preheader);
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${safePreheader}</div>${html}`;
}

function projectTags(tags: CendorqEmailSendInput["tags"]) {
  if (!tags) return undefined;
  return Object.entries(tags)
    .map(([name, value]) => ({ name: cleanTag(name, TAG_NAME_LIMIT), value: cleanTag(value, TAG_VALUE_LIMIT) }))
    .filter((tag) => tag.name && tag.value)
    .slice(0, 10);
}

function cleanEnv(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanSender(value: unknown) {
  const cleaned = cleanText(value, 160);
  return cleaned.includes("<") && cleaned.includes(">") ? cleaned : "";
}

function cleanEmail(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}

function cleanSubject(value: unknown) {
  return cleanText(value, MAX_SUBJECT_LENGTH);
}

function cleanPreheader(value: unknown) {
  return cleanText(value, MAX_PREHEADER_LENGTH);
}

function cleanTag(value: unknown, max: number) {
  return cleanText(value, max).toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function cleanUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.hostname !== "localhost") return "https://cendorq.com";
    return url.toString();
  } catch {
    return "https://cendorq.com";
  }
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
