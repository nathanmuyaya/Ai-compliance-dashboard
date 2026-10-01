import { useEffect, useMemo, useState } from "react";
import "./AlertsPage.css";
import AlertsSkeleton from "../components/LoadingSkeleton/AlertsSkeleton.tsx";

type AlertSeverity = "Critical" | "High" | "Medium" | "Low";
type AlertStatus = "Open" | "Under Review" | "Resolved";

interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  source: string;
  severity: AlertSeverity;
  status: AlertStatus;
}

const initialAlerts: Alert[] = [
  {
    id: "ALT-001",
    title: "Unrecorded Coca-Cola Sale",
    description:
      "AI detected a product handover at 14:00 with no matching sales transaction.",
    time: "14:00",
    source: "AI Transaction Monitor",
    severity: "Critical",
    status: "Open",
  },
  {
    id: "ALT-002",
    title: "Multiple Failed Login Attempts",
    description:
      "Several unsuccessful login attempts were detected on a user account.",
    time: "14:18",
    source: "Security Monitor",
    severity: "High",
    status: "Under Review",
  },
  {
    id: "ALT-003",
    title: "Unrecorded Pepsi Handover",
    description:
      "Product handover detected without a corresponding recorded transaction.",
    time: "15:32",
    source: "AI Transaction Monitor",
    severity: "High",
    status: "Open",
  },
  {
    id: "ALT-004",
    title: "Policy Review Due",
    description:
      "Data Protection Policy is approaching its scheduled review date.",
    time: "16:05",
    source: "Policy Monitor",
    severity: "Medium",
    status: "Open",
  },
  {
    id: "ALT-005",
    title: "Transaction Successfully Verified",
    description:
      "A previously flagged transaction has been matched with a recorded sale.",
    time: "16:30",
    source: "AI Transaction Monitor",
    severity: "Low",
    status: "Resolved",
  },
];

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedAlert, setSelectedAlert] =
    useState<Alert | null>(null);

  /* =========================================================
     LOADING
  ========================================================= */

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  /*
   * KPI calculations
   */

  const totalAlerts = alerts.length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;

  const openAlerts = alerts.filter(
    (alert) => alert.status === "Open"
  ).length;

  const resolvedAlerts = alerts.filter(
    (alert) => alert.status === "Resolved"
  ).length;

  /*
   * Search + filters
   */

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        alert.id.toLowerCase().includes(search) ||
        alert.title.toLowerCase().includes(search) ||
        alert.description.toLowerCase().includes(search) ||
        alert.source.toLowerCase().includes(search);

      const matchesSeverity =
        severityFilter === "All" ||
        alert.severity === severityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        alert.status === statusFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [
    alerts,
    searchTerm,
    severityFilter,
    statusFilter,
  ]);

  /*
   * Resolve alert
   */

  const handleResolve = (id: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Resolved",
            }
          : alert
      )
    );

    setSelectedAlert(null);
  };

  /* =========================================================
     LOADING SKELETON
  ========================================================= */

  if (loading) {
    return <AlertsSkeleton />;
  }

  return (
    <div className="alerts-page">
      {/* PAGE HEADER */}
      <header className="alerts-header">
        <div>
          <span className="alerts-eyebrow">
            COMPLIANCE MONITORING
          </span>

          <h1>Alerts & Exceptions</h1>

          <p>
            Monitor security events, compliance exceptions,
            and AI-detected risks across the system.
          </p>
        </div>
      </header>

      {/* KPI CARDS */}
      <section className="alert-kpis">
        <div className="alert-kpi-card">
          <div className="alert-kpi-icon">!</div>

          <div>
            <span>Total Alerts</span>
            <strong>{totalAlerts}</strong>
            <small>All detected events</small>
          </div>
        </div>

        <div className="alert-kpi-card critical">
          <div className="alert-kpi-icon">⚠</div>

          <div>
            <span>Critical Alerts</span>
            <strong>{criticalAlerts}</strong>
            <small>Immediate attention</small>
          </div>
        </div>

        <div className="alert-kpi-card warning">
          <div className="alert-kpi-icon">◷</div>

          <div>
            <span>Open Alerts</span>
            <strong>{openAlerts}</strong>
            <small>Require investigation</small>
          </div>
        </div>

        <div className="alert-kpi-card success">
          <div className="alert-kpi-icon">✓</div>

          <div>
            <span>Resolved</span>
            <strong>{resolvedAlerts}</strong>
            <small>Successfully handled</small>
          </div>
        </div>
      </section>

      {/* ALERT PANEL */}
      <section className="alerts-panel">
        <div className="alerts-panel-header">
          <div>
            <h2>Alert Center</h2>

            <p>
              Review and manage detected compliance
              exceptions.
            </p>
          </div>

          <div className="alerts-controls">
            <input
              type="text"
              className="alert-search"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <select
              className="alert-filter"
              value={severityFilter}
              onChange={(event) =>
                setSeverityFilter(event.target.value)
              }
            >
              <option value="All">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              className="alert-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Under Review">
                Under Review
              </option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* ALERT LIST */}
        <div className="alerts-list">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                className="alert-item"
                key={alert.id}
              >
                {/* ICON */}
                <div
                  className={`alert-indicator ${alert.severity.toLowerCase()}`}
                >
                  {alert.severity === "Critical"
                    ? "!"
                    : alert.severity === "High"
                    ? "▲"
                    : alert.severity === "Medium"
                    ? "!"
                    : "✓"}
                </div>

                {/* CONTENT */}
                <div className="alert-content">
                  <div className="alert-title-row">
                    <div>
                      <span className="alert-id">
                        {alert.id}
                      </span>

                      <h3>{alert.title}</h3>
                    </div>

                    <span
                      className={`severity-badge ${alert.severity.toLowerCase()}`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p>{alert.description}</p>

                  <div className="alert-meta">
                    <span>{alert.time}</span>

                    <span>•</span>

                    <span>{alert.source}</span>

                    <span>•</span>

                    <span
                      className={`alert-status ${alert.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {alert.status}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="alert-actions">
                  <button
                    className="alert-view-button"
                    onClick={() =>
                      setSelectedAlert(alert)
                    }
                  >
                    View
                  </button>

                  {alert.status !== "Resolved" && (
                    <button
                      className="alert-resolve-button"
                      onClick={() =>
                        handleResolve(alert.id)
                      }
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="alerts-empty">
              <div className="empty-icon">✓</div>

              <h3>No alerts found</h3>

              <p>
                No alerts match your current search and
                filter settings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ALERT DETAILS MODAL */}
      {selectedAlert && (
        <div
          className="alert-modal-overlay"
          onClick={() => setSelectedAlert(null)}
        >
          <div
            className="alert-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="alert-modal-header">
              <div>
                <span className="alerts-eyebrow">
                  ALERT DETAILS
                </span>

                <h2>{selectedAlert.title}</h2>

                <p>{selectedAlert.id}</p>
              </div>

              <button
                className="alert-close-button"
                onClick={() =>
                  setSelectedAlert(null)
                }
              >
                ×
              </button>
            </div>

            <div className="alert-detail-body">
              <div className="alert-detail-status">
                <span
                  className={`severity-badge ${selectedAlert.severity.toLowerCase()}`}
                >
                  {selectedAlert.severity}
                </span>

                <span
                  className={`alert-status ${selectedAlert.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {selectedAlert.status}
                </span>
              </div>

              <div className="alert-detail-grid">
                <div>
                  <span>Time</span>
                  <strong>
                    {selectedAlert.time}
                  </strong>
                </div>

                <div>
                  <span>Source</span>
                  <strong>
                    {selectedAlert.source}
                  </strong>
                </div>

                <div>
                  <span>Alert ID</span>
                  <strong>
                    {selectedAlert.id}
                  </strong>
                </div>

                <div>
                  <span>Severity</span>
                  <strong>
                    {selectedAlert.severity}
                  </strong>
                </div>
              </div>

              <div className="alert-description-box">
                <span>Description</span>

                <p>
                  {selectedAlert.description}
                </p>
              </div>

              {selectedAlert.status !== "Resolved" && (
                <button
                  className="alert-resolve-full"
                  onClick={() =>
                    handleResolve(selectedAlert.id)
                  }
                >
                  Mark Alert as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertsPage;