import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailySales } from "../types";

const RANGES = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
] as const;

const currency = new Intl.NumberFormat("en-ZM", {
  style: "currency",
  currency: "ZMW",
  maximumFractionDigits: 0,
});

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload?.length || !label) {
    return null;
  }

  const point: DailySales = payload[0].payload;

  return (
    <div className="sales-chart-tooltip">
      <div className="sales-chart-tooltip-date">
        {new Date(label).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <div className="sales-chart-tooltip-main">
        <span className="sales-chart-tooltip-dot" />

        <div className="sales-chart-tooltip-content">
          <span>Revenue</span>
          <strong>{currency.format(point.revenue)}</strong>
        </div>
      </div>

      <div className="sales-chart-tooltip-secondary">
        <span>Orders</span>
        <strong>{point.orders}</strong>
      </div>
    </div>
  );
}

export default function SalesTrendChart({
  data,
}: {
  data: DailySales[];
}) {
  const [rangeDays, setRangeDays] = useState<number>(30);

  const filtered = useMemo(
    () => data.slice(-rangeDays),
    [data, rangeDays]
  );

  const totalRevenue = useMemo(
    () =>
      filtered.reduce(
        (sum, item) => sum + item.revenue,
        0
      ),
    [filtered]
  );

  const averageRevenue = useMemo(() => {
    if (!filtered.length) return 0;

    return totalRevenue / filtered.length;
  }, [filtered, totalRevenue]);

  const latestRevenue = filtered.length
    ? filtered[filtered.length - 1].revenue
    : 0;

  const previousRevenue =
    filtered.length > 1
      ? filtered[filtered.length - 2].revenue
      : latestRevenue;

  const revenueChange =
    previousRevenue > 0
      ? ((latestRevenue - previousRevenue) /
          previousRevenue) *
        100
      : 0;

  return (
    <section className="sales-trend-card">
      {/* Header */}
      <div className="sales-trend-header">
        <div className="sales-trend-heading">
          <span className="sales-trend-eyebrow">
            REVENUE ANALYTICS
          </span>

          <h2>Sales Revenue Trend</h2>

          <p>
            Track revenue performance across the selected
            period.
          </p>
        </div>

        <div
          className="sales-trend-range"
          role="group"
          aria-label="Revenue date range"
        >
          {RANGES.map((range) => (
            <button
              key={range.days}
              type="button"
              className={
                rangeDays === range.days
                  ? "sales-trend-range-active"
                  : ""
              }
              onClick={() => setRangeDays(range.days)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="sales-trend-summary">
        <div className="sales-trend-summary-main">
          <span>Total Revenue</span>
          <strong>{currency.format(totalRevenue)}</strong>
        </div>

        <div className="sales-trend-summary-item">
          <span>Latest</span>
          <strong>
            {currency.format(latestRevenue)}
          </strong>
        </div>

        <div className="sales-trend-summary-item">
          <span>Daily Average</span>
          <strong>
            {currency.format(averageRevenue)}
          </strong>
        </div>

        <div className="sales-trend-summary-item">
          <span>Change</span>
          <strong
            className={
              revenueChange >= 0
                ? "sales-trend-positive"
                : "sales-trend-negative"
            }
          >
            {revenueChange >= 0 ? "+" : ""}
            {revenueChange.toFixed(1)}%
          </strong>
        </div>
      </div>

      {/* Chart */}
      <div className="sales-trend-chart">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={filtered}
            margin={{
              top: 15,
              right: 12,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="var(--gridline)"
              strokeDasharray="3 5"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString(
                  undefined,
                  {
                    month: "short",
                    day: "numeric",
                  }
                )
              }
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
              minTickGap={35}
            />

            <YAxis
              tickFormatter={(value) =>
                `ZMW ${Math.round(value / 1000)}k`
              }
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
              width={60}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "var(--text-muted)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--series-1)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "var(--series-1)",
                stroke: "var(--surface-1)",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="sales-trend-footer">
        <span>
          Showing last {Math.min(rangeDays, data.length)}{" "}
          days
        </span>

        <span>
          {filtered.length > 0
            ? `Latest: ${currency.format(latestRevenue)}`
            : "No data available"}
        </span>
      </div>
    </section>
  );
}