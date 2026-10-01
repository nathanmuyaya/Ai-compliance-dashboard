import "./SalesSkeleton.css";

export default function SalesSkeleton() {
  return (
    <main className="sales-page sales-skeleton-page">

      {/* PAGE HEADER */}
      <section className="sales-header">
        <div>
          <div className="skeleton skeleton-label" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-subtitle" />
        </div>

        <div className="skeleton skeleton-export-button" />
      </section>

      {/* KPI CARDS */}
      <section className="sales-kpi-grid">

        {[1, 2, 3, 4].map((item) => (
          <div className="sales-kpi-card skeleton-card" key={item}>
            <div className="skeleton skeleton-kpi-label" />
            <div className="skeleton skeleton-kpi-value" />
            <div className="skeleton skeleton-kpi-small" />
          </div>
        ))}

      </section>

      {/* REVENUE OVERVIEW */}
      <section className="sales-panel revenue-panel">

        <div className="sales-panel-header">
          <div>
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-panel-title" />
            <div className="skeleton skeleton-panel-subtitle" />
          </div>

          <div className="revenue-total">
            <div className="skeleton skeleton-revenue-label" />
            <div className="skeleton skeleton-revenue-value" />
          </div>
        </div>

        <div className="sales-revenue-skeleton-chart">

          <div className="skeleton-y-axis">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                className="skeleton skeleton-axis-label"
                key={item}
              />
            ))}
          </div>

          <div className="skeleton-chart-area">

            <div className="skeleton-chart-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <span key={item} />
              ))}
            </div>

            <div className="skeleton-bars">

              {[45, 70, 55, 82, 62, 74].map(
                (height, index) => (
                  <div
                    className="skeleton-bar-column"
                    key={index}
                  >
                    <div className="skeleton skeleton-bar-value" />

                    <div className="skeleton-bar-wrapper">
                      <div
                        className="skeleton skeleton-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    <div className="skeleton skeleton-product-label" />
                    <div className="skeleton skeleton-date-label" />
                  </div>
                )
              )}

            </div>
          </div>

        </div>

      </section>

      {/* CATEGORY PERFORMANCE */}
      <section className="sales-panel">

        <div className="sales-panel-header">
          <div>
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-panel-title" />
            <div className="skeleton skeleton-panel-subtitle" />
          </div>
        </div>

        <div className="category-performance">

          {[1, 2].map((item) => (
            <div className="category-row" key={item}>

              <div className="category-info">
                <div className="skeleton skeleton-category-name" />
                <div className="skeleton skeleton-category-value" />
              </div>

              <div className="category-progress">
                <div className="skeleton skeleton-progress" />
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* AI PRODUCT HANDOVER DETECTION */}
      <section className="handover-section">

        <div className="handover-header">

          <div>
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-handover-title" />
            <div className="skeleton skeleton-handover-subtitle" />
          </div>

          <div className="skeleton skeleton-ai-status" />

        </div>

        {/* HANDOVER SUMMARY */}
        <div className="handover-summary">

          {[1, 2, 3, 4].map((item) => (
            <div className="handover-stat" key={item}>

              <div className="skeleton skeleton-handover-icon" />

              <div>
                <div className="skeleton skeleton-stat-number" />
                <div className="skeleton skeleton-stat-label" />
              </div>

            </div>
          ))}

        </div>

        {/* HANDOVER TABLE */}
        <div className="handover-table-wrapper">

          <table className="handover-table">

            <thead>
              <tr>
                <th>Handover ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Sale Amount</th>
                <th>AI Detection</th>
                <th>Risk Level</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>

                  <td>
                    <div className="skeleton skeleton-table-text" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-product" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text medium" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text short" />
                  </td>

                  <td>
                    <div className="skeleton-confidence">
                      <div className="skeleton skeleton-confidence-bar" />
                      <div className="skeleton skeleton-confidence-value" />
                    </div>
                  </td>

                  <td>
                    <div className="skeleton skeleton-badge" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-status" />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* RECENT SALES */}
      <section className="sales-panel">

        <div className="sales-panel-header">

          <div>
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-panel-title" />
            <div className="skeleton skeleton-panel-subtitle" />
          </div>

          <div className="skeleton skeleton-search" />

        </div>

        {/* FILTERS */}
        <div className="sales-filters">

          <div className="skeleton skeleton-filter active" />
          <div className="skeleton skeleton-filter" />
          <div className="skeleton skeleton-filter" />
          <div className="skeleton skeleton-filter" />
          <div className="skeleton skeleton-select" />

        </div>

        {/* SALES TABLE */}
        <div className="sales-table-wrapper">

          <table className="sales-table">

            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item}>

                  <td>
                    <div className="skeleton skeleton-table-text short" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text medium" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text medium" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text short" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-status" />
                  </td>

                  <td>
                    <div className="skeleton skeleton-table-text medium" />
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