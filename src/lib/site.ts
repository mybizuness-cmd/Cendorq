export type NavItem = Readonly<{
  label: string;
  href: string;
}>;

export { absoluteUrl, siteConfig } from "./seo";

export const primaryNav: readonly NavItem[] = [
  { label: "How It Works", href: "/diagnosis" },
  { label: "System Layers", href: "/pricing" },
  { label: "Profile", href: "/profile" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
] as const;
