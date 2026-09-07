import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatTile from "../components/StatTile";
import SalesTrendChart from "../components/SalesTrendChart";
import CategoryBarChart from "../components/CategoryBarChart";
import SeverityBadge from "../components/SeverityBadge";
import { CATEGORY_SALES, DAILY_SALES, FLAGGED_RISKS } from "../data/mockData";
import { useSalesStats } from "../data/useSalesStats";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const SEVERITY_ORDER = { critical: 0, serious: 1, warning: 2, good: 3 } as const;

export default function OverviewPage() {
  const stats = useSalesStats();
  const topRisks = [...FLAGGED_RISKS]
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] || (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <>
      <PageHeader title="Overview" subtitle="Store sales performance and flagged risk monitoring" />

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

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Highest priority flagged risks</h2>
            <p className="panel-subtitle">Top {topRisks.length} by severity</p>
          </div>
          <Link to="/risks" className="panel-link">
            View all flagged risks →
          </Link>
        </div>
        <div className="table-scroll">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Severity</th>
                <th className="col-right">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topRisks.map((risk) => (
                <tr key={risk.id}>
                  <td className="col-muted">
                    {new Date(risk.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </td>
                  <td>{risk.description}</td>
                  <td>
                    <SeverityBadge severity={risk.severity} />
                  </td>
                  <td className="col-right">{currency.format(risk.amount)}</td>
                  <td>
                    <span className={`status-pill status-pill-${risk.status}`}>{risk.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
