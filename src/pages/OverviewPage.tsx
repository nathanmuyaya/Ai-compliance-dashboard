import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import SalesTrendChart from "../components/SalesTrendChart";
import CategoryBarChart from "../components/CategoryBarChart";
import SeverityBadge from "../components/SeverityBadge";
import OverviewSkeleton from "../components/LoadingSkeleton/OverviewSkeleton";

import {
  CATEGORY_SALES,
  DAILY_SALES,
  FLAGGED_RISKS,
  PRODUCT_SALES,
} from "../data/mockData";

import { useSalesStats } from "../data/useSalesStats";

import "./OverviewPage.css";

/* =========================================================
   CURRENCY
========================================================= */

const currency = new Intl.NumberFormat("en-ZM", {
  style: "currency",
  currency: "ZMW",
  maximumFractionDigits: 0,
});

/* =========================================================
   RISK SEVERITY ORDER
========================================================= */

const SEVERITY_ORDER = {
  critical: 0,
  serious: 1,
  warning: 2,
  good: 3,
} as const;

/* =========================================================
   OVERVIEW PAGE
========================================================= */

export default function OverviewPage() {
  const stats = useSalesStats();

  /* =======================================================
     LOADING
  ======================================================= */

  if (stats.loading) {
    return <OverviewSkeleton />;
  }

  /* =======================================================
     TOP RISKS
  ======================================================= */

  const topRisks = [...FLAGGED_RISKS]
    .sort(
      (a, b) =>
        SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] ||
        (a.date < b.date ? 1 : -1)
    )
    .slice(0, 5);

  return (
    <div className="overview-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="overview-heading">

        <PageHeader
          title="Overview"
          subtitle="Store sales performance and flagged risk monitoring"
        />

        <div className="overview-live-status">
          <span className="overview-live-dot" />
          <span>Monitoring Active</span>
        </div>

      </div>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <section className="overview-kpi-grid">

        {/* Revenue */}

        <div className="overview-kpi overview-kpi-revenue">

          <div className="overview-kpi-glow" />

          <div className="overview-kpi-top">

            <div>

              <span className="overview-kpi-label">
                Revenue (30d)
              </span>

              <span className="overview-kpi-caption">
                Total recorded revenue
              </span>

            </div>

            <div className="kpi-icon kpi-icon-revenue">
              ZK
            </div>

          </div>

          <strong>
            {currency.format(stats.revenue30)}
          </strong>

          <div className="kpi-bottom">

            <span
              className={
                stats.revenueDeltaPct === null
                  ? "kpi-change"
                  : stats.revenueDeltaPct >= 0
                    ? "kpi-change positive"
                    : "kpi-change negative"
              }
            >
              {stats.revenueDeltaPct !== null ? (
                <>
                  {stats.revenueDeltaPct >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(stats.revenueDeltaPct).toFixed(1)}%
                </>
              ) : (
                "—"
              )}
            </span>

            <span>
              vs prior 30d
            </span>

          </div>

        </div>

        {/* Orders */}

        <div className="overview-kpi">

          <div className="overview-kpi-top">

            <div>

              <span className="overview-kpi-label">
                Orders (30d)
              </span>

              <span className="overview-kpi-caption">
                Completed transactions
              </span>

            </div>

            <div className="kpi-icon kpi-icon-orders">
              ↗
            </div>

          </div>

          <strong>
            {stats.orders30.toLocaleString()}
          </strong>

          <div className="kpi-bottom">

            <span>
              Completed orders
            </span>

          </div>

        </div>

        {/* Average Order Value */}

        <div className="overview-kpi">

          <div className="overview-kpi-top">

            <div>

              <span className="overview-kpi-label">
                Average Order
              </span>

              <span className="overview-kpi-caption">
                Average transaction value
              </span>

            </div>

            <div className="kpi-icon kpi-icon-average">
              ◎
            </div>

          </div>

          <strong>
            {currency.format(stats.avgOrderValue)}
          </strong>

          <div className="kpi-bottom">

            <span>
              Per transaction
            </span>

          </div>

        </div>

        {/* Open Risks */}

        <div
          className={`overview-kpi overview-kpi-risk ${
            stats.criticalOpen.length > 0
              ? "risk-kpi"
              : ""
          }`}
        >

          <div className="overview-kpi-top">

            <div>

              <span className="overview-kpi-label">
                Open Flagged Risks
              </span>

              <span className="overview-kpi-caption">
                Requires monitoring
              </span>

            </div>

            <div className="kpi-icon kpi-icon-risk">
              !
            </div>

          </div>

          <strong>
            {stats.openRisks.length}
          </strong>

          <div className="kpi-bottom">

            <span className="critical-text">
              {stats.criticalOpen.length} critical
            </span>

            <span>
              requiring attention
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          SALES & CATEGORY CHARTS
          ===================================================== */}

      <section className="overview-chart-grid">

        <div className="overview-chart-wrapper overview-chart-main">
          <SalesTrendChart data={DAILY_SALES} />
        </div>

        <div className="overview-chart-wrapper overview-chart-category">
          <CategoryBarChart data={CATEGORY_SALES} />
        </div>

      </section>

      {/* =====================================================
          PRODUCT PERFORMANCE
          ===================================================== */}

      <section className="overview-card product-performance-card">

        <div className="overview-card-header">

          <div className="overview-section-heading">

            <div className="section-heading-icon">
              P
            </div>

            <div>

              <span className="card-eyebrow">
                PRODUCT PERFORMANCE
              </span>

              <h2>
                Sales by Product
              </h2>

              <p>
                Products currently recorded in the sales system
              </p>

            </div>

          </div>

          <Link
            to="/sales"
            className="view-all-link"
          >
            View sales
            <span>
              →
            </span>
          </Link>

        </div>

        <div className="product-performance-grid">

          {PRODUCT_SALES.map((product) => (

            <div
              className="product-performance-item"
              key={product.product}
            >

              <div className="product-performance-info">

                <strong>
                  {product.product}
                </strong>

                <span>
                  {product.category}
                </span>

              </div>

              <div className="product-performance-stats">

                <strong>
                  {currency.format(product.revenue)}
                </strong>

                <span>
                  {product.transactions}{" "}
                  {product.transactions === 1
                    ? "transaction"
                    : "transactions"}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          HIGHEST PRIORITY RISKS
          ===================================================== */}

      <section className="overview-card risks-card">

        <div className="overview-card-header">

          <div className="overview-section-heading">

            <div className="section-heading-icon">
              !
            </div>

            <div>

              <span className="card-eyebrow">
                RISK MONITORING
              </span>

              <h2>
                Highest Priority Flagged Risks
              </h2>

              <p>
                Risks requiring the most immediate attention
              </p>

            </div>

          </div>

          <Link
            to="/risks"
            className="view-all-link"
          >
            View all risks
            <span>
              →
            </span>
          </Link>

        </div>

        <div className="risk-table-header">

          <span>
            Date
          </span>

          <span>
            Risk Description
          </span>

          <span>
            Severity
          </span>

          <span>
            Amount
          </span>

          <span>
            Status
          </span>

        </div>

        <div className="risk-list">

          {topRisks.length > 0 ? (

            topRisks.map((risk) => (

              <div
                className="risk-row"
                key={risk.id}
              >

                <div className="risk-date">

                  {new Date(risk.date).toLocaleDateString(
                    undefined,
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}

                </div>

                <div className="risk-description">

                  <strong>
                    {risk.description}
                  </strong>

                  <span>
                    Risk ID: {risk.id}
                  </span>

                </div>

                <div className="risk-severity">

                  <SeverityBadge
                    severity={risk.severity}
                  />

                </div>

                <div className="risk-amount">

                  {currency.format(risk.amount)}

                </div>

                <span
                  className={`risk-status risk-status-${risk.status}`}
                >

                  <span className="risk-status-dot" />

                  {risk.status}

                </span>

              </div>

            ))

          ) : (

            <div className="empty-risks">

              <div className="empty-risks-icon">
                ✓
              </div>

              <div>

                <strong>
                  No flagged risks
                </strong>

                <span>
                  There are currently no risks requiring attention.
                </span>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          BOTTOM INSIGHTS
          ===================================================== */}

      <section className="overview-bottom-grid">

        {/* ===================================================
            AI INSIGHT
            =================================================== */}

        <div className="overview-card insight-card">

          <div className="insight-icon">
            <span>
              AI
            </span>
          </div>

          <div className="insight-content">

            <span className="card-eyebrow">
              AI INSIGHT
            </span>

            <h3>
              Risk monitoring requires attention
            </h3>

            <p>
              The dashboard has identified{" "}
              <strong>
                {stats.openRisks.length}
              </strong>{" "}
              open flagged risks, including{" "}
              <strong>
                {stats.criticalOpen.length}
              </strong>{" "}
              critical items.
            </p>

          </div>

          <Link
            to="/risks"
            className="insight-link"
          >
            Review risks
            <span>
              →
            </span>
          </Link>

        </div>

        {/* ===================================================
            SYSTEM HEALTH
            =================================================== */}

        <div className="overview-card health-card">

          <div className="health-circle">

            <div className="health-circle-inner">

              <span>
                92%
              </span>

              <small>
                Healthy
              </small>

            </div>

          </div>

          <div className="health-content">

            <span className="card-eyebrow">
              SYSTEM HEALTH
            </span>

            <h3>
              Compliance Monitoring
            </h3>

            <p>
              Monitoring systems are active and continuously
              tracking transactions and risk events.
            </p>

            <div className="health-status">

              <span className="health-status-dot" />

              All monitoring services operational

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}