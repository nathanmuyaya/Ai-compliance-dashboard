import { useMemo, useState } from "react";
import type { FlaggedRisk, RiskSeverity, RiskStatus } from "../types";
import SeverityBadge from "./SeverityBadge";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const SEVERITY_FILTERS: Array<{ label: string; value: RiskSeverity | "all" }> = [
  { label: "All severities", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "Serious", value: "serious" },
  { label: "Warning", value: "warning" },
];

const STATUS_FILTERS: Array<{ label: string; value: RiskStatus | "all" }> = [
  { label: "All statuses", value: "all" },
  { label: "Open", value: "open" },
  { label: "Investigating", value: "investigating" },
  { label: "Resolved", value: "resolved" },
];

const SEVERITY_ORDER: Record<RiskSeverity, number> = { critical: 0, serious: 1, warning: 2, good: 3 };

export default function FlaggedRisksTable({ risks }: { risks: FlaggedRisk[] }) {
  const [severityFilter, setSeverityFilter] = useState<RiskSeverity | "all">("all");
  const [statusFilter, setStatusFilter] = useState<RiskStatus | "all">("all");

  const filtered = useMemo(() => {
    return risks
      .filter((r) => severityFilter === "all" || r.severity === severityFilter)
      .filter((r) => statusFilter === "all" || r.status === statusFilter)
      .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] || (a.date < b.date ? 1 : -1));
  }, [risks, severityFilter, statusFilter]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Flagged risks</h2>
          <p className="panel-subtitle">
            {filtered.length} of {risks.length} flagged transactions
          </p>
        </div>
        <div className="filter-row">
          <select
            className="filter-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as RiskSeverity | "all")}
            aria-label="Filter by severity"
          >
            {SEVERITY_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RiskStatus | "all")}
            aria-label="Filter by status"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-scroll">
        <table className="risk-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Severity</th>
              <th className="col-right">Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((risk) => (
              <tr key={risk.id}>
                <td className="col-muted">
                  {new Date(risk.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </td>
                <td>{risk.description}</td>
                <td className="col-muted">{risk.category}</td>
                <td>
                  <SeverityBadge severity={risk.severity} />
                </td>
                <td className="col-right">{currency.format(risk.amount)}</td>
                <td>
                  <span className={`status-pill status-pill-${risk.status}`}>{risk.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">
                  No flagged risks match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
