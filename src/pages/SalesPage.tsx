import PageHeader from "../components/PageHeader";
import StatTile from "../components/StatTile";
import SalesTrendChart from "../components/SalesTrendChart";
import CategoryBarChart from "../components/CategoryBarChart";
import { CATEGORY_SALES, DAILY_SALES } from "../data/mockData";
import { useSalesStats } from "../data/useSalesStats";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function SalesPage() {
  const stats = useSalesStats();
  const revenue90 = DAILY_SALES.reduce((sum, d) => sum + d.revenue, 0);
  const orders90 = DAILY_SALES.reduce((sum, d) => sum + d.orders, 0);
  const totalCategoryRevenue = CATEGORY_SALES.reduce((sum, c) => sum + c.revenue, 0);
  const sortedCategories = [...CATEGORY_SALES].sort((a, b) => b.revenue - a.revenue);

  return (
    <>
      <PageHeader title="Sales reports" subtitle="Revenue and order performance across the store" />

      <section className="stat-grid">
        <StatTile
          label="Revenue (30d)"
          value={currency.format(stats.revenue30)}
          delta={`${Math.abs(stats.revenueDeltaPct).toFixed(1)}% vs prior 30d`}
          deltaDirection={stats.revenueDeltaPct >= 0 ? "up" : "down"}
        />
        <StatTile label="Orders (30d)" value={stats.orders30.toLocaleString()} />
        <StatTile label="Avg order value" value={currency.format(stats.avgOrderValue)} />
        <StatTile label="Revenue (90d)" value={currency.format(revenue90)} />
      </section>

      <section className="chart-grid">
        <SalesTrendChart data={DAILY_SALES} />
        <CategoryBarChart data={CATEGORY_SALES} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Category breakdown</h2>
            <p className="panel-subtitle">Share of revenue over the last 90 days · {orders90.toLocaleString()} orders total</p>
          </div>
        </div>
        <div className="table-scroll">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="col-right">Revenue</th>
                <th className="col-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {sortedCategories.map((c) => (
                <tr key={c.category}>
                  <td>{c.category}</td>
                  <td className="col-right">{currency.format(c.revenue)}</td>
                  <td className="col-right">{((c.revenue / totalCategoryRevenue) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
