"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_DELAY_MS = 4200;
const ALLOWED_CHECKOUT_DESTINATIONS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/support/request",
  "/dashboard/billing",
  "/free-check",
  "/plans/deep-review",
] as const;

type AllowedCheckoutDestination = (typeof ALLOWED_CHECKOUT_DESTINATIONS)[number];

export function CheckoutDashboardRedirect({ destination }: { destination: AllowedCheckoutDestination }) {
  const router = useRouter();

  useEffect(() => {
    const safeDestination = ALLOWED_CHECKOUT_DESTINATIONS.find((allowed) => allowed === destination) || "/dashboard";
    const timeout = window.setTimeout(() => {
      router.replace(safeDestination);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [destination, router]);

  return null;
}
