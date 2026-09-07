import type { RiskSeverity } from "../types";

const SEVERITY_META: Record<RiskSeverity, { label: string; icon: string }> = {
  critical: { label: "Critical", icon: "⛔" },
  serious: { label: "Serious", icon: "▲" },
  warning: { label: "Warning", icon: "⚠" },
  good: { label: "Good", icon: "✓" },
};

export default function SeverityBadge({ severity }: { severity: RiskSeverity }) {
  const meta = SEVERITY_META[severity];
  return (
    <span className={`badge badge-${severity}`}>
      <span aria-hidden="true">{meta.icon}</span>
      {meta.label}
    </span>
  );
}
