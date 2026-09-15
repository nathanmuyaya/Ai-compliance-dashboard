import "./AlertsPage.css";

const alerts = [
  {
    id: 1,
    title: "High Risk Transaction Detected",
    description: "A transaction has exceeded the configured risk threshold.",
    severity: "High",
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "Policy Violation",
    description: "A compliance policy requirement has not been met.",
    severity: "Medium",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Unusual User Activity",
    description: "Multiple failed login attempts were detected.",
    severity: "High",
    time: "2 hours ago",
  },
  {
    id: 4,
    title: "Audit Review Required",
    description: "An audit record requires administrator review.",
    severity: "Low",
    time: "Yesterday",
  },
];

export default function AlertsPage() {
  return (
    <div className="alerts-page">
      <div className="page-header">
        <div>
          <h1>Alerts</h1>
          <p>Monitor and manage important compliance alerts.</p>
        </div>

        <button className="mark-read-btn">
          Mark all as read
        </button>
      </div>

      <div className="alerts-summary">
        <div className="summary-card">
          <span className="summary-number high">3</span>
          <span>High Severity</span>
        </div>

        <div className="summary-card">
          <span className="summary-number medium">5</span>
          <span>Medium Severity</span>
        </div>

        <div className="summary-card">
          <span className="summary-number low">8</span>
          <span>Low Severity</span>
        </div>
      </div>

      <div className="alerts-container">
        {alerts.map((alert) => (
          <div className="alert-card" key={alert.id}>
            <div className="alert-icon">!</div>

            <div className="alert-content">
              <div className="alert-top">
                <h3>{alert.title}</h3>

                <span
                  className={`severity ${alert.severity.toLowerCase()}`}
                >
                  {alert.severity}
                </span>
              </div>

              <p>{alert.description}</p>

              <span className="alert-time">
                {alert.time}
              </span>
            </div>

            <button className="view-btn">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}