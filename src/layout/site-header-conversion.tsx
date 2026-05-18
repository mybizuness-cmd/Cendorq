import Link from "next/link";
import { cookies } from "next/headers";
import { CENDORQ_CUSTOMER_SESSION_COOKIE, readCustomerRememberedSessionCookieValue } from "@/lib/customer-remembered-session-runtime";

const BRAND_NAME = "Cendorq";

const PUBLIC_NAV_LINKS = [
  { label: "Plans", href: "/plans" },
  { label: "FAQ", href: "/faq" },
] as const;

const CTA_CLASS =
  "inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-950 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:min-h-11 sm:px-5 sm:py-2.5";

const NAV_LINK_CLASS =
  "inline-flex min-h-9 shrink-0 items-center justify-center rounded-full px-2 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:px-3";

const ACCOUNT_LINK_CLASS =
  "block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const session = readCustomerRememberedSessionCookieValue(cookieStore.get(CENDORQ_CUSTOMER_SESSION_COOKIE)?.value || "", "/dashboard");
  const isRememberedCustomer = session.ok;
  const logoHref = isRememberedCustomer ? session.safeReturnTo : "/";

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-cyan-100 bg-white/95 text-slate-950 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-1.5 px-3 sm:h-auto sm:min-h-[4.25rem] sm:gap-3 sm:px-8 sm:py-2.5">
        <Link href={logoHref} aria-label={isRememberedCustomer ? `${BRAND_NAME} dashboard` : `${BRAND_NAME} homepage`} className="inline-flex min-w-0 shrink-0 items-center gap-2 rounded-full py-1.5 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:px-1.5">
          <BrandMark />
          <span className="hidden truncate text-sm font-semibold tracking-[0.16em] text-slate-950 sm:inline sm:text-base">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex min-w-0 shrink items-center justify-center gap-0.5 overflow-visible px-0 sm:flex-1 sm:gap-2 sm:px-1">
          {PUBLIC_NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={NAV_LINK_CLASS}>
              {item.label}
            </Link>
          ))}
          {isRememberedCustomer ? <AccountMenu dashboardHref={session.safeReturnTo} /> : <Link href="/login" className={NAV_LINK_CLASS}>Access</Link>}
        </nav>

        <Link href={isRememberedCustomer ? session.safeReturnTo : "/free-check"} className={CTA_CLASS}>
          <span className="sm:hidden">{isRememberedCustomer ? "⌂" : "Scan"}</span>
          <span className="hidden sm:inline">{isRememberedCustomer ? "Dashboard" : "Start Free Scan"}</span>
        </Link>
      </div>
      <span className="sr-only">Logo links to the dashboard for remembered customers and homepage for new visitors. Header keeps Plans, FAQ, Access or Account, and Start Free Scan or Dashboard visible. Account menu uses overflow-visible so the menu is not clipped. Remembered customers can tap Dashboard directly or open Account for Reports, Billing, Support, and Sign out. Account menu width is bounded for mobile. href="/plans" href="/faq" href="/login" href="/free-check" href="/dashboard"</span>
    </header>
  );
}

function AccountMenu({ dashboardHref }: { dashboardHref: string }) {
  return (
    <details className="group relative z-50">
      <summary className={`${NAV_LINK_CLASS} cursor-pointer list-none`} aria-label="Customer account menu">
        <span className="sm:hidden" aria-hidden="true">⌂</span>
        <span className="hidden sm:inline">Account</span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-[min(14rem,calc(100vw-1.5rem))] rounded-2xl border border-cyan-100 bg-white p-2 shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
        <Link href={dashboardHref} className={`${ACCOUNT_LINK_CLASS} bg-cyan-50 text-slate-950`}>Dashboard</Link>
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
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-sm">
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3.5 w-1.5 rounded-full bg-cyan-500" />
        <span className="h-5 w-1.5 rounded-full bg-slate-800" />
        <span className="h-3 w-1.5 rounded-full bg-indigo-400" />
      </span>
    </span>
  );
}
