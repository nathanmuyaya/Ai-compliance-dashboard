import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import SalesTrendChart from "../components/SalesTrendChart";
import CategoryBarChart from "../components/CategoryBarChart";
import SeverityBadge from "../components/SeverityBadge";
import {
  CATEGORY_SALES,
  DAILY_SALES,
  FLAGGED_RISKS,
} from "../data/mockData";
import { useSalesStats } from "../data/useSalesStats";
import "./OverviewPage.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const SEVERITY_ORDER = {
  critical: 0,
  serious: 1,
  warning: 2,
  good: 3,
} as const;

export default function OverviewPage() {
  const stats = useSalesStats();

  const topRisks = [...FLAGGED_RISKS]
    .sort(
      (a, b) =>
        SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] ||
        (a.date < b.date ? 1 : -1)
    )
    .slice(0, 5);

  return (
    <div className="overview-page">
      {/* PAGE HEADER */}
      <PageHeader
        title="Overview"
        subtitle="Store sales performance and flagged risk monitoring"
      />

      {/* =====================================================
          KPI CARDS
          ===================================================== */}
      <section className="overview-kpi-grid">
        {/* Revenue */}
        <div className="overview-kpi revenue">
          <div className="overview-kpi-top">
            <span>Revenue (30d)</span>
            <div className="kpi-icon">$</div>
          </div>

          <strong>{currency.format(stats.revenue30)}</strong>

          <div className="kpi-bottom">
            <span
              className={
                stats.revenueDeltaPct >= 0 ? "positive" : "negative"
              }
            >
              {stats.revenueDeltaPct >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.revenueDeltaPct).toFixed(1)}%
            </span>

            <span>vs prior 30d</span>
          </div>
        </div>

        {/* Orders */}
        <div className="overview-kpi">
          <div className="overview-kpi-top">
            <span>Orders (30d)</span>
            <div className="kpi-icon">↗</div>
          </div>

          <strong>{stats.orders30.toLocaleString()}</strong>

          <div className="kpi-bottom">
            <span>Completed orders</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="overview-kpi">
          <div className="overview-kpi-top">
            <span>Average Order</span>
            <div className="kpi-icon">◎</div>
          </div>

          <strong>{currency.format(stats.avgOrderValue)}</strong>

          <div className="kpi-bottom">
            <span>Per transaction</span>
          </div>
        </div>

        {/* Open Risks */}
        <div
          className={`overview-kpi ${
            stats.criticalOpen.length > 0 ? "risk-kpi" : ""
          }`}
        >
          <div className="overview-kpi-top">
            <span>Open Flagged Risks</span>
            <div className="kpi-icon">!</div>
          </div>

          <strong>{stats.openRisks.length}</strong>

          <div className="kpi-bottom">
            <span className="critical-text">
              {stats.criticalOpen.length} critical
            </span>

            <span>requiring attention</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHARTS
          ===================================================== */}
      <section className="overview-chart-grid">
        <div className="overview-chart-wrapper">
          <SalesTrendChart data={DAILY_SALES} />
        </div>

        <div className="overview-chart-wrapper">
          <CategoryBarChart data={CATEGORY_SALES} />
        </div>
      </section>

      {/* =====================================================
          HIGHEST PRIORITY RISKS
          ===================================================== */}
      <section className="overview-card risks-card">
        <div className="overview-card-header">
          <div>
            <span className="card-eyebrow">RISK MONITORING</span>

            <h2>Highest Priority Flagged Risks</h2>

            <p>
              Risks requiring the most immediate attention
            </p>
          </div>

          <Link to="/risks" className="view-all-link">
            View all risks →
          </Link>
        </div>

        <div className="risk-list">
          {topRisks.length > 0 ? (
            topRisks.map((risk) => (
              <div className="risk-row" key={risk.id}>
                <div className="risk-date">
                  {new Date(risk.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <div className="risk-description">
                  <strong>{risk.description}</strong>

                  <span>Risk ID: {risk.id}</span>
                </div>

                <div>
                  <SeverityBadge severity={risk.severity} />
                </div>

                <div className="risk-amount">
                  {currency.format(risk.amount)}
                </div>

                <span
                  className={`risk-status risk-status-${risk.status}`}
                >
                  {risk.status}
                </span>
              </div>
            ))
          ) : (
            <div className="empty-risks">
              <strong>No flagged risks</strong>
              <span>There are currently no risks requiring attention.</span>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM INSIGHTS
          ===================================================== */}
      <section className="overview-bottom-grid">
        {/* AI Insight */}
        <div className="overview-card insight-card">
          <div className="insight-icon">AI</div>

          <div>
            <span className="card-eyebrow">AI INSIGHT</span>

            <h3>Risk monitoring requires attention</h3>

            <p>
              The dashboard has identified{" "}
              <strong>{stats.openRisks.length}</strong> open flagged risks,
              including{" "}
              <strong>{stats.criticalOpen.length}</strong> critical items.
            </p>
          </div>

          <Link to="/risks">
            Review risks →
          </Link>
        </div>

        {/* System Health */}
        <div className="overview-card health-card">
          <div className="health-circle">
            <span>92%</span>
          </div>

          <div>
            <span className="card-eyebrow">SYSTEM HEALTH</span>

            <h3>Compliance Monitoring</h3>

            <p>
              Monitoring systems are active and continuously tracking
              transactions and risk events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}