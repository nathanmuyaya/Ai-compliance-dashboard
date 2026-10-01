import "./RisksSkeleton.css";

export default function RisksSkeleton() {
  return (
    <main className="risks-skeleton-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="risks-skeleton-header">

        <div className="risks-skeleton-header-content">

          <div className="risks-skeleton-eyebrow skeleton-shimmer" />

          <div className="risks-skeleton-title skeleton-shimmer" />

          <div className="risks-skeleton-description skeleton-shimmer" />
          <div className="risks-skeleton-description short skeleton-shimmer" />

        </div>

        <div className="risks-skeleton-back skeleton-shimmer" />

      </header>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="risks-skeleton-summary">

        <div className="risks-skeleton-summary-card">

          <div className="risks-skeleton-summary-icon skeleton-shimmer" />

          <div>
            <div className="risks-skeleton-summary-label skeleton-shimmer" />
            <div className="risks-skeleton-summary-value skeleton-shimmer" />
          </div>

        </div>


        <div className="risks-skeleton-summary-card">

          <div className="risks-skeleton-summary-icon skeleton-shimmer" />

          <div>
            <div className="risks-skeleton-summary-label skeleton-shimmer" />
            <div className="risks-skeleton-summary-value skeleton-shimmer" />
          </div>

        </div>


        <div className="risks-skeleton-summary-card">

          <div className="risks-skeleton-summary-icon skeleton-shimmer" />

          <div>
            <div className="risks-skeleton-summary-label skeleton-shimmer" />
            <div className="risks-skeleton-summary-value skeleton-shimmer" />
          </div>

        </div>


        <div className="risks-skeleton-summary-card">

          <div className="risks-skeleton-summary-icon skeleton-shimmer" />

          <div>
            <div className="risks-skeleton-summary-label skeleton-shimmer" />
            <div className="risks-skeleton-summary-value skeleton-shimmer" />
          </div>

        </div>


        <div className="risks-skeleton-summary-card">

          <div className="risks-skeleton-summary-icon skeleton-shimmer" />

          <div>
            <div className="risks-skeleton-summary-label skeleton-shimmer" />
            <div className="risks-skeleton-summary-value exposure skeleton-shimmer" />
          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN RISK REGISTER
      ===================================================== */}

      <section className="risks-skeleton-panel">

        {/* PANEL HEADER */}

        <div className="risks-skeleton-panel-header">

          <div>

            <div className="risks-skeleton-panel-eyebrow skeleton-shimmer" />

            <div className="risks-skeleton-panel-title skeleton-shimmer" />

            <div className="risks-skeleton-panel-subtitle skeleton-shimmer" />

          </div>

          <div className="risks-skeleton-resolved skeleton-shimmer" />

        </div>


        {/* FILTERS */}

        <div className="risks-skeleton-controls">

          <div className="risks-skeleton-search skeleton-shimmer">

            <span />

            <div />

          </div>

          <div className="risks-skeleton-select skeleton-shimmer" />

          <div className="risks-skeleton-select skeleton-shimmer" />

        </div>


        {/* TABLE */}

        <div className="risks-skeleton-table-wrapper">

          <div className="risks-skeleton-table">

            {/* TABLE HEADER */}

            <div className="risks-skeleton-table-row header">

              <div className="risk-col risk-col-id skeleton-shimmer" />
              <div className="risk-col risk-col-date skeleton-shimmer" />
              <div className="risk-col risk-col-description skeleton-shimmer" />
              <div className="risk-col risk-col-severity skeleton-shimmer" />
              <div className="risk-col risk-col-amount skeleton-shimmer" />
              <div className="risk-col risk-col-status skeleton-shimmer" />
              <div className="risk-col risk-col-action skeleton-shimmer" />

            </div>


            {/* TABLE ROWS */}

            {Array.from({ length: 6 }).map((_, index) => (

              <div
                className="risks-skeleton-table-row"
                key={index}
              >

                <div className="risk-col risk-col-id">
                  <div className="skeleton-risk-id skeleton-shimmer" />
                </div>

                <div className="risk-col risk-col-date">
                  <div className="skeleton-risk-date skeleton-shimmer" />
                </div>

                <div className="risk-col risk-col-description">
                  <div className="skeleton-risk-description skeleton-shimmer" />
                </div>

                <div className="risk-col risk-col-severity">
                  <div className="skeleton-risk-badge skeleton-shimmer" />
                </div>

                <div className="risk-col risk-col-amount">
                  <div className="skeleton-risk-amount skeleton-shimmer" />
                </div>

                <div className="risk-col risk-col-status">
                  <div className="skeleton-risk-status skeleton-shimmer" />
                </div>

                <div className="risk-col risk-col-action">
                  <div className="skeleton-risk-button skeleton-shimmer" />
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* MOBILE PREVIEW */}

        <div className="risks-skeleton-mobile">

          {Array.from({ length: 3 }).map((_, index) => (

            <article
              className="risks-skeleton-mobile-card"
              key={index}
            >

              <div className="risks-skeleton-mobile-top">

                <div className="skeleton-mobile-id skeleton-shimmer" />

                <div className="skeleton-mobile-badge skeleton-shimmer" />

              </div>


              <div className="skeleton-mobile-title skeleton-shimmer" />
              <div className="skeleton-mobile-title short skeleton-shimmer" />


              <div className="risks-skeleton-mobile-info">

                <div>
                  <div className="skeleton-mobile-label skeleton-shimmer" />
                  <div className="skeleton-mobile-value skeleton-shimmer" />
                </div>

                <div>
                  <div className="skeleton-mobile-label skeleton-shimmer" />
                  <div className="skeleton-mobile-value skeleton-shimmer" />
                </div>

                <div>
                  <div className="skeleton-mobile-label skeleton-shimmer" />
                  <div className="skeleton-mobile-value skeleton-shimmer" />
                </div>

              </div>


              <div className="skeleton-mobile-button skeleton-shimmer" />

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}