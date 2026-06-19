import Link from "next/link";
import { cookies } from "next/headers";
import { CENDORQ_CUSTOMER_SESSION_COOKIE, readCustomerRememberedSessionCookieValue } from "@/lib/customer-remembered-session-runtime";

const BRAND_NAME = "Cendorq";

const PUBLIC_NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "Plans", href: "/plans" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/connect" },
  { label: "Customer Access", href: "/login" },
] as const;

const CTA_CLASS =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_58%,#a78bfa)] px-4 py-2 text-xs font-black tracking-[-0.02em] text-slate-950 shadow-[0_14px_38px_rgba(14,165,233,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-12 sm:px-6 sm:text-sm";

const NAV_LINK_BASE =
  "inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-black tracking-[-0.02em] text-slate-700 transition hover:text-slate-950 focus:outline-none focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300";

const MENU_LINK_CLASS =
  "block rounded-2xl px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300";

const ACCOUNT_LINK_CLASS =
  "block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const session = readCustomerRememberedSessionCookieValue(cookieStore.get(CENDORQ_CUSTOMER_SESSION_COOKIE)?.value || "", "/dashboard");
  const isRememberedCustomer = session.ok;
  const logoHref = isRememberedCustomer ? session.safeReturnTo : "/";

  return (
    <header data-cendorq-visible-header="true" className="sticky top-0 z-[2147483647] block w-full min-w-0 overflow-visible border-b border-cyan-100/80 bg-white/92 text-slate-950 shadow-[0_10px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mx-auto grid min-h-[4.35rem] w-full max-w-[108rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:px-6 lg:px-10">
        <Link href={logoHref} aria-label={isRememberedCustomer ? `${BRAND_NAME} dashboard` : `${BRAND_NAME} homepage`} className="group inline-flex min-w-0 shrink-0 items-center gap-2 rounded-2xl py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:gap-3">
          <BrandMark />
          <span className="hidden truncate text-base font-black tracking-[-0.035em] text-slate-950 sm:inline xl:text-xl">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="mx-auto hidden w-full min-w-0 items-center justify-center gap-2 lg:flex">
          {PUBLIC_NAV_LINKS.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className={NAV_LINK_BASE}>
              {item.label}
            </Link>
          ))}
          {isRememberedCustomer ? <AccountMenu dashboardHref={session.safeReturnTo} /> : null}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <MobileMenu isRememberedCustomer={isRememberedCustomer} dashboardHref={session.safeReturnTo} />
          <Link href={isRememberedCustomer ? session.safeReturnTo : "/free-check"} className={CTA_CLASS}>
            {isRememberedCustomer ? "Dashboard" : "Start Free Scan"}
          </Link>
        </div>
      </div>
      <span className="sr-only">Header navigation includes working links for Product, Plans, FAQ, Contact, Customer Access, and Start Free Scan.</span>
    </header>
  );
}

function MobileMenu({ isRememberedCustomer, dashboardHref }: { isRememberedCustomer: boolean; dashboardHref: string }) {
  return (
    <details className="group relative z-[2147483647] lg:hidden">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center justify-center rounded-2xl border border-cyan-100 bg-white px-4 py-2 text-xs font-black text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
        Menu
      </summary>
      <div className="absolute right-0 z-[2147483647] mt-2 w-[min(18rem,calc(100vw-1rem))] rounded-[1.35rem] border border-cyan-100 bg-white p-2 shadow-[0_18px_55px_rgba(15,23,42,0.16)]">
        {PUBLIC_NAV_LINKS.map((item) => (
          <Link key={`mobile-${item.label}-${item.href}`} href={item.href} className={MENU_LINK_CLASS}>
            {item.label}
          </Link>
        ))}
        {isRememberedCustomer ? (
          <Link href={dashboardHref} className={`${MENU_LINK_CLASS} bg-cyan-50 text-slate-950`}>
            Dashboard
          </Link>
        ) : null}
      </div>
    </details>
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
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-[0_0_26px_rgba(103,232,249,0.34),0_10px_26px_rgba(15,23,42,0.08)] sm:h-11 sm:w-11">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.24),transparent_44%),radial-gradient(circle_at_76%_82%,rgba(129,140,248,0.22),transparent_48%)]" aria-hidden="true" />
      <span className="relative grid grid-cols-3 items-end gap-[4px]">
        <span className="h-5 w-2 rounded-sm bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.42)]" />
        <span className="h-7 w-2 rounded-sm bg-slate-900" />
        <span className="h-5 w-2 rounded-sm bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.38)]" />
      </span>
    </span>
  );
}
