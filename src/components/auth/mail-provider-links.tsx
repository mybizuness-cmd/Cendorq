const MAIL_PROVIDERS = [
  { name: "Gmail", label: "Open Gmail inbox", href: "https://mail.google.com/mail/u/0/#inbox", mark: "M", markClass: "text-red-500", ringClass: "border-red-100 bg-red-50" },
  { name: "Outlook", label: "Open Outlook inbox", href: "https://outlook.live.com/mail/0/inbox", mark: "O", markClass: "text-blue-600", ringClass: "border-blue-100 bg-blue-50" },
  { name: "Yahoo Mail", label: "Open Yahoo Mail inbox", href: "https://mail.yahoo.com/", mark: "Y!", markClass: "text-violet-700", ringClass: "border-violet-100 bg-violet-50" },
  { name: "iCloud Mail", label: "Open iCloud Mail inbox", href: "https://www.icloud.com/mail", mark: "iCloud", markClass: "text-slate-950", ringClass: "border-slate-200 bg-white" },
] as const;

export function MailProviderLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Open the inbox where your Cendorq access link was sent">
      <div className="mb-3 rounded-[1.1rem] border border-cyan-100 bg-cyan-50/45 p-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Access email sent</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">These shortcuts only open your mailbox so you can find the Cendorq access email. They are not Apple, Google, Microsoft, or Yahoo sign-in providers for Cendorq.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {MAIL_PROVIDERS.map((provider) => (
          <a key={provider.name} href={provider.href} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-between gap-3 rounded-full border border-cyan-100 bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2" aria-label={`${provider.label} in a new tab`}>
            <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-2 ${provider.ringClass} text-xs font-black shadow-sm ${provider.markClass}`} aria-hidden="true">{provider.mark}</span>
            <span className="flex-1 text-left text-slate-950">{provider.label}</span>
            <span className="text-xs font-black text-slate-400 transition group-hover:text-slate-800" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">After your inbox opens, use the newest Cendorq email and continue from the secure link inside it.</p>
    </div>
  );
}

export const MAIL_PROVIDER_GUARDRAIL_COPY = `${MAIL_PROVIDERS.map((provider) => provider.label).join(" ")} not sign-in providers mailbox shortcuts newest Cendorq email secure link`;
