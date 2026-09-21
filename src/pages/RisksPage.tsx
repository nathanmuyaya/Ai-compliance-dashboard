import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FLAGGED_RISKS } from "../data/mockData";
import SeverityBadge from "../components/SeverityBadge";
import "./RisksPage.css";

type RiskSeverity = "critical" | "serious" | "warning" | "good";

type RiskStatus = "open" | "investigating" | "resolved";

interface Risk {
  id: string;
  date: string;
  description: string;
  severity: RiskSeverity;
  amount: number;
  status: RiskStatus;
}

export default function RisksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const risks = FLAGGED_RISKS as Risk[];

  const filteredRisks = useMemo(() => {
    return risks.filter((risk) => {
      const matchesSearch =
        risk.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        risk.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity =
        severityFilter === "all" ||
        risk.severity === severityFilter;

      const matchesStatus =
        statusFilter === "all" ||
        risk.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [risks, searchTerm, severityFilter, statusFilter]);

  const criticalCount = risks.filter(
    (risk) => risk.severity === "critical"
  ).length;

  const seriousCount = risks.filter(
    (risk) => risk.severity === "serious"
  ).length;

  const openCount = risks.filter(
    (risk) => risk.status === "open"
  ).length;

  const resolvedCount = risks.filter(
    (risk) => risk.status === "resolved"
  ).length;

  const totalExposure = risks
    .filter((risk) => risk.status !== "resolved")
    .reduce((sum, risk) => sum + risk.amount, 0);

  return (
    <div className="risks-page">
      {/* =====================================================
          HEADER
          ===================================================== */}
      <header className="risks-header">
        <div>
          <span className="risks-eyebrow">RISK MANAGEMENT</span>

          <h1>Flagged Risks</h1>

          <p>
            Monitor, investigate, and resolve transactions and activities
            that require attention.
          </p>
        </div>

        <Link to="/" className="risks-back-link">
          ← Overview
        </Link>
      </header>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}
      <section className="risk-summary-grid">
        <div className="risk-summary-card">
          <div className="risk-summary-icon total">!</div>

          <div>
            <span>Total Risks</span>
            <strong>{risks.length}</strong>
          </div>
        </div>

        <div className="risk-summary-card critical">
          <div className="risk-summary-icon critical">!</div>

          <div>
            <span>Critical Risks</span>
            <strong>{criticalCount}</strong>
          </div>
        </div>

        <div className="risk-summary-card serious">
          <div className="risk-summary-icon serious">!</div>

          <div>
            <span>Serious Risks</span>
            <strong>{seriousCount}</strong>
          </div>
        </div>

        <div className="risk-summary-card open">
          <div className="risk-summary-icon open">○</div>

          <div>
            <span>Open Risks</span>
            <strong>{openCount}</strong>
          </div>
        </div>

        <div className="risk-summary-card exposure">
          <div className="risk-summary-icon exposure">$</div>

          <div>
            <span>Open Exposure</span>
            <strong>
              ${totalExposure.toLocaleString()}
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN PANEL
          ===================================================== */}
      <section className="risks-panel">
        <div className="risks-panel-header">
          <div>
            <span className="risks-panel-eyebrow">
              RISK REGISTER
            </span>

            <h2>Flagged Risk Register</h2>

            <p>
              {filteredRisks.length} of {risks.length} risks displayed
            </p>
          </div>

          <div className="risk-status-summary">
            <span className="resolved-indicator">
              ● {resolvedCount} resolved
            </span>
          </div>
        </div>

        {/* ===================================================
            FILTERS
            =================================================== */}
        <div className="risks-controls">
          <div className="risk-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search risks..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <select
            value={severityFilter}
            onChange={(event) =>
              setSeverityFilter(event.target.value)
            }
          >
            <option value="all">All severities</option>
            <option value="critical">Critical</option>
            <option value="serious">Serious</option>
            <option value="warning">Warning</option>
            <option value="good">Good</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="investigating">
              Investigating
            </option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* ===================================================
            DESKTOP TABLE
            =================================================== */}
        <div className="risks-table-wrapper">
          <table className="risks-table">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Date</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredRisks.map((risk) => (
                <tr key={risk.id}>
                  <td>
                    <span className="risk-id">
                      {risk.id}
                    </span>
                  </td>

                  <td>
                    <span className="risk-date">
                      {new Date(risk.date).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </td>

                  <td>
                    <span className="risk-description-cell">
                      {risk.description}
                    </span>
                  </td>

                  <td>
                    <SeverityBadge severity={risk.severity} />
                  </td>

                  <td>
                    <span className="risk-amount-cell">
                      ${risk.amount.toLocaleString()}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`risk-status-badge ${risk.status}`}
                    >
                      {risk.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="risk-view-button"
                      onClick={() => setSelectedRisk(risk)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===================================================
            MOBILE CARDS
            =================================================== */}
        <div className="risks-mobile-list">
          {filteredRisks.map((risk) => (
            <article className="risk-mobile-card" key={risk.id}>
              <div className="risk-mobile-top">
                <span className="risk-id">{risk.id}</span>

                <SeverityBadge severity={risk.severity} />
              </div>

              <h3>{risk.description}</h3>

              <div className="risk-mobile-info">
                <div>
                  <span>Date</span>
                  <strong>
                    {new Date(risk.date).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </div>

                <div>
                  <span>Amount</span>
                  <strong>
                    ${risk.amount.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className={`mobile-${risk.status}`}>
                    {risk.status}
                  </strong>
                </div>
              </div>

              <button
                className="risk-mobile-view"
                onClick={() => setSelectedRisk(risk)}
              >
                View Risk Details
              </button>
            </article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredRisks.length === 0 && (
          <div className="risks-empty">
            <div className="risks-empty-icon">✓</div>

            <h3>No risks found</h3>

            <p>
              Try changing your search or filter selections.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          DETAILS MODAL
          ===================================================== */}
      {selectedRisk && (
        <div
          className="risk-modal-overlay"
          onClick={() => setSelectedRisk(null)}
        >
          <div
            className="risk-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="risk-modal-header">
              <div>
                <span className="risks-panel-eyebrow">
                  RISK DETAILS
                </span>

                <h2>{selectedRisk.description}</h2>

                <span className="risk-id">
                  {selectedRisk.id}
                </span>
              </div>

              <button
                className="risk-modal-close"
                onClick={() => setSelectedRisk(null)}
              >
                ×
              </button>
            </div>

            <div className="risk-modal-body">
              <div className="risk-detail-grid">
                <div>
                  <span>Date</span>

                  <strong>
                    {new Date(
                      selectedRisk.date
                    ).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </strong>
                </div>

                <div>
                  <span>Amount</span>

                  <strong>
                    ${selectedRisk.amount.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Severity</span>

                  <SeverityBadge
                    severity={selectedRisk.severity}
                  />
                </div>

                <div>
                  <span>Status</span>

                  <strong
                    className={`modal-status ${selectedRisk.status}`}
                  >
                    {selectedRisk.status}
                  </strong>
                </div>
              </div>

              <div className="risk-modal-note">
                <span>Risk assessment</span>

                <p>
                  This transaction has been flagged by the
                  compliance monitoring system and requires
                  appropriate review based on its severity,
                  amount, and current status.
                </p>
              </div>
            </div>

            <div className="risk-modal-footer">
              <button
                className="risk-modal-secondary"
                onClick={() => setSelectedRisk(null)}
              >
                Close
              </button>

              {selectedRisk.status !== "resolved" && (
                <button className="risk-modal-primary">
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}