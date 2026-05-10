export const UNIFIED_EXPERIENCE_ALIGNMENT = {
  id: "unified-experience-alignment",
  name: "Unified Experience Alignment",
  purpose:
    "Keep public pages, plan pages, checkout, dashboard, report vault, billing, notifications, support, lifecycle, and owner operations aligned as one Cendorq system.",
  surfaceRules: [
    "Homepage creates category clarity and the strongest start path without becoming a pricing table.",
    "Plans and plan-detail pages carry pricing, comparison, scope, fit, and what-happens-next clarity.",
    "Dashboard surfaces act as the customer command room with proof, state, and next best action before secondary detail.",
    "Billing, report vault, notifications, support, and lifecycle messages reflect the same customer-owned state.",
    "Backend triggers must support the same journey the frontend communicates.",
    "Mobile is the main entrance; desktop is the command room; both must feel intentional.",
    "Blocks feel rich through hierarchy, spacing, proof, rhythm, and restraint rather than noise.",
  ],
  blockedPatterns: [
    "homepage pricing clutter",
    "cheap-looking generic blocks",
    "flat pricing table without decision guidance",
    "disconnected dashboard surface",
    "mobile page that feels like compressed desktop",
    "backend state that contradicts customer-facing status",
    "support path that sends customers hunting through email",
  ],
} as const;

export function getUnifiedExperienceAlignment() {
  return UNIFIED_EXPERIENCE_ALIGNMENT;
}
