export type NavItem = Readonly<{
  label: string;
  href: string;
}>;

export { absoluteUrl, siteConfig } from "./seo";

export const primaryNav: readonly NavItem[] = [
  { label: "Free Scan", href: "/free-check" },
  { label: "Plans", href: "/plans" },
  { label: "AI Readiness Review", href: "/plans/deep-review" },
  { label: "Signal Repair", href: "/plans/build-fix" },
  { label: "Readiness Control", href: "/plans/ongoing-control" },
] as const;

export const footerNav: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Start Free Scan", href: "/free-check" },
] as const;
