import { useState } from "react";
import "./AuditsPage.css";

interface Audit {
  id: string;
  title: string;
  auditor: string;
  date: string;
  status: "Completed" | "In Progress" | "Scheduled";
  findings: number;
  score: number;
}

const initialAudits: Audit[] = [
  {
    id: "AUD-001",
    title: "Financial Controls Audit",
    auditor: "Internal Audit Team",
    date: "15 Sep 2026",
    status: "Completed",
    findings: 3,
    score: 94,
  },
  {
    id: "AUD-002",
    title: "Data Protection Audit",
    auditor: "Compliance Department",
    date: "12 Sep 2026",
    status: "In Progress",
    findings: 5,
    score: 86,
  },
  {
    id: "AUD-003",
    title: "Access Control Audit",
    auditor: "Security Team",
    date: "20 Sep 2026",
    status: "Scheduled",
    findings: 0,
    score: 0,
  },
  {
    id: "AUD-004",
    title: "Operational Compliance Audit",
    auditor: "Internal Audit Team",
    date: "05 Sep 2026",
    status: "Completed",
    findings: 2,
    score: 91,
  },
];

function AuditsPage() {
  const [audits, setAudits] = useState<Audit[]>(initialAudits);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const [auditTitle, setAuditTitle] = useState("");
  const [auditor, setAuditor] = useState("");
  const [auditDate, setAuditDate] = useState("");
  const [auditType, setAuditType] = useState("Internal");
  const [description, setDescription] = useState("");

  const filteredAudits =
  filterStatus === "All"
    ? audits
    : audits.filter((audit) => audit.status === filterStatus);

  const handleScheduleAudit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!auditTitle || !auditor || !auditDate) {
      return;
    }

    const newAudit: Audit = {
      id: `AUD-${String(audits.length + 1).padStart(3, "0")}`,
      title: auditTitle,
      auditor: auditor,
      date: new Date(auditDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Scheduled",
      findings: 0,
      score: 0,
    };

    setAudits([...audits, newAudit]);

    setAuditTitle("");
    setAuditor("");
    setAuditDate("");
    setAuditType("Internal");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="audits-page">
      <div className="audits-header">
        <div>
          <h1>Audits</h1>
          <p>
            Monitor compliance audits, findings, and audit performance.
          </p>
        </div>

        <button
          className="schedule-button"
          onClick={() => setShowForm(true)}
        >
          + Schedule Audit
        </button>
      </div>

      <div className="audit-stats">
        <div className="audit-stat-card">
          <span>Total Audits</span>
          <strong>{audits.length}</strong>
          <small>Across all departments</small>
        </div>

        <div className="audit-stat-card">
          <span>Completed</span>
          <strong>
            {audits.filter((audit) => audit.status === "Completed").length}
          </strong>
          <small>Audits completed</small>
        </div>

        <div className="audit-stat-card">
          <span>In Progress</span>
          <strong>
            {audits.filter((audit) => audit.status === "In Progress").length}
          </strong>
          <small>Currently being reviewed</small>
        </div>

        <div className="audit-stat-card">
          <span>Open Findings</span>
          <strong className="warning-number">
            {audits.reduce((total, audit) => total + audit.findings, 0)}
          </strong>
          <small>Require attention</small>
        </div>
      </div>

      <section className="audits-panel">
        <div className="audits-panel-header">
          <div>
            <h2>Recent Audits</h2>
            <p>Latest compliance audit activity</p>
          </div>

          <select
  className="audit-filter"
  value={filterStatus}
  onChange={(event) => setFilterStatus(event.target.value)}
>
  <option value="All">All</option>
  <option value="Completed">Completed</option>
  <option value="In Progress">In Progress</option>
  <option value="Scheduled">Scheduled</option>
</select>
        </div>

        <div className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Audit</th>
                <th>Auditor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Findings</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {filteredAudits.map((audit) => (
                <tr key={audit.id}>
                  <td>
                    <div className="audit-title">
                      <strong>{audit.title}</strong>
                      <span>{audit.id}</span>
                    </div>
                  </td>

                  <td>{audit.auditor}</td>

                  <td>{audit.date}</td>

                  <td>
                    <span
                      className={`audit-status ${audit.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {audit.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        audit.findings > 0
                          ? "finding-count"
                          : "finding-clear"
                      }
                    >
                      {audit.findings}
                    </span>
                  </td>

                  <td>
                    {audit.score > 0 ? (
                      <div className="audit-score">
                        <strong>{audit.score}%</strong>

                        <div className="score-bar">
                          <div
                            className="score-progress"
                            style={{ width: `${audit.score}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="score-empty">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Schedule Audit Modal */}
      {showForm && (
        <div
          className="audit-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="audit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="audit-modal-header">
              <div>
                <h2>Schedule New Audit</h2>
                <p>Create a new compliance audit.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleScheduleAudit}>
              <div className="form-group">
                <label>Audit Name</label>
                <input
                  type="text"
                  placeholder="e.g. Financial Controls Audit"
                  value={auditTitle}
                  onChange={(event) => setAuditTitle(event.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Auditor / Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Internal Audit Team"
                    value={auditor}
                    onChange={(event) => setAuditor(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Audit Date</label>
                  <input
                    type="date"
                    value={auditDate}
                    onChange={(event) => setAuditDate(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Audit Type</label>

                <select
                  value={auditType}
                  onChange={(event) => setAuditType(event.target.value)}
                >
                  <option>Internal</option>
                  <option>External</option>
                  <option>Regulatory</option>
                  <option>Security</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  placeholder="Enter a short description of the audit..."
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-audit-button">
                  Schedule Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditsPage;