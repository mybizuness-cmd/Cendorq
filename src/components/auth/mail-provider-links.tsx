const MAIL_PROVIDERS = [
  {
    name: "Gmail",
    href: "https://mail.google.com/mail/u/0/#inbox",
    mark: "M",
    accent: "from-red-500 via-amber-400 to-emerald-500",
  },
  {
    name: "Outlook",
    href: "https://outlook.live.com/mail/0/inbox",
    mark: "O",
    accent: "from-sky-500 to-blue-700",
  },
  {
    name: "Yahoo Mail",
    href: "https://mail.yahoo.com/",
    mark: "Y!",
    accent: "from-violet-600 to-fuchsia-600",
  },
  {
    name: "Apple Mail",
    href: "https://www.icloud.com/mail",
    mark: "",
    accent: "from-slate-700 to-slate-950",
  },
] as const;

export function MailProviderLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Open your email provider">
      <div className="grid gap-3 sm:grid-cols-2">
        {MAIL_PROVIDERS.map((provider) => (
          <a
            key={provider.name}
            href={provider.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-14 items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
            aria-label={`Open ${provider.name}`}
          >
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${provider.accent} text-xs font-black text-white shadow-sm`} aria-hidden="true">
              {provider.mark}
            </span>
            <span className="flex-1 text-left">Open {provider.name}</span>
            <span className="text-xs font-black text-slate-400 transition group-hover:text-slate-700" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs font-medium leading-5 text-slate-500">
        These buttons open the mailbox provider in a new tab. Cendorq cannot guarantee inbox placement, so check spam or promotions once if the message is not visible.
      </p>
    </div>
  );
}

export const MAIL_PROVIDER_GUARDRAIL_COPY = MAIL_PROVIDERS.map((provider) => `Open ${provider.name}`).join(" ");
