import Link from "next/link";
import { cookies } from "next/headers";
import { CENDORQ_CUSTOMER_SESSION_COOKIE, readCustomerRememberedSessionCookieValue } from "@/lib/customer-remembered-session-runtime";

const BRAND_NAME = "Cendorq";

const PUBLIC_NAV_LINKS = [
  { label: "AI Readiness", mobile: "AI Readiness", href: "/#ai-readiness" },
  { label: "Plans", mobile: "Plans", href: "/plans" },
  { label: "Sign in", mobile: "Sign in", href: "/login" },
] as const;

const CTA_CLASS =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-white px-5 py-2 text-sm font-black tracking-[-0.02em] text-slate-950 shadow-[0_10px_34px_rgba(14,165,233,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-12 sm:px-7 sm:text-base";

const NAV_LINK_BASE =
  "inline-flex min-h-10 shrink-0 items-center justify-center rounded-full px-2.5 py-2 text-sm font-black tracking-[-0.02em] text-slate-950 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-4 sm:text-base";

const ACCOUNT_LINK_CLASS =
  "block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const session = readCustomerRememberedSessionCookieValue(cookieStore.get(CENDORQ_CUSTOMER_SESSION_COOKIE)?.value || "", "/dashboard");
  const isRememberedCustomer = session.ok;
  const logoHref = isRememberedCustomer ? session.safeReturnTo : "/";

  return (
    <header data-cendorq-visible-header="true" className="sticky top-0 z-[2147483647] block w-full min-w-0 overflow-visible border-b border-cyan-100 bg-white text-slate-950 shadow-[0_12px_40px_rgba(15,23,42,0.10)]">
      <div className="mx-auto flex min-h-[4.65rem] w-full max-w-[100rem] items-center justify-between gap-2 px-3 sm:min-h-[5rem] sm:gap-4 sm:px-6 lg:px-10">
        <Link href={logoHref} aria-label={isRememberedCustomer ? `${BRAND_NAME} dashboard` : `${BRAND_NAME} homepage`} className="group inline-flex min-w-0 shrink-0 items-center gap-2 rounded-full py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:gap-3">
          <BrandMark />
          <span className="hidden truncate text-base font-black tracking-[-0.035em] text-slate-950 sm:inline lg:text-xl">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="header-nav-scroll flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto overflow-y-hidden rounded-full bg-white px-1 py-1 sm:gap-2 lg:max-w-2xl">
          {PUBLIC_NAV_LINKS.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className={NAV_LINK_BASE}>
              <span className="sm:hidden">{item.mobile}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
          {isRememberedCustomer ? <AccountMenu dashboardHref={session.safeReturnTo} /> : null}
        </nav>

        <Link href={isRememberedCustomer ? session.safeReturnTo : "/free-check"} className={CTA_CLASS}>
          <span>{isRememberedCustomer ? "Dashboard" : "Scan"}</span>
        </Link>
      </div>
      <style>{`.header-nav-scroll{scrollbar-width:none}.header-nav-scroll::-webkit-scrollbar{display:none}`}</style>
      <span className="sr-only">Header navigation includes working links for AI Readiness, Plans, Sign in, and Scan.</span>
    </header>
  );
}

function AccountMenu({ dashboardHref }: { dashboardHref: string }) {
  return (
    <details className="group relative z-[2147483647] hidden sm:block">
      <summary className={`${NAV_LINK_BASE} cursor-pointer list-none`} aria-label="Customer account menu"><span>Account</span></summary>
      <div className="absolute right-0 z-[2147483647] mt-2 w-[min(14rem,calc(100vw-1.5rem))] rounded-2xl border border-cyan-100 bg-white p-2 shadow-[0_18px_55px_rgba(15,23,42,0.16)]">
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
    <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-[0_0_26px_rgba(103,232,249,0.38),0_10px_26px_rgba(15,23,42,0.08)] sm:h-12 sm:w-12">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.24),transparent_44%),radial-gradient(circle_at_76%_82%,rgba(129,140,248,0.22),transparent_48%)]" aria-hidden="true" />
      <span className="relative flex items-center gap-[4px]">
        <span className="h-5 w-2 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.42)]" />
        <span className="h-7 w-2 rounded-full bg-slate-900" />
        <span className="h-5 w-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.38)]" />
      </span>
    </span>
  );
}
