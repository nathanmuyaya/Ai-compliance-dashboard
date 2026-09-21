import { useMemo, useState } from "react";
import "./SalesPage.css";

interface Sale {
  id: string;
  customer: string;
  product: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending" | "Flagged";
  date: string;
}

const SALES: Sale[] = [
  {
    id: "SAL-001",
    customer: "Kabwe Trading Ltd",
    product: "iPhone 15 Pro",
    category: "Smartphones",
    amount: 1199,
    status: "Completed",
    date: "20 Sep 2026",
  },
  {
    id: "SAL-002",
    customer: "Mwamba Stores",
    product: "Dell Latitude 5520",
    category: "Laptops",
    amount: 1450,
    status: "Flagged",
    date: "20 Sep 2026",
  },
  {
    id: "SAL-003",
    customer: "Zambezi Holdings",
    product: "Samsung Galaxy S24",
    category: "Smartphones",
    amount: 999,
    status: "Completed",
    date: "19 Sep 2026",
  },
  {
    id: "SAL-004",
    customer: "Lusaka Finance",
    product: "HP LaserJet Printer",
    category: "Printers",
    amount: 380,
    status: "Completed",
    date: "19 Sep 2026",
  },
  {
    id: "SAL-005",
    customer: "Copperbelt Mining",
    product: "Premium Water × 12",
    category: "Bottled Products",
    amount: 48,
    status: "Pending",
    date: "18 Sep 2026",
  },
  {
    id: "SAL-006",
    customer: "Central Supplies",
    product: "MacBook Air",
    category: "Laptops",
    amount: 1299,
    status: "Completed",
    date: "18 Sep 2026",
  },
];

interface Handover {
  id: string;
  product: string;
  productType: string;
  customer: string;
  amount: number;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  status: "Verified" | "Detected" | "Review";
  icon: string;
  iconClass: string;
}

const HANDOVERS: Handover[] = [
  {
    id: "HND-001",
    product: "iPhone 15 Pro",
    productType: "Smartphone",
    customer: "Customer #1042",
    amount: 1199,
    confidence: 98,
    risk: "Low",
    status: "Verified",
    icon: "📱",
    iconClass: "phone",
  },
  {
    id: "HND-002",
    product: "Dell Latitude 5520",
    productType: "Laptop",
    customer: "Customer #1043",
    amount: 1450,
    confidence: 94,
    risk: "Low",
    status: "Verified",
    icon: "💻",
    iconClass: "laptop",
  },
  {
    id: "HND-003",
    product: "Premium Water × 12",
    productType: "Bottled Product",
    customer: "Customer #1044",
    amount: 48,
    confidence: 89,
    risk: "Low",
    status: "Detected",
    icon: "🧴",
    iconClass: "bottle",
  },
  {
    id: "HND-004",
    product: "Samsung Galaxy S24",
    productType: "Smartphone",
    customer: "Customer #1045",
    amount: 999,
    confidence: 67,
    risk: "High",
    status: "Review",
    icon: "📱",
    iconClass: "phone",
  },
  {
    id: "HND-005",
    product: "HP LaserJet Printer",
    productType: "Printer",
    customer: "Customer #1046",
    amount: 380,
    confidence: 96,
    risk: "Low",
    status: "Verified",
    icon: "🖨️",
    iconClass: "printer",
  },
];

export default function SalesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredSales = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return SALES.filter((sale) => {
      const matchesSearch =
        sale.id.toLowerCase().includes(searchValue) ||
        sale.customer.toLowerCase().includes(searchValue) ||
        sale.product.toLowerCase().includes(searchValue) ||
        sale.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        sale.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        sale.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [search, statusFilter, categoryFilter]);

  const totalRevenue = SALES.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  const completedSales = SALES.filter(
    (sale) => sale.status === "Completed"
  ).length;

  const flaggedSales = SALES.filter(
    (sale) => sale.status === "Flagged"
  ).length;

  const pendingSales = SALES.filter(
    (sale) => sale.status === "Pending"
  ).length;

  const verifiedHandovers = HANDOVERS.filter(
    (handover) => handover.status === "Verified"
  ).length;

  const reviewHandovers = HANDOVERS.filter(
    (handover) => handover.status === "Review"
  ).length;

  const averageConfidence = Math.round(
    HANDOVERS.reduce(
      (total, handover) =>
        total + handover.confidence,
      0
    ) / HANDOVERS.length
  );

  return (
    <main className="sales-page">

      {/* PAGE HEADER */}
      <section className="sales-header">
        <div>
          <span className="section-label">
            BUSINESS INTELLIGENCE
          </span>

          <h1>Sales & Product Intelligence</h1>

          <p>
            Monitor sales performance and use AI to detect
            product handovers in real time.
          </p>
        </div>

        <button
          type="button"
          className="sales-export-button"
        >
          Export Report
        </button>
      </section>

      {/* KPI CARDS */}
      <section className="sales-kpi-grid">

        <div className="sales-kpi-card">
          <span>Total Revenue</span>
          <strong>
            ${totalRevenue.toLocaleString()}
          </strong>
          <small>Across all recorded sales</small>
        </div>

        <div className="sales-kpi-card">
          <span>Completed Sales</span>
          <strong>{completedSales}</strong>
          <small>Successfully completed</small>
        </div>

        <div className="sales-kpi-card">
          <span>Flagged Sales</span>
          <strong>{flaggedSales}</strong>
          <small>Require investigation</small>
        </div>

        <div className="sales-kpi-card">
          <span>Pending Sales</span>
          <strong>{pendingSales}</strong>
          <small>Awaiting completion</small>
        </div>

      </section>

      {/* REVENUE OVERVIEW */}
      <section className="sales-panel">

        <div className="sales-panel-header">
          <div>
            <span className="section-label">
              REVENUE ANALYTICS
            </span>

            <h2>Revenue Overview</h2>

            <p>
              Revenue generated from recent product sales.
            </p>
          </div>
        </div>

        <div className="sales-chart">
          <div className="chart-y-axis">
            <span>$2,000</span>
            <span>$1,500</span>
            <span>$1,000</span>
            <span>$500</span>
            <span>$0</span>
          </div>

          <div className="chart-area">

            <div
              className="chart-grid-line"
              style={{ top: "0%" }}
            />

            <div
              className="chart-grid-line"
              style={{ top: "25%" }}
            />

            <div
              className="chart-grid-line"
              style={{ top: "50%" }}
            />

            <div
              className="chart-grid-line"
              style={{ top: "75%" }}
            />

            <div
              className="chart-grid-line"
              style={{ top: "100%" }}
            />

            <div className="sales-bars">

              {SALES.slice(0, 6).map((sale) => {
                const height = Math.min(
                  (sale.amount / 2000) * 100,
                  100
                );

                return (
                  <div
                    className="sales-bar-group"
                    key={sale.id}
                  >
                    <div
                      className="sales-bar"
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${sale.product}: $${sale.amount}`}
                    />

                    <span>
                      {sale.id.replace("SAL-", "")}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY PERFORMANCE */}
      <section className="sales-panel">

        <div className="sales-panel-header">
          <div>
            <span className="section-label">
              PRODUCT ANALYTICS
            </span>

            <h2>Category Performance</h2>

            <p>
              Revenue distribution across product
              categories.
            </p>
          </div>
        </div>

        <div className="category-performance">

          {[
            {
              name: "Laptops",
              revenue: 2749,
              percentage: 82,
            },
            {
              name: "Smartphones",
              revenue: 2198,
              percentage: 68,
            },
            {
              name: "Printers",
              revenue: 380,
              percentage: 32,
            },
            {
              name: "Bottled Products",
              revenue: 48,
              percentage: 18,
            },
          ].map((category) => (
            <div
              className="category-row"
              key={category.name}
            >
              <div className="category-info">
                <span>{category.name}</span>
                <strong>
                  ${category.revenue.toLocaleString()}
                </strong>
              </div>

              <div className="category-progress">
                <span
                  style={{
                    width: `${category.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* AI PRODUCT HANDOVER DETECTION */}
      <section className="handover-section">

        <div className="handover-header">

          <div>
            <span className="section-label">
              AI MONITORING
            </span>

            <h2>AI Product Handover Detection</h2>

            <p>
              AI-powered monitoring of products being
              handed over after a completed sale.
            </p>
          </div>

          <div className="ai-live-status">
            <span className="live-dot" />
            AI Monitoring Active
          </div>

        </div>

        {/* HANDOVER SUMMARY */}
        <div className="handover-summary">

          <div className="handover-stat">
            <span className="handover-stat-icon">
              ◉
            </span>

            <div>
              <strong>{HANDOVERS.length}</strong>
              <span>Handovers Detected</span>
            </div>
          </div>

          <div className="handover-stat">
            <span className="handover-stat-icon success">
              ✓
            </span>

            <div>
              <strong>{verifiedHandovers}</strong>
              <span>Verified</span>
            </div>
          </div>

          <div className="handover-stat">
            <span className="handover-stat-icon warning">
              !
            </span>

            <div>
              <strong>{reviewHandovers}</strong>
              <span>Require Review</span>
            </div>
          </div>

          <div className="handover-stat">
            <span className="handover-stat-icon confidence">
              AI
            </span>

            <div>
              <strong>{averageConfidence}%</strong>
              <span>AI Confidence</span>
            </div>
          </div>

        </div>

        {/* HANDOVER TABLE */}
        <div className="handover-table-wrapper">

          <table className="handover-table">

            <thead>
              <tr>
                <th>Handover ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Sale Amount</th>
                <th>AI Detection</th>
                <th>Risk Level</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {HANDOVERS.map((handover) => (
                <tr key={handover.id}>

                  <td>
                    <strong>{handover.id}</strong>
                  </td>

                  <td>
                    <div className="product-cell">

                      <div
                        className={`product-icon ${handover.iconClass}`}
                      >
                        {handover.icon}
                      </div>

                      <div>
                        <strong>
                          {handover.product}
                        </strong>

                        <span>
                          {handover.productType}
                        </span>
                      </div>

                    </div>
                  </td>

                  <td>{handover.customer}</td>

                  <td>
                    <strong>
                      ${handover.amount.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <div className="ai-confidence">

                      <div className="confidence-bar">
                        <span
                          style={{
                            width: `${handover.confidence}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {handover.confidence}%
                      </strong>

                    </div>
                  </td>

                  <td>
                    <span
                      className={`risk-badge ${handover.risk.toLowerCase()}`}
                    >
                      {handover.risk}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`handover-status ${handover.status.toLowerCase()}`}
                    >
                      {handover.status === "Verified"
                        ? "✓ "
                        : handover.status === "Review"
                        ? "! "
                        : "● "}

                      {handover.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* SALES RECORDS */}
      <section className="sales-panel">

        <div className="sales-panel-header">
          <div>
            <span className="section-label">
              SALES RECORDS
            </span>

            <h2>Recent Sales</h2>

            <p>
              Search and filter recorded product sales.
            </p>
          </div>

          <input
            className="sales-search"
            type="text"
            placeholder="Search sales..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="sales-filters">

          <button
            type="button"
            className={
              statusFilter === "All"
                ? "active-filter"
                : ""
            }
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>

          <button
            type="button"
            className={
              statusFilter === "Completed"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setStatusFilter("Completed")
            }
          >
            Completed
          </button>

          <button
            type="button"
            className={
              statusFilter === "Pending"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setStatusFilter("Pending")
            }
          >
            Pending
          </button>

          <button
            type="button"
            className={
              statusFilter === "Flagged"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setStatusFilter("Flagged")
            }
          >
            Flagged
          </button>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Smartphones">
              Smartphones
            </option>

            <option value="Laptops">
              Laptops
            </option>

            <option value="Printers">
              Printers
            </option>

            <option value="Bottled Products">
              Bottled Products
            </option>
          </select>

        </div>

        <div className="sales-table-wrapper">

          <table className="sales-table">

            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredSales.map((sale) => (
                <tr key={sale.id}>

                  <td>
                    <strong>{sale.id}</strong>
                  </td>

                  <td>{sale.customer}</td>

                  <td>{sale.product}</td>

                  <td>{sale.category}</td>

                  <td>
                    <strong>
                      ${sale.amount.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`sale-status ${sale.status.toLowerCase()}`}
                    >
                      {sale.status}
                    </span>
                  </td>

                  <td>{sale.date}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {filteredSales.length === 0 && (
          <div className="sales-empty">
            <strong>No sales found</strong>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}