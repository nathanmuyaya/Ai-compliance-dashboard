import "./SettingsSkeleton.css";

export default function SettingsSkeleton() {
  return (
    <main className="settings-skeleton-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="settings-skeleton-hero">

        <div className="settings-skeleton-hero-content">

          <div className="settings-skeleton-hero-icon skeleton-shimmer" />

          <div className="settings-skeleton-hero-text">
            <div className="settings-skeleton-eyebrow skeleton-shimmer" />
            <div className="settings-skeleton-title skeleton-shimmer" />
            <div className="settings-skeleton-description skeleton-shimmer" />
            <div className="settings-skeleton-description short skeleton-shimmer" />
          </div>

        </div>

        <div className="settings-skeleton-save skeleton-shimmer" />

      </section>


      {/* =====================================================
          QUICK STATUS
      ===================================================== */}

      <section className="settings-skeleton-overview">

        <div className="settings-skeleton-overview-item">
          <div className="settings-skeleton-overview-icon skeleton-shimmer" />

          <div className="settings-skeleton-overview-text">
            <div className="settings-skeleton-overview-label skeleton-shimmer" />
            <div className="settings-skeleton-overview-value skeleton-shimmer" />
          </div>
        </div>


        <div className="settings-skeleton-divider" />


        <div className="settings-skeleton-overview-item">
          <div className="settings-skeleton-overview-icon skeleton-shimmer" />

          <div className="settings-skeleton-overview-text">
            <div className="settings-skeleton-overview-label skeleton-shimmer" />
            <div className="settings-skeleton-overview-value skeleton-shimmer" />
          </div>
        </div>


        <div className="settings-skeleton-divider" />


        <div className="settings-skeleton-overview-item">
          <div className="settings-skeleton-overview-icon skeleton-shimmer" />

          <div className="settings-skeleton-overview-text">
            <div className="settings-skeleton-overview-label skeleton-shimmer" />
            <div className="settings-skeleton-overview-value skeleton-shimmer" />
          </div>
        </div>


        <div className="settings-skeleton-divider" />


        <div className="settings-skeleton-overview-item">
          <div className="settings-skeleton-overview-icon skeleton-shimmer" />

          <div className="settings-skeleton-overview-text">
            <div className="settings-skeleton-overview-label skeleton-shimmer" />
            <div className="settings-skeleton-overview-value region skeleton-shimmer" />
          </div>
        </div>

      </section>


      {/* =====================================================
          MAIN SETTINGS GRID
      ===================================================== */}

      <div className="settings-skeleton-grid">


        {/* ===================================================
            APPEARANCE
        =================================================== */}

        <section className="settings-skeleton-panel">

          <div className="settings-skeleton-panel-header">

            <div className="settings-skeleton-panel-icon skeleton-shimmer" />

            <div>
              <div className="settings-skeleton-panel-label skeleton-shimmer" />
              <div className="settings-skeleton-panel-title skeleton-shimmer" />
            </div>

          </div>


          <div className="settings-skeleton-theme-preview">

            <div className="settings-skeleton-preview-top">
              <span />
              <span />
              <span />
            </div>

            <div className="settings-skeleton-preview-body">

              <div className="settings-skeleton-preview-sidebar" />

              <div className="settings-skeleton-preview-content">
                <span />
                <span />
                <span />
              </div>

            </div>

            <div className="settings-skeleton-preview-footer">
              <div className="settings-skeleton-preview-label skeleton-shimmer" />
              <div className="settings-skeleton-active skeleton-shimmer" />
            </div>

          </div>


          <div className="settings-skeleton-control-row">

            <div className="settings-skeleton-control-info">

              <div className="settings-skeleton-control-icon skeleton-shimmer" />

              <div>
                <div className="settings-skeleton-control-title skeleton-shimmer" />
                <div className="settings-skeleton-control-description skeleton-shimmer" />
                <div className="settings-skeleton-control-description short skeleton-shimmer" />
              </div>

            </div>

            <div className="settings-skeleton-toggle skeleton-shimmer" />

          </div>

        </section>


        {/* ===================================================
            BRIGHTNESS
        =================================================== */}

        <section className="settings-skeleton-panel">

          <div className="settings-skeleton-panel-header">

            <div className="settings-skeleton-panel-icon skeleton-shimmer" />

            <div>
              <div className="settings-skeleton-panel-label skeleton-shimmer" />
              <div className="settings-skeleton-panel-title skeleton-shimmer" />
            </div>

          </div>


          <div className="settings-skeleton-brightness-value">

            <div className="settings-skeleton-percentage skeleton-shimmer" />
            <div className="settings-skeleton-brightness-label skeleton-shimmer" />

          </div>


          <div className="settings-skeleton-slider">

            <div className="settings-skeleton-slider-label skeleton-shimmer" />

            <div className="settings-skeleton-slider-track">
              <div className="settings-skeleton-slider-progress" />
              <div className="settings-skeleton-slider-thumb" />
            </div>

            <div className="settings-skeleton-slider-label right skeleton-shimmer" />

          </div>


          <div className="settings-skeleton-brightness-preview">

            <div className="settings-skeleton-preview-icon skeleton-shimmer" />

            <div>
              <div className="settings-skeleton-control-title skeleton-shimmer" />
              <div className="settings-skeleton-control-description skeleton-shimmer" />
            </div>

          </div>

        </section>


        {/* ===================================================
            NOTIFICATIONS
        =================================================== */}

        <section className="settings-skeleton-panel">

          <div className="settings-skeleton-panel-header">

            <div className="settings-skeleton-panel-icon skeleton-shimmer" />

            <div>
              <div className="settings-skeleton-panel-label skeleton-shimmer" />
              <div className="settings-skeleton-panel-title skeleton-shimmer" />
            </div>

          </div>


          <div className="settings-skeleton-control-row">

            <div className="settings-skeleton-control-info">

              <div className="settings-skeleton-control-icon skeleton-shimmer" />

              <div>
                <div className="settings-skeleton-control-title wide skeleton-shimmer" />
                <div className="settings-skeleton-control-description skeleton-shimmer" />
                <div className="settings-skeleton-control-description short skeleton-shimmer" />
              </div>

            </div>

            <div className="settings-skeleton-toggle skeleton-shimmer" />

          </div>

        </section>


        {/* ===================================================
            SECURITY
        =================================================== */}

        <section className="settings-skeleton-panel">

          <div className="settings-skeleton-panel-header">

            <div className="settings-skeleton-panel-icon skeleton-shimmer" />

            <div>
              <div className="settings-skeleton-panel-label skeleton-shimmer" />
              <div className="settings-skeleton-panel-title skeleton-shimmer" />
            </div>

            <div className="settings-skeleton-security-badge skeleton-shimmer" />

          </div>


          <div className="settings-skeleton-security-controls">

            <div className="settings-skeleton-control-row">

              <div className="settings-skeleton-control-info">

                <div className="settings-skeleton-control-icon skeleton-shimmer" />

                <div>
                  <div className="settings-skeleton-control-title wide skeleton-shimmer" />
                  <div className="settings-skeleton-control-description skeleton-shimmer" />
                  <div className="settings-skeleton-control-description short skeleton-shimmer" />
                </div>

              </div>

              <div className="settings-skeleton-toggle skeleton-shimmer" />

            </div>


            <div className="settings-skeleton-control-row">

              <div className="settings-skeleton-control-info">

                <div className="settings-skeleton-control-icon skeleton-shimmer" />

                <div>
                  <div className="settings-skeleton-control-title skeleton-shimmer" />
                  <div className="settings-skeleton-control-description skeleton-shimmer" />
                  <div className="settings-skeleton-control-description short skeleton-shimmer" />
                </div>

              </div>

              <div className="settings-skeleton-toggle skeleton-shimmer" />

            </div>

          </div>

        </section>


        {/* ===================================================
            REGIONAL SETTINGS
        =================================================== */}

        <section className="settings-skeleton-panel">

          <div className="settings-skeleton-panel-header">

            <div className="settings-skeleton-panel-icon skeleton-shimmer" />

            <div>
              <div className="settings-skeleton-panel-label skeleton-shimmer" />
              <div className="settings-skeleton-panel-title regional skeleton-shimmer" />
            </div>

          </div>


          <div className="settings-skeleton-regional-fields">

            <div className="settings-skeleton-field">

              <div className="settings-skeleton-field-label skeleton-shimmer" />

              <div className="settings-skeleton-select skeleton-shimmer">
                <span />
              </div>

            </div>


            <div className="settings-skeleton-field">

              <div className="settings-skeleton-field-label skeleton-shimmer" />

              <div className="settings-skeleton-select skeleton-shimmer">
                <span />
              </div>

            </div>

          </div>

        </section>

      </div>


      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <section className="settings-skeleton-system-status">

        <div className="settings-skeleton-system-left">

          <div className="settings-skeleton-status-indicator skeleton-shimmer" />

          <div>
            <div className="settings-skeleton-system-title skeleton-shimmer" />
            <div className="settings-skeleton-system-description skeleton-shimmer" />
          </div>

        </div>


        <div className="settings-skeleton-version">

          <div className="settings-skeleton-version-label skeleton-shimmer" />
          <div className="settings-skeleton-version-value skeleton-shimmer" />

        </div>

      </section>

    </main>
  );
}