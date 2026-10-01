import "./OverviewSkeleton.css";

export default function OverviewSkeleton() {
  return (
    <div className="overview-skeleton">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}
      <div className="skeleton-overview-heading">
        <div>
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-subtitle" />
        </div>

        <div className="skeleton skeleton-live-status" />
      </div>


      {/* =====================================================
          KPI CARDS
          ===================================================== */}
      <section className="skeleton-kpi-grid">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="skeleton-kpi-card"
            key={index}
          >
            <div className="skeleton-kpi-top">
              <div>
                <div className="skeleton skeleton-kpi-label" />
                <div className="skeleton skeleton-kpi-caption" />
              </div>

              <div className="skeleton skeleton-kpi-icon" />
            </div>

            <div className="skeleton skeleton-kpi-value" />

            <div className="skeleton-kpi-bottom">
              <div className="skeleton skeleton-kpi-small" />
              <div className="skeleton skeleton-kpi-small short" />
            </div>
          </div>
        ))}

      </section>


      {/* =====================================================
          CHARTS
          ===================================================== */}
      <section className="skeleton-chart-grid">

        <div className="skeleton-chart-card">
          <div className="skeleton skeleton-chart-title" />
          <div className="skeleton skeleton-chart-subtitle" />

          <div className="skeleton-chart-area">
            <div className="skeleton-chart-bars">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  className="skeleton-chart-bar"
                  key={index}
                  style={{
                    height: `${35 + ((index * 17) % 55)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>


        <div className="skeleton-chart-card">
          <div className="skeleton skeleton-chart-title" />
          <div className="skeleton skeleton-chart-subtitle" />

          <div className="skeleton-category-chart">
            <div className="skeleton skeleton-category-bar large" />
            <div className="skeleton skeleton-category-bar medium" />
            <div className="skeleton skeleton-category-bar small" />
            <div className="skeleton skeleton-category-bar medium" />
            <div className="skeleton skeleton-category-bar large" />
          </div>
        </div>

      </section>


      {/* =====================================================
          RISKS TABLE
          ===================================================== */}
      <section className="skeleton-card skeleton-risks-card">

        <div className="skeleton-risk-header">
          <div>
            <div className="skeleton skeleton-eyebrow" />
            <div className="skeleton skeleton-risk-title" />
            <div className="skeleton skeleton-risk-subtitle" />
          </div>

          <div className="skeleton skeleton-view-link" />
        </div>


        <div className="skeleton-risk-table-header">
          <div className="skeleton skeleton-table-heading" />
          <div className="skeleton skeleton-table-heading" />
          <div className="skeleton skeleton-table-heading" />
          <div className="skeleton skeleton-table-heading" />
          <div className="skeleton skeleton-table-heading" />
        </div>


        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="skeleton-risk-row"
            key={index}
          >
            <div className="skeleton skeleton-risk-date" />

            <div>
              <div className="skeleton skeleton-risk-description" />
              <div className="skeleton skeleton-risk-id" />
            </div>

            <div className="skeleton skeleton-severity" />

            <div className="skeleton skeleton-risk-amount" />

            <div className="skeleton skeleton-risk-status" />
          </div>
        ))}

      </section>


      {/* =====================================================
          BOTTOM CARDS
          ===================================================== */}
      <section className="skeleton-bottom-grid">

        {/* AI Insight */}
        <div className="skeleton-card skeleton-insight-card">

          <div className="skeleton skeleton-ai-icon" />

          <div className="skeleton-insight-content">
            <div className="skeleton skeleton-eyebrow" />
            <div className="skeleton skeleton-insight-title" />
            <div className="skeleton skeleton-insight-text" />
            <div className="skeleton skeleton-insight-text short" />
          </div>

          <div className="skeleton skeleton-insight-link" />

        </div>


        {/* System Health */}
        <div className="skeleton-card skeleton-health-card">

          <div className="skeleton skeleton-health-circle" />

          <div className="skeleton-health-content">
            <div className="skeleton skeleton-eyebrow" />
            <div className="skeleton skeleton-health-title" />
            <div className="skeleton skeleton-health-text" />
            <div className="skeleton skeleton-health-text short" />
            <div className="skeleton skeleton-health-status" />
          </div>

        </div>

      </section>

    </div>
  );
}