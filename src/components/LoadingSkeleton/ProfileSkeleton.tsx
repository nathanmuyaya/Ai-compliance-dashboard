import "./ProfileSkeleton.css";

export default function ProfileSkeleton() {
  return (
    <main className="profile-skeleton-page">

      {/* PAGE HEADER */}
      <section className="profile-skeleton-header">
        <div>
          <div className="profile-skeleton-label" />
          <div className="profile-skeleton-title" />
          <div className="profile-skeleton-subtitle" />
        </div>
      </section>

      {/* PROFILE OVERVIEW */}
      <section className="profile-skeleton-overview">

        <div className="profile-skeleton-cover" />

        <div className="profile-skeleton-overview-content">

          <div className="profile-skeleton-photo-wrapper">
            <div className="profile-skeleton-photo" />
            <div className="profile-skeleton-camera" />
          </div>

          <div className="profile-skeleton-main-info">
            <div>
              <div className="profile-skeleton-name" />
              <div className="profile-skeleton-role" />
            </div>

            <div className="profile-skeleton-status" />
          </div>

        </div>

      </section>

      {/* MAIN GRID */}
      <section className="profile-skeleton-grid">

        {/* PERSONAL INFORMATION */}
        <div className="profile-skeleton-card">

          <div className="profile-skeleton-card-header">
            <div>
              <div className="profile-skeleton-card-label" />
              <div className="profile-skeleton-card-title" />
            </div>

            <div className="profile-skeleton-icon" />
          </div>

          <div className="profile-skeleton-details">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="profile-skeleton-detail"
                key={index}
              >
                <div className="profile-skeleton-detail-label" />
                <div className="profile-skeleton-detail-value" />
              </div>
            ))}

          </div>

        </div>

        {/* ACCOUNT SECURITY */}
        <div className="profile-skeleton-card">

          <div className="profile-skeleton-card-header">
            <div>
              <div className="profile-skeleton-card-label" />
              <div className="profile-skeleton-card-title" />
            </div>

            <div className="profile-skeleton-icon" />
          </div>

          <div className="profile-skeleton-security-list">

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="profile-skeleton-security-item"
                key={index}
              >
                <div className="profile-skeleton-security-icon" />

                <div className="profile-skeleton-security-content">
                  <div className="profile-skeleton-security-title" />
                  <div className="profile-skeleton-security-text" />
                </div>

                <div className="profile-skeleton-security-status" />
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ACCOUNT ACTIVITY */}
      <section className="profile-skeleton-card profile-skeleton-activity">

        <div className="profile-skeleton-card-header">
          <div>
            <div className="profile-skeleton-card-label" />
            <div className="profile-skeleton-card-title" />
          </div>

          <div className="profile-skeleton-icon" />
        </div>

        <div className="profile-skeleton-activity-list">

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="profile-skeleton-activity-item"
              key={index}
            >
              <div className="profile-skeleton-dot" />

              <div className="profile-skeleton-activity-content">
                <div className="profile-skeleton-activity-title" />
                <div className="profile-skeleton-activity-time" />
              </div>

              <div className="profile-skeleton-device" />
            </div>
          ))}

        </div>

      </section>

    </main>
  );
}