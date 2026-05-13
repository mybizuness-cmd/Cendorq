const MAIL_PROVIDERS = [
  { name: "Gmail", href: "https://mail.google.com/mail/u/0/#inbox", mark: "M", markClass: "text-red-500", ringClass: "border-red-100 bg-red-50" },
  { name: "Outlook", href: "https://outlook.live.com/mail/0/inbox", mark: "O", markClass: "text-blue-600", ringClass: "border-blue-100 bg-blue-50" },
  { name: "Yahoo Mail", href: "https://mail.yahoo.com/", mark: "Y!", markClass: "text-violet-700", ringClass: "border-violet-100 bg-violet-50" },
  { name: "Apple Mail", href: "https://www.icloud.com/mail", mark: "", markClass: "text-slate-950", ringClass: "border-slate-200 bg-white" },
] as const;

export function MailProviderLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Open your inbox">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Open your inbox</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {MAIL_PROVIDERS.map((provider) => (
          <a key={provider.name} href={provider.href} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2" aria-label={`Open ${provider.name} inbox`}>
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${provider.ringClass} text-sm font-black shadow-sm ${provider.markClass}`} aria-hidden="true">{provider.mark}</span>
            <span className="flex-1 text-left text-slate-950">Open {provider.name}</span>
            <span className="text-xs font-black text-slate-400 transition group-hover:text-slate-800" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs font-medium leading-5 text-slate-500">These buttons only open your mailbox so you can find the Cendorq access email. They are not sign-up providers.</p>
    </div>
  );
}

export const MAIL_PROVIDER_GUARDRAIL_COPY = MAIL_PROVIDERS.map((provider) => `Open ${provider.name}`).join(" ");
