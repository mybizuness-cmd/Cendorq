"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_DELAY_MS = 4200;
const ALLOWED_DASHBOARD_DESTINATIONS = ["/dashboard/reports", "/dashboard/support/request", "/dashboard/billing"] as const;

type AllowedDashboardDestination = (typeof ALLOWED_DASHBOARD_DESTINATIONS)[number];

export function CheckoutDashboardRedirect({ destination }: { destination: AllowedDashboardDestination }) {
  const router = useRouter();

  useEffect(() => {
    const safeDestination = ALLOWED_DASHBOARD_DESTINATIONS.find((allowed) => allowed === destination) || "/dashboard/reports";
    const timeout = window.setTimeout(() => {
      router.replace(safeDestination);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [destination, router]);

  return null;
}
