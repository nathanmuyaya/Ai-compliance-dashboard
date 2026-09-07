import { useMemo } from "react";
import { DAILY_SALES, FLAGGED_RISKS } from "./mockData";

export function useSalesStats() {
  return useMemo(() => {
    const last30 = DAILY_SALES.slice(-30);
    const prev30 = DAILY_SALES.slice(-60, -30);
    const revenue30 = last30.reduce((sum, d) => sum + d.revenue, 0);
    const revenuePrev30 = prev30.reduce((sum, d) => sum + d.revenue, 0);
    const orders30 = last30.reduce((sum, d) => sum + d.orders, 0);
    const avgOrderValue = revenue30 / orders30;
    const revenueDeltaPct = ((revenue30 - revenuePrev30) / revenuePrev30) * 100;

    const openRisks = FLAGGED_RISKS.filter((r) => r.status !== "resolved");
    const criticalOpen = FLAGGED_RISKS.filter((r) => r.status !== "resolved" && r.severity === "critical");

    return { revenue30, orders30, avgOrderValue, revenueDeltaPct, openRisks, criticalOpen };
  }, []);
}
