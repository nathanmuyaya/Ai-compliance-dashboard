import "./AlertsSkeleton.css";

export default function AlertsSkeleton() {
  return (
    <main className="alerts-skeleton-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="alerts-skeleton-header">

        <div className="alerts-skeleton-eyebrow skeleton-shimmer" />

        <div className="alerts-skeleton-title skeleton-shimmer" />

        <div className="alerts-skeleton-description skeleton-shimmer" />

        <div className="alerts-skeleton-description short skeleton-shimmer" />

      </header>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <section className="alerts-skeleton-kpis">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="alerts-skeleton-kpi-card"
            key={index}
          >

            <div className="alerts-skeleton-kpi-icon skeleton-shimmer" />

            <div className="alerts-skeleton-kpi-content">

              <div className="alerts-skeleton-kpi-label skeleton-shimmer" />

              <div className="alerts-skeleton-kpi-value skeleton-shimmer" />

              <div className="alerts-skeleton-kpi-small skeleton-shimmer" />

            </div>

          </div>
        ))}

      </section>


      {/* =====================================================
          ALERT CENTER
      ===================================================== */}

      <section className="alerts-skeleton-panel">

        {/* PANEL HEADER */}

        <div className="alerts-skeleton-panel-header">

          <div>

            <div className="alerts-skeleton-panel-title skeleton-shimmer" />

            <div className="alerts-skeleton-panel-description skeleton-shimmer" />

          </div>


          <div className="alerts-skeleton-controls">

            <div className="alerts-skeleton-search skeleton-shimmer" />

            <div className="alerts-skeleton-filter skeleton-shimmer" />

            <div className="alerts-skeleton-filter skeleton-shimmer" />

          </div>

        </div>


        {/* ===================================================
            ALERT ITEMS
        =================================================== */}

        <div className="alerts-skeleton-list">

          {Array.from({ length: 5 }).map((_, index) => (

            <div
              className="alerts-skeleton-item"
              key={index}
            >

              {/* INDICATOR */}

              <div className="alerts-skeleton-indicator skeleton-shimmer" />


              {/* CONTENT */}

              <div className="alerts-skeleton-content">

                <div className="alerts-skeleton-title-row">

                  <div className="alerts-skeleton-title-area">

                    <div className="alerts-skeleton-id skeleton-shimmer" />

                    <div className="alerts-skeleton-alert-title skeleton-shimmer" />

                  </div>

                  <div className="alerts-skeleton-severity skeleton-shimmer" />

                </div>


                <div className="alerts-skeleton-description-line skeleton-shimmer" />

                <div className="alerts-skeleton-description-line short skeleton-shimmer" />


                <div className="alerts-skeleton-meta">

                  <div className="alerts-skeleton-meta-item skeleton-shimmer" />

                  <div className="alerts-skeleton-dot skeleton-shimmer" />

                  <div className="alerts-skeleton-meta-source skeleton-shimmer" />

                  <div className="alerts-skeleton-dot skeleton-shimmer" />

                  <div className="alerts-skeleton-status skeleton-shimmer" />

                </div>

              </div>


              {/* ACTIONS */}

              <div className="alerts-skeleton-actions">

                <div className="alerts-skeleton-view-button skeleton-shimmer" />

                {index !== 4 && (
                  <div className="alerts-skeleton-resolve-button skeleton-shimmer" />
                )}

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}