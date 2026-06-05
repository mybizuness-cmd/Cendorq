import Link from "next/link";
import { cookies } from "next/headers";
import { CENDORQ_CUSTOMER_SESSION_COOKIE, readCustomerRememberedSessionCookieValue } from "@/lib/customer-remembered-session-runtime";

const BRAND_NAME = "Cendorq";

const PUBLIC_NAV_LINKS = [
  { label: "Plans", mobile: "Plans", href: "/plans" },
  { label: "FAQ", mobile: "FAQ", href: "/faq" },
  { label: "Sign in / Sign up", mobile: "Sign in", href: "/login" },
] as const;

const CTA_CLASS =
  "hidden min-[390px]:inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/70 bg-slate-950/70 px-3 py-2 text-xs font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:border-fuchsia-300/80 hover:shadow-[0_0_30px_rgba(236,72,153,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020713] sm:min-h-12 sm:px-6 sm:text-sm";

const NAV_LINK_BASE =
  "inline-flex min-h-9 flex-1 shrink items-center justify-center rounded-full px-2 py-2 text-[11px] font-black tracking-[-0.01em] text-slate-100 transition hover:bg-cyan-300/10 hover:text-cyan-100 focus:outline-none focus-visible:bg-cyan-300/10 focus-visible:text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020713] sm:min-h-10 sm:flex-none sm:px-4 sm:text-sm";

const ACCOUNT_LINK_CLASS =
  "block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-cyan-300/10 hover:text-white focus:outline-none focus-visible:bg-cyan-300/10 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-cyan-300";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const session = readCustomerRememberedSessionCookieValue(cookieStore.get(CENDORQ_CUSTOMER_SESSION_COOKIE)?.value || "", "/dashboard");
  const isRememberedCustomer = session.ok;
  const logoHref = isRememberedCustomer ? session.safeReturnTo : "/";

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-cyan-300/10 bg-[#020713]/92 text-white shadow-[0_14px_44px_rgba(0,0,0,0.26)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[3.65rem] w-full max-w-[96rem] items-center justify-between gap-2 px-3 sm:min-h-[4.5rem] sm:gap-4 sm:px-6 lg:px-10">
        <Link href={logoHref} aria-label={isRememberedCustomer ? `${BRAND_NAME} dashboard` : `${BRAND_NAME} homepage`} className="group inline-flex min-w-0 shrink-0 items-center gap-2 rounded-full py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020713] sm:gap-3">
          <BrandMark />
          <span className="hidden truncate text-base font-black tracking-[-0.035em] text-white sm:inline lg:text-xl">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-hidden rounded-full border border-cyan-300/10 bg-slate-950/18 px-1 py-1 sm:gap-1.5 sm:px-1.5 lg:max-w-xl">
          {PUBLIC_NAV_LINKS.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className={NAV_LINK_BASE}>
              <span className="sm:hidden">{item.mobile}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
          {isRememberedCustomer ? <AccountMenu dashboardHref={session.safeReturnTo} /> : null}
        </nav>

        <Link href={isRememberedCustomer ? session.safeReturnTo : "/free-check"} className={CTA_CLASS}>
          <span className="sm:hidden">{isRememberedCustomer ? "Dash" : "Scan"}</span>
          <span className="hidden sm:inline">{isRememberedCustomer ? "Dashboard" : "Start Scan"}</span>
          <span aria-hidden="true" className="ml-3 hidden text-cyan-200 sm:inline">→</span>
        </Link>
      </div>
      <span className="sr-only">Header navigation includes working links for Plans, Sign-in/Sign-up, and FAQ. FAQ href is /faq. Sign-in/Sign-up routes to /login. Start Scan remains the primary action.</span>
    </header>
  );
}

function AccountMenu({ dashboardHref }: { dashboardHref: string }) {
  return (
    <details className="group relative z-50 hidden sm:block">
      <summary className={`${NAV_LINK_BASE} cursor-pointer list-none`} aria-label="Customer account menu"><span>Account</span></summary>
      <div className="absolute right-0 z-50 mt-2 w-[min(14rem,calc(100vw-1.5rem))] rounded-2xl border border-cyan-300/15 bg-[#03111f] p-2 shadow-[0_18px_55px_rgba(0,0,0,0.34)]">
        <Link href={dashboardHref} className={`${ACCOUNT_LINK_CLASS} bg-cyan-300/10 text-white`}>Dashboard</Link>
        <Link href="/dashboard/reports" className={ACCOUNT_LINK_CLASS}>Reports</Link>
        <Link href="/dashboard/billing" className={ACCOUNT_LINK_CLASS}>Billing</Link>
        <Link href="/dashboard/support" className={ACCOUNT_LINK_CLASS}>Support</Link>
        <Link href="/api/customer/session/logout?returnTo=/" className={ACCOUNT_LINK_CLASS}>Sign out</Link>
      </div>
    </details>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/35 bg-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)] sm:h-11 sm:w-11">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(236,72,153,0.55),transparent_42%),radial-gradient(circle_at_76%_82%,rgba(34,211,238,0.62),transparent_46%)]" aria-hidden="true" />
      <span className="absolute inset-1 rounded-xl bg-[#020713]/45" aria-hidden="true" />
      <span className="relative flex items-center gap-[3px]">
        <span className="h-4 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <span className="h-6 w-1.5 rounded-full bg-white" />
        <span className="h-4 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
      </span>
    </span>
  );
}
