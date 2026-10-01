import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CategorySales } from "../types";

const currency = new Intl.NumberFormat("en-ZM", {
  style: "currency",
  currency: "ZMW",
  maximumFractionDigits: 0,
});

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point: CategorySales = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{point.category}</div>
      <div className="chart-tooltip-row">
        <span className="chart-tooltip-swatch" />
        <span>Revenue</span>
        <strong>{currency.format(point.revenue)}</strong>
      </div>
    </div>
  );
}

export default function CategoryBarChart({ data }: { data: CategorySales[] }) {
  const sorted = [...data].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Revenue by category</h2>
          <p className="panel-subtitle">Last 90 days</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={sorted} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="var(--gridline)" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => `ZMW ${Math.round(v / 1000)}k`}
            stroke="var(--baseline)"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "var(--baseline)" }}
          />
          <YAxis
            type="category"
            dataKey="category"
            stroke="var(--baseline)"
            tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--gridline)" }} />
          <Bar dataKey="revenue" fill="var(--series-1)" radius={[0, 4, 4, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}