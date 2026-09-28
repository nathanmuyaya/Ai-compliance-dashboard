import { useMemo, useState, type FormEvent } from "react";
import "./RecordsPage.css";

type RecordStatus = "Open" | "Under Review" | "Verified" | "Resolved";
type RiskLevel = "High" | "Medium" | "Low";

interface AuditRecord {
  id: string;
  time: string;
  employee: string;
  item: string;
  activity: string;
  recordedSale: boolean;
  confidence: number;
  risk: RiskLevel;
  status: RecordStatus;
  notes?: string;
}

const initialRecords: AuditRecord[] = [
  {
    id: "AUD-001",
    time: "14:00",
    employee: "John",
    item: "Coca-Cola",
    activity: "Product handover detected",
    recordedSale: false,
    confidence: 94,
    risk: "High",
    status: "Open",
    notes: "Product handover detected but no matching sale was found.",
  },
  {
    id: "AUD-002",
    time: "14:15",
    employee: "Mary",
    item: "Fanta",
    activity: "Product handover detected",
    recordedSale: true,
    confidence: 97,
    risk: "Low",
    status: "Verified",
    notes: "Handover matched with a recorded transaction.",
  },
  {
    id: "AUD-003",
    time: "15:32",
    employee: "John",
    item: "Pepsi",
    activity: "Product handover detected",
    recordedSale: false,
    confidence: 91,
    risk: "High",
    status: "Under Review",
    notes: "No matching transaction found in the sales records.",
  },
  {
    id: "AUD-004",
    time: "16:08",
    employee: "Grace",
    item: "Sprite",
    activity: "Product handover detected",
    recordedSale: true,
    confidence: 96,
    risk: "Low",
    status: "Verified",
    notes: "Transaction successfully matched.",
  },
  {
    id: "AUD-005",
    time: "16:42",
    employee: "Brian",
    item: "Water",
    activity: "Product handover detected",
    recordedSale: false,
    confidence: 88,
    risk: "Medium",
    status: "Open",
    notes: "Possible unrecorded transaction requires investigation.",
  },
];

function RecordsPage() {
  const [records, setRecords] = useState<AuditRecord[]>(initialRecords);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<AuditRecord | null>(null);

  // New record form
  const [employee, setEmployee] = useState("");
  const [item, setItem] = useState("");
  const [time, setTime] = useState("");
  const [recordedSale, setRecordedSale] = useState(false);
  const [risk, setRisk] = useState<RiskLevel>("Medium");
  const [notes, setNotes] = useState("");

  /*
   * KPI calculations
   */
  const totalActivities = records.length;

  const unrecordedSales = records.filter(
    (record) => !record.recordedSale
  ).length;

  const verifiedTransactions = records.filter(
    (record) => record.recordedSale
  ).length;

  const highRiskRecords = records.filter(
    (record) => record.risk === "High"
  ).length;

  const averageConfidence =
    records.length > 0
      ? Math.round(
          records.reduce(
            (total, record) => total + record.confidence,
            0
          ) / records.length
        )
      : 0;

  /*
   * Search + filters
   */
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.employee
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.item
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      const matchesRisk =
        riskFilter === "All" ||
        record.risk === riskFilter;

      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [records, searchTerm, statusFilter, riskFilter]);

  /*
   * Add new record
   */
  const handleAddRecord = (event: FormEvent) => {
    event.preventDefault();

    if (!employee || !item || !time) {
      return;
    }

    const newRecord: AuditRecord = {
      id: `AUD-${String(records.length + 1).padStart(3, "0")}`,
      time,
      employee,
      item,
      activity: "Product handover detected",
      recordedSale,
      confidence: 0,
      risk,
      status: recordedSale ? "Verified" : "Open",
      notes:
        notes ||
        (recordedSale
          ? "Transaction was manually recorded and matched."
          : "No matching sale has been recorded."),
    };

    setRecords((currentRecords) => [
      newRecord,
      ...currentRecords,
    ]);

    // Reset form
    setEmployee("");
    setItem("");
    setTime("");
    setRecordedSale(false);
    setRisk("Medium");
    setNotes("");
    setShowForm(false);
  };

  /*
   * Resolve a record
   */
  const handleResolve = (id: string) => {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Resolved",
            }
          : record
      )
    );
  };

  return (
    <div className="audits-page">
      {/* PAGE HEADER */}
      <header className="audits-header">
        <div>
          <span className="audits-eyebrow">
            AI COMPLIANCE MONITORING
          </span>

          <h1>Records & Transaction Monitoring</h1>

          <p>
            Monitor product handovers, transaction records, and
            AI-detected compliance exceptions.
          </p>
        </div>

        <button
          className="new-audit-button"
          onClick={() => setShowForm(true)}
        >
          + Add Record
        </button>
      </header>

      {/* KPI CARDS */}
      <section className="audit-kpis">
        <div className="audit-kpi-card">
          <div className="kpi-icon">◉</div>

          <div className="kpi-content">
            <span>Detected Activities</span>
            <strong>{totalActivities}</strong>
            <small>AI-detected handovers</small>
          </div>
        </div>

        <div className="audit-kpi-card critical">
          <div className="kpi-icon">!</div>

          <div className="kpi-content">
            <span>Unrecorded Sales</span>
            <strong>{unrecordedSales}</strong>
            <small>Require investigation</small>
          </div>
        </div>

        <div className="audit-kpi-card success">
          <div className="kpi-icon">✓</div>

          <div className="kpi-content">
            <span>Verified Transactions</span>
            <strong>{verifiedTransactions}</strong>
            <small>Matched with sales</small>
          </div>
        </div>

        <div className="audit-kpi-card warning">
          <div className="kpi-icon">▲</div>

          <div className="kpi-content">
            <span>High Risk</span>
            <strong>{highRiskRecords}</strong>
            <small>Need immediate attention</small>
          </div>
        </div>
      </section>

      {/* MONITORING SUMMARY */}
      <section className="audit-summary">
        <div>
          <span>AI Detection Confidence</span>

          <strong>{averageConfidence}%</strong>

          <p>
            Average confidence across detected activities
          </p>
        </div>

        <div className="summary-progress">
          <div
            className="summary-progress-fill"
            style={{ width: `${averageConfidence}%` }}
          />
        </div>
      </section>

      {/* RECORDS PANEL */}
      <section className="audit-panel">
        <div className="audit-panel-header">
          <div>
            <h2>Records</h2>

            <p>
              AI-detected product handovers and transaction
              verification results.
            </p>
          </div>

          <div className="audit-controls">
            <input
              type="text"
              className="audit-search"
              placeholder="Search employee, item or ID..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <select
              className="audit-filter"
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
              <option value="Verified">Verified</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              className="audit-filter"
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(event.target.value)
              }
            >
              <option value="All">All Risk</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="audit-table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Record</th>
                <th>Time</th>
                <th>Employee</th>
                <th>Item</th>
                <th>AI Detection</th>
                <th>Confidence</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    {/* RECORD */}
                    <td>
                      <div className="audit-record-info">
                        <strong>{record.id}</strong>

                        <span>
                          {record.recordedSale
                            ? "Sale matched"
                            : "Sale not matched"}
                        </span>
                      </div>
                    </td>

                    {/* TIME */}
                    <td>
                      <span className="audit-time">
                        {record.time}
                      </span>
                    </td>

                    {/* EMPLOYEE */}
                    <td>
                      <strong>{record.employee}</strong>
                    </td>

                    {/* ITEM */}
                    <td>
                      <span className="audit-item">
                        {record.item}
                      </span>
                    </td>

                    {/* AI DETECTION */}
                    <td>
                      <div className="detection-info">
                        <span className="detection-dot" />

                        <div>
                          <strong>
                            {record.activity}
                          </strong>

                          <small>
                            {record.recordedSale
                              ? "Transaction found"
                              : "No matching sale"}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* CONFIDENCE */}
                    <td>
                      <div className="confidence">
                        <div className="confidence-value">
                          <strong>
                            {record.confidence}%
                          </strong>
                        </div>

                        <div className="confidence-bar">
                          <div
                            className="confidence-progress"
                            style={{
                              width: `${record.confidence}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* RISK */}
                    <td>
                      <span
                        className={`risk-badge ${record.risk.toLowerCase()}`}
                      >
                        {record.risk}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status-badge ${record.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>
                      <div className="audit-actions">
                        <button
                          className="view-button"
                          onClick={() =>
                            setSelectedRecord(record)
                          }
                        >
                          View
                        </button>

                        {!record.recordedSale &&
                          record.status !== "Resolved" && (
                            <button
                              className="resolve-button"
                              onClick={() =>
                                handleResolve(record.id)
                              }
                            >
                              Resolve
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="empty-state"
                  >
                    No records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* RECENT EXCEPTIONS */}
      <section className="audit-bottom-grid">
        <div className="audit-insight-card">
          <div className="insight-header">
            <div>
              <span className="card-label">
                AI INSIGHT
              </span>

              <h3>Transaction Exceptions</h3>
            </div>
          </div>

          <p>
            The AI system detected{" "}
            <strong>{unrecordedSales}</strong> product
            handovers without a corresponding recorded sale.
          </p>

          <div className="insight-stat">
            <strong>{highRiskRecords}</strong>
            <span>high-risk exceptions</span>
          </div>
        </div>

        <div className="audit-exceptions-card">
          <div className="insight-header">
            <div>
              <span className="card-label">
                RECENT ACTIVITY
              </span>

              <h3>Latest Exceptions</h3>
            </div>
          </div>

          <div className="exception-list">
            {records
              .filter((record) => !record.recordedSale)
              .slice(0, 3)
              .map((record) => (
                <div
                  className="exception-item"
                  key={record.id}
                >
                  <div>
                    <strong>
                      {record.item} — {record.employee}
                    </strong>

                    <span>
                      {record.time} · {record.risk} risk
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedRecord(record)
                    }
                  >
                    View
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ADD RECORD MODAL */}
      {showForm && (
        <div
          className="audit-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="audit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="audit-modal-header">
              <div>
                <span className="card-label">
                  RECORD
                </span>

                <h2>Add Record</h2>

                <p>
                  Add a transaction or product handover
                  for monitoring.
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddRecord}>
              <div className="form-row">
                <div className="form-group">
                  <label>Employee</label>

                  <input
                    type="text"
                    placeholder="e.g. John"
                    value={employee}
                    onChange={(event) =>
                      setEmployee(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Product / Item</label>

                  <input
                    type="text"
                    placeholder="e.g. Coca-Cola"
                    value={item}
                    onChange={(event) =>
                      setItem(event.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Handover Time</label>

                  <input
                    type="time"
                    value={time}
                    onChange={(event) =>
                      setTime(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Risk Level</label>

                  <select
                    value={risk}
                    onChange={(event) =>
                      setRisk(
                        event.target.value as RiskLevel
                      )
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">
                      Medium
                    </option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Transaction Status</label>

                <select
                  value={
                    recordedSale
                      ? "recorded"
                      : "unrecorded"
                  }
                  onChange={(event) =>
                    setRecordedSale(
                      event.target.value === "recorded"
                    )
                  }
                >
                  <option value="recorded">
                    Sale Recorded
                  </option>

                  <option value="unrecorded">
                    Sale Not Recorded
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Notes</label>

                <textarea
                  rows={4}
                  placeholder="Add additional information about this record..."
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
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

                <button
                  type="submit"
                  className="save-audit-button"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD DETAILS MODAL */}
      {selectedRecord && (
        <div
          className="audit-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="audit-modal detail-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="audit-modal-header">
              <div>
                <span className="card-label">
                  RECORD DETAILS
                </span>

                <h2>{selectedRecord.id}</h2>

                <p>
                  AI transaction monitoring result
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                ×
              </button>
            </div>

            <div className="record-details">
              <div className="detail-item">
                <span>Employee</span>
                <strong>
                  {selectedRecord.employee}
                </strong>
              </div>

              <div className="detail-item">
                <span>Product</span>
                <strong>
                  {selectedRecord.item}
                </strong>
              </div>

              <div className="detail-item">
                <span>Time</span>
                <strong>
                  {selectedRecord.time}
                </strong>
              </div>

              <div className="detail-item">
                <span>AI Confidence</span>
                <strong>
                  {selectedRecord.confidence}%
                </strong>
              </div>

              <div className="detail-item">
                <span>Risk</span>

                <span
                  className={`risk-badge ${selectedRecord.risk.toLowerCase()}`}
                >
                  {selectedRecord.risk}
                </span>
              </div>

              <div className="detail-item">
                <span>Status</span>

                <span
                  className={`status-badge ${selectedRecord.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {selectedRecord.status}
                </span>
              </div>
            </div>

            <div className="detail-note">
              <span>AI Analysis</span>

              <p>
                {selectedRecord.notes ||
                  "No additional notes available."}
              </p>
            </div>

            {!selectedRecord.recordedSale &&
              selectedRecord.status !== "Resolved" && (
                <button
                  className="save-audit-button full-width"
                  onClick={() => {
                    handleResolve(selectedRecord.id);
                    setSelectedRecord(null);
                  }}
                >
                  Mark as Resolved
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordsPage;