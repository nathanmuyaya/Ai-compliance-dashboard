import {
  AlertTriangle,
  BarChart3,
  ShoppingCart,
  Wallet,
} from "lucide-react";

interface StatTileProps {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "flat";
  tone?: "default" | "critical";
}

const ICONS = {
  revenue: Wallet,
  orders: ShoppingCart,
  avg: BarChart3,
  risks: AlertTriangle,
};

function getIcon(label: string) {
  const text = label.toLowerCase();

  if (text.includes("revenue")) return ICONS.revenue;
  if (text.includes("orders")) return ICONS.orders;
  if (text.includes("avg")) return ICONS.avg;
  if (text.includes("risk")) return ICONS.risks;

  return BarChart3;
}

export default function StatTile({
  label,
  value,
  delta,
  deltaDirection = "flat",
  tone = "default",
}: StatTileProps) {
  const Icon = getIcon(label);

  return (
    <div
      className={`stat-tile ${
        tone === "critical" ? "stat-tile-critical" : ""
      }`}
    >
      <div className="stat-tile-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        <span className="stat-label">{label}</span>
      </div>

      <div className="stat-value">{value}</div>

      {delta && (
        <div className={`stat-delta stat-delta-${deltaDirection}`}>
          <span className="stat-delta-icon">
            {deltaDirection === "up"
              ? "↑"
              : deltaDirection === "down"
              ? "↓"
              : "•"}
          </span>

          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}