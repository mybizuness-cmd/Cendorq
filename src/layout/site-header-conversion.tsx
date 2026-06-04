import Link from "next/link";
import { cookies } from "next/headers";
import { CENDORQ_CUSTOMER_SESSION_COOKIE, readCustomerRememberedSessionCookieValue } from "@/lib/customer-remembered-session-runtime";

const BRAND_NAME = "Cendorq";

const PUBLIC_NAV_LINKS = [
  { label: "Plans", href: "/plans", className: "inline-flex" },
  { label: "Sign In", href: "/login", className: "inline-flex" },
  { label: "Customer Access", href: "/login", className: "hidden sm:inline-flex" },
  { label: "FAQ", href: "/faq", className: "hidden md:inline-flex" },
] as const;

const CTA_CLASS =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_14px_34px_rgba(14,165,233,0.13)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:min-h-12 sm:px-5";

const NAV_LINK_BASE =
  "min-h-10 shrink-0 items-center justify-center rounded-full px-3 py-2 text-sm font-black tracking-[-0.01em] text-slate-700 transition hover:bg-white hover:text-slate-950 hover:shadow-sm focus:outline-none focus-visible:bg-white focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:px-4";

const ACCOUNT_LINK_CLASS =
  "block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const session = readCustomerRememberedSessionCookieValue(cookieStore.get(CENDORQ_CUSTOMER_SESSION_COOKIE)?.value || "", "/dashboard");
  const isRememberedCustomer = session.ok;
  const logoHref = isRememberedCustomer ? session.safeReturnTo : "/";

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-cyan-100/80 bg-white/92 text-slate-950 shadow-[0_10px_30px_rgba(14,165,233,0.055)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[4rem] w-full max-w-[92rem] items-center justify-between gap-2 px-3 sm:min-h-[4.5rem] sm:gap-4 sm:px-6">
        <Link href={logoHref} aria-label={isRememberedCustomer ? `${BRAND_NAME} dashboard` : `${BRAND_NAME} homepage`} className="inline-flex min-w-0 shrink-0 items-center gap-2 rounded-full py-1 transition hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:gap-3 sm:px-1.5">
          <BrandMark />
          <span className="hidden truncate text-base font-black tracking-[-0.035em] text-slate-950 sm:inline lg:text-lg">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex min-w-0 shrink items-center justify-center gap-0.5 overflow-visible rounded-full border border-cyan-100 bg-white/74 px-1 py-1 shadow-[0_8px_24px_rgba(15,23,42,0.035)] sm:flex-1 sm:gap-1.5 sm:px-1.5 lg:max-w-xl">
          {PUBLIC_NAV_LINKS.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className={`${NAV_LINK_BASE} ${item.className}`}>
              {item.label}
            </Link>
          ))}
          {isRememberedCustomer ? <AccountMenu dashboardHref={session.safeReturnTo} /> : null}
        </nav>

        <Link href={isRememberedCustomer ? session.safeReturnTo : "/free-check"} className={CTA_CLASS}>
          {isRememberedCustomer ? "Dashboard" : "Start Scan"}
        </Link>
      </div>
      <span className="sr-only">Header navigation includes Plans, Sign In, Customer Access, and FAQ. Start Scan remains the primary homepage action. Customer Access and Sign In route to /login for returning customers. Remembered customers can open Dashboard or Account. Header avoids Sample Report clutter.</span>
    </header>
  );
}

function AccountMenu({ dashboardHref }: { dashboardHref: string }) {
  return (
    <details className="group relative z-50 hidden sm:block">
      <summary className={`${NAV_LINK_BASE} inline-flex cursor-pointer list-none`} aria-label="Customer account menu">
        <span>Account</span>
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
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-[0_12px_28px_rgba(14,165,233,0.12)] sm:h-11 sm:w-11">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(251,207,232,0.48),transparent_42%),radial-gradient(circle_at_75%_80%,rgba(125,211,252,0.5),transparent_45%)]" aria-hidden="true" />
      <span className="relative flex items-center gap-[3px]">
        <span className="h-4 w-1.5 rounded-full bg-cyan-500" />
        <span className="h-6 w-1.5 rounded-full bg-slate-700" />
        <span className="h-4 w-1.5 rounded-full bg-fuchsia-300" />
      </span>
    </span>
  );
}
