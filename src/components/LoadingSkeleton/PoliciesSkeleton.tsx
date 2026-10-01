import "./PoliciesSkeleton.css";

export default function PoliciesSkeleton() {
  return (
    <main className="policies-page policies-skeleton-page">

      {/* PAGE HEADER */}
      <section className="policies-header">

        <div>
          <div className="policy-skeleton skeleton-eyebrow" />
          <div className="policy-skeleton skeleton-title" />
          <div className="policy-skeleton skeleton-subtitle" />
        </div>

        <div className="policy-skeleton skeleton-add-button" />

      </section>

      {/* SUMMARY CARDS */}
      <section className="policy-summary-grid">

        {[1, 2, 3, 4].map((item) => (
          <div
            className="policy-card policy-skeleton-card"
            key={item}
          >
            <div className="policy-skeleton skeleton-card-label" />

            <div className="policy-skeleton skeleton-card-value" />

            <div className="policy-skeleton skeleton-card-small" />
          </div>
        ))}

      </section>

      {/* POLICY REGISTER */}
      <section className="policies-panel">

        <div className="policies-panel-header">

          <div>
            <div className="policy-skeleton skeleton-register-title" />

            <div className="policy-skeleton skeleton-register-count" />
          </div>

          <div className="policy-skeleton skeleton-search" />

        </div>

        {/* FILTERS */}
        <div className="policy-filters">

          <div className="policy-skeleton skeleton-filter" />

          <div className="policy-skeleton skeleton-filter" />

        </div>

        {/* TABLE */}
        <div className="policies-table-wrapper">

          <table className="policies-table">

            <thead>
              <tr>
                <th>Policy</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Last Reviewed</th>
                <th>Next Review</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>

                  {/* POLICY */}
                  <td>
                    <div className="policy-skeleton-policy">

                      <div className="policy-skeleton skeleton-policy-name" />

                      <div className="policy-skeleton skeleton-policy-id" />

                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td>
                    <div className="policy-skeleton skeleton-table-text" />
                  </td>

                  {/* OWNER */}
                  <td>
                    <div className="policy-skeleton skeleton-table-text owner" />
                  </td>

                  {/* STATUS */}
                  <td>
                    <div className="policy-skeleton skeleton-status" />
                  </td>

                  {/* LAST REVIEWED */}
                  <td>
                    <div className="policy-skeleton skeleton-date" />
                  </td>

                  {/* NEXT REVIEW */}
                  <td>
                    <div className="policy-skeleton skeleton-date" />
                  </td>

                  {/* ACTION */}
                  <td>
                    <div className="policy-skeleton skeleton-view-button" />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}