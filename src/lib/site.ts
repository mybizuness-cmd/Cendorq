export type NavItem = Readonly<{
  label: string;
  href: string;
}>;

export { absoluteUrl, siteConfig } from "./seo";

export const primaryNav: readonly NavItem[] = [
  { label: "Free Scan", href: "/free-check" },
  { label: "Plans", href: "/plans" },
  { label: "Deep Review", href: "/plans/deep-review" },
  { label: "Build Fix", href: "/plans/build-fix" },
  { label: "Ongoing Control", href: "/plans/ongoing-control" },
  { label: "Connect", href: "/connect" },
] as const;

export const footerNav: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Connect", href: "/connect" },
] as const;
