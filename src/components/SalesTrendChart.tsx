import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailySales } from "../types";

const RANGES = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
] as const;

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const point: DailySales = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">
        {new Date(label).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
      </div>
      <div className="chart-tooltip-row">
        <span className="chart-tooltip-swatch" />
        <span>Revenue</span>
        <strong>{currency.format(point.revenue)}</strong>
      </div>
      <div className="chart-tooltip-row chart-tooltip-row-muted">
        <span>Orders</span>
        <strong>{point.orders}</strong>
      </div>
    </div>
  );
}

export default function SalesTrendChart({ data }: { data: DailySales[] }) {
  const [rangeDays, setRangeDays] = useState<number>(30);

  const filtered = useMemo(() => data.slice(-rangeDays), [data, rangeDays]);

  const totalRevenue = useMemo(() => filtered.reduce((sum, d) => sum + d.revenue, 0), [filtered]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Sales revenue trend</h2>
          <p className="panel-subtitle">{currency.format(totalRevenue)} total over selected range</p>
        </div>
        <div className="range-toggle" role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r.days}
              className={`range-toggle-btn ${rangeDays === r.days ? "range-toggle-btn-active" : ""}`}
              onClick={() => setRangeDays(r.days)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={filtered} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--gridline)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            stroke="var(--baseline)"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "var(--baseline)" }}
            minTickGap={32}
          />
          <YAxis
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            stroke="var(--baseline)"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--baseline)", strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--series-1)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "var(--series-1)", stroke: "var(--surface-1)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
