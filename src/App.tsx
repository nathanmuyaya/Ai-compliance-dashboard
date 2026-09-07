import { useMemo } from "react";
import "./App.css";
import StatTile from "./components/StatTile";
import SalesTrendChart from "./components/SalesTrendChart";
import CategoryBarChart from "./components/CategoryBarChart";
import FlaggedRisksTable from "./components/FlaggedRisksTable";
import { CATEGORY_SALES, DAILY_SALES, FLAGGED_RISKS } from "./data/mockData";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function App() {
  const stats = useMemo(() => {
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

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Compliance Dashboard</h1>
          <p className="app-subtitle">Store sales performance and flagged risk monitoring</p>
        </div>
      </header>

      <section className="stat-grid">
        <StatTile
          label="Revenue (30d)"
          value={currency.format(stats.revenue30)}
          delta={`${Math.abs(stats.revenueDeltaPct).toFixed(1)}% vs prior 30d`}
          deltaDirection={stats.revenueDeltaPct >= 0 ? "up" : "down"}
        />
        <StatTile label="Orders (30d)" value={stats.orders30.toLocaleString()} />
        <StatTile label="Avg order value" value={currency.format(stats.avgOrderValue)} />
        <StatTile
          label="Open flagged risks"
          value={stats.openRisks.length.toString()}
          tone={stats.criticalOpen.length > 0 ? "critical" : "default"}
          delta={`${stats.criticalOpen.length} critical`}
          deltaDirection="flat"
        />
      </section>

      <section className="chart-grid">
        <SalesTrendChart data={DAILY_SALES} />
        <CategoryBarChart data={CATEGORY_SALES} />
      </section>

      <section>
        <FlaggedRisksTable risks={FLAGGED_RISKS} />
      </section>
    </div>
  );
}
