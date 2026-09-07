interface StatTileProps {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "flat";
  tone?: "default" | "critical";
}

export default function StatTile({ label, value, delta, deltaDirection = "flat", tone = "default" }: StatTileProps) {
  return (
    <div className={`stat-tile ${tone === "critical" ? "stat-tile-critical" : ""}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta && (
        <div className={`stat-delta stat-delta-${deltaDirection}`}>
          {deltaDirection === "up" ? "↑" : deltaDirection === "down" ? "↓" : "•"} {delta}
        </div>
      )}
    </div>
  );
}
