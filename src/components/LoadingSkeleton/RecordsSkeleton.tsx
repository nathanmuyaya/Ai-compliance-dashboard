import "./RecordsSkeleton.css";

export default function RecordsSkeleton() {
  return (
    <main className="records-skeleton-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="records-skeleton-header">

        <div className="records-skeleton-header-content">

          <div className="records-skeleton-eyebrow skeleton-shimmer" />

          <div className="records-skeleton-title skeleton-shimmer" />

          <div className="records-skeleton-description skeleton-shimmer" />

          <div className="records-skeleton-description short skeleton-shimmer" />

        </div>


        <div className="records-skeleton-add-button skeleton-shimmer" />

      </header>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <section className="records-skeleton-kpis">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            className="records-skeleton-kpi"
            key={index}
          >

            <div className="records-skeleton-kpi-icon skeleton-shimmer" />

            <div className="records-skeleton-kpi-content">

              <div className="records-skeleton-kpi-label skeleton-shimmer" />

              <div className="records-skeleton-kpi-value skeleton-shimmer" />

              <div className="records-skeleton-kpi-small skeleton-shimmer" />

            </div>

          </div>

        ))}

      </section>


      {/* =====================================================
          AI CONFIDENCE SUMMARY
      ===================================================== */}

      <section className="records-skeleton-summary">

        <div className="records-skeleton-summary-content">

          <div className="records-skeleton-summary-label skeleton-shimmer" />

          <div className="records-skeleton-summary-value skeleton-shimmer" />

          <div className="records-skeleton-summary-text skeleton-shimmer" />

        </div>


        <div className="records-skeleton-progress skeleton-shimmer">

          <div className="records-skeleton-progress-fill skeleton-shimmer" />

        </div>

      </section>


      {/* =====================================================
          RECORDS PANEL
      ===================================================== */}

      <section className="records-skeleton-panel">

        {/* PANEL HEADER */}

        <div className="records-skeleton-panel-header">

          <div>

            <div className="records-skeleton-panel-title skeleton-shimmer" />

            <div className="records-skeleton-panel-description skeleton-shimmer" />

          </div>


          <div className="records-skeleton-controls">

            <div className="records-skeleton-search skeleton-shimmer" />

            <div className="records-skeleton-filter skeleton-shimmer" />

            <div className="records-skeleton-filter skeleton-shimmer" />

          </div>

        </div>


        {/* ===================================================
            DESKTOP TABLE
        =================================================== */}

        <div className="records-skeleton-table-wrapper">

          <div className="records-skeleton-table">

            {/* TABLE HEADER */}

            <div className="records-skeleton-table-row header">

              <div className="records-col col-record skeleton-shimmer" />
              <div className="records-col col-time skeleton-shimmer" />
              <div className="records-col col-employee skeleton-shimmer" />
              <div className="records-col col-item skeleton-shimmer" />
              <div className="records-col col-detection skeleton-shimmer" />
              <div className="records-col col-confidence skeleton-shimmer" />
              <div className="records-col col-risk skeleton-shimmer" />
              <div className="records-col col-status skeleton-shimmer" />
              <div className="records-col col-action skeleton-shimmer" />

            </div>


            {/* TABLE ROWS */}

            {Array.from({ length: 6 }).map((_, index) => (

              <div
                className="records-skeleton-table-row"
                key={index}
              >

                <div className="records-col col-record">

                  <div className="skeleton-record-id skeleton-shimmer" />

                  <div className="skeleton-record-subtext skeleton-shimmer" />

                </div>


                <div className="records-col col-time">

                  <div className="skeleton-time skeleton-shimmer" />

                </div>


                <div className="records-col col-employee">

                  <div className="skeleton-employee skeleton-shimmer" />

                </div>


                <div className="records-col col-item">

                  <div className="skeleton-item skeleton-shimmer" />

                </div>


                <div className="records-col col-detection">

                  <div className="skeleton-detection">

                    <div className="skeleton-detection-dot skeleton-shimmer" />

                    <div>

                      <div className="skeleton-detection-title skeleton-shimmer" />

                      <div className="skeleton-detection-subtitle skeleton-shimmer" />

                    </div>

                  </div>

                </div>


                <div className="records-col col-confidence">

                  <div className="skeleton-confidence-value skeleton-shimmer" />

                  <div className="skeleton-confidence-bar skeleton-shimmer" />

                </div>


                <div className="records-col col-risk">

                  <div className="skeleton-risk-badge skeleton-shimmer" />

                </div>


                <div className="records-col col-status">

                  <div className="skeleton-status-badge skeleton-shimmer" />

                </div>


                <div className="records-col col-action">

                  <div className="skeleton-action-button skeleton-shimmer" />

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CARDS
      ===================================================== */}

      <section className="records-skeleton-bottom-grid">

        {/* AI INSIGHT */}

        <div className="records-skeleton-bottom-card">

          <div className="records-skeleton-card-label skeleton-shimmer" />

          <div className="records-skeleton-card-title skeleton-shimmer" />

          <div className="records-skeleton-card-line skeleton-shimmer" />

          <div className="records-skeleton-card-line short skeleton-shimmer" />

          <div className="records-skeleton-insight-stat">

            <div className="records-skeleton-stat-value skeleton-shimmer" />

            <div className="records-skeleton-stat-label skeleton-shimmer" />

          </div>

        </div>


        {/* RECENT EXCEPTIONS */}

        <div className="records-skeleton-bottom-card">

          <div className="records-skeleton-card-label skeleton-shimmer" />

          <div className="records-skeleton-card-title skeleton-shimmer" />


          <div className="records-skeleton-exception-list">

            {Array.from({ length: 3 }).map((_, index) => (

              <div
                className="records-skeleton-exception"
                key={index}
              >

                <div>

                  <div className="skeleton-exception-title skeleton-shimmer" />

                  <div className="skeleton-exception-meta skeleton-shimmer" />

                </div>

                <div className="skeleton-exception-button skeleton-shimmer" />

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}