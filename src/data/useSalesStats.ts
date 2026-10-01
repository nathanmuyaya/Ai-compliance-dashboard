import { useEffect, useMemo, useState } from "react";
import {
  DAILY_SALES,
  FLAGGED_RISKS,
  SALES,
} from "./mockData";

export function useSalesStats() {
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    /* =========================================================
       SALES SUMMARY
    ========================================================= */

    const totalRevenue = SALES.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    const completedSales = SALES.filter(
      (sale) => sale.status === "Completed"
    );

    const pendingSales = SALES.filter(
      (sale) => sale.status === "Pending"
    );

    const flaggedSales = SALES.filter(
      (sale) => sale.status === "Flagged"
    );

    const completedRevenue = completedSales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    const completedOrders = completedSales.length;

    const avgOrderValue =
      SALES.length > 0
        ? totalRevenue / SALES.length
        : 0;

    const averageCompletedOrder =
      completedOrders > 0
        ? completedRevenue / completedOrders
        : 0;

    /* =========================================================
       OVERVIEW KPI VALUES
    ========================================================= */

    // Revenue represents all recorded sales.
    const revenue30 = totalRevenue;

    // Orders represents completed transactions.
    const orders30 = completedOrders;

    /* =========================================================
       REVENUE COMPARISON
    ========================================================= */

    const last30 = DAILY_SALES.slice(-30);
    const prev30 = DAILY_SALES.slice(-60, -30);

    const historicalRevenue30 = last30.reduce(
      (sum, day) => sum + day.revenue,
      0
    );

    const historicalRevenuePrev30 = prev30.reduce(
      (sum, day) => sum + day.revenue,
      0
    );

    const revenueDeltaPct =
      historicalRevenuePrev30 > 0
        ? ((historicalRevenue30 - historicalRevenuePrev30) /
            historicalRevenuePrev30) *
          100
        : null;

    /* =========================================================
       RISK SUMMARY
    ========================================================= */

    const openRisks = FLAGGED_RISKS.filter(
      (risk) => risk.status !== "resolved"
    );

    const criticalOpen = FLAGGED_RISKS.filter(
      (risk) =>
        risk.status !== "resolved" &&
        risk.severity === "critical"
    );

    /* =========================================================
       RETURN STATS
    ========================================================= */

    return {
      // Sales totals
      totalRevenue,
      completedRevenue,
      completedSales,
      pendingSales,
      flaggedSales,

      // Orders
      orders: SALES.length,
      completedOrders,

      // Average values
      avgOrderValue,
      averageCompletedOrder,

      // Overview KPIs
      revenue30,
      orders30,
      revenueDeltaPct,

      // Risks
      openRisks,
      criticalOpen,
    };
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return {
    ...stats,
    loading,
  };
}