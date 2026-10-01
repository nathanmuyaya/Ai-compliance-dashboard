import "./ReportsSkeleton.css";

export default function ReportsSkeleton() {
  return (
    <main className="reports-skeleton-page">

      {/* =========================
          HERO
      ========================= */}
      <section className="reports-skeleton-hero">

        <div className="reports-skeleton-hero-content">
          <div className="reports-skeleton-overline" />

          <div className="reports-skeleton-heading" />

          <div className="reports-skeleton-description" />
          <div className="reports-skeleton-description-short" />
        </div>

        <div className="reports-skeleton-hero-orb" />

      </section>


      {/* =========================
          KPI CARDS
      ========================= */}
      <section className="reports-skeleton-kpi-grid">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="reports-skeleton-kpi-card"
            key={index}
          >
            <div className="reports-skeleton-kpi-label" />

            <div className="reports-skeleton-kpi-value" />
          </div>
        ))}

      </section>


      {/* =========================
          REPORT LIBRARY
      ========================= */}
      <section className="reports-skeleton-library">

        {/* HEADER */}
        <div className="reports-skeleton-library-header">

          <div>
            <div className="reports-skeleton-section-label" />

            <div className="reports-skeleton-library-title" />
          </div>

          <div className="reports-skeleton-search" />

        </div>


        {/* REPORT GRID */}
        <div className="reports-skeleton-report-grid">

          {Array.from({ length: 4 }).map((_, index) => (
            <article
              className="reports-skeleton-report-card"
              key={index}
            >

              {/* TYPE + STATUS */}
              <div className="reports-skeleton-card-top">

                <div className="reports-skeleton-type" />

                <div className="reports-skeleton-status" />

              </div>


              {/* REPORT ID */}
              <div className="reports-skeleton-id" />


              {/* REPORT TITLE */}
              <div className="reports-skeleton-title" />

              <div className="reports-skeleton-title-second" />


              {/* SCORE */}
              <div className="reports-skeleton-score">

                <div className="reports-skeleton-score-label" />

                <div className="reports-skeleton-score-value" />

              </div>


              {/* BUTTON */}
              <div className="reports-skeleton-button" />

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}