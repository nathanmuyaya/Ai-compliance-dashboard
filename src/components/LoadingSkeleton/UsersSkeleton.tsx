import "./UsersSkeleton.css";

export default function UsersSkeleton() {
  return (
    <div className="users-skeleton-page">

      {/* Header */}
      <div className="users-skeleton-header">

        <div>
          <div className="users-skeleton-title" />
          <div className="users-skeleton-subtitle" />
        </div>

        <div className="users-skeleton-button" />

      </div>

      {/* Summary */}
      <div className="users-skeleton-summary">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="users-skeleton-card"
            key={index}
          >
            <div className="users-skeleton-small" />
            <div className="users-skeleton-number" />
          </div>
        ))}

      </div>

      {/* Main Panel */}
      <div className="users-skeleton-panel">

        {/* Toolbar */}
        <div className="users-skeleton-toolbar">

          <div className="users-skeleton-search" />

          <div className="users-skeleton-filter" />

        </div>

        {/* Table */}
        <div className="users-skeleton-table">

          <div className="users-skeleton-table-header">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} />
            ))}
          </div>

          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              className="users-skeleton-row"
              key={rowIndex}
            >

              <div className="users-skeleton-user">
                <div className="users-skeleton-avatar" />

                <div>
                  <div className="users-skeleton-name" />
                  <div className="users-skeleton-email" />
                </div>
              </div>

              <div className="users-skeleton-cell" />
              <div className="users-skeleton-status" />
              <div className="users-skeleton-cell" />

              <div className="users-skeleton-actions">
                <div />
                <div />
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}