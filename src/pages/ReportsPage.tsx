import { useEffect, useState } from "react";
import ReportsSkeleton from "../components/LoadingSkeleton/ReportsSkeleton.tsx";
import "./ReportsPage.css";

interface Report {
  id: string;
  title: string;
  type: string;
  status: string;
  score: number;
}

const REPORTS: Report[] = [
  {
    id: "REP-001",
    title: "Monthly Compliance Report",
    type: "Compliance",
    status: "Completed",
    score: 94,
  },
  {
    id: "REP-002",
    title: "Enterprise Risk Assessment",
    type: "Risk",
    status: "In Progress",
    score: 88,
  },
  {
    id: "REP-003",
    title: "Internal Audit Report",
    type: "Audit",
    status: "Completed",
    score: 91,
  },
  {
    id: "REP-004",
    title: "Financial Controls Report",
    type: "Financial",
    status: "Pending",
    score: 0,
  },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredReports = REPORTS.filter((report) =>
    report.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <ReportsSkeleton />;
  }

  return (
    <main className="reports-page">
      <section className="reports-hero">
        <div>
          <span className="reports-overline">
            COMPLIANCE CENTER
          </span>

          <h1>Compliance Reports</h1>

          <p>
            Analyze compliance performance and monitor your
            organization's reports.
          </p>
        </div>
      </section>

      <section className="reports-kpi-grid">
        <div className="report-kpi-card">
          <span>Total Reports</span>
          <strong>{REPORTS.length}</strong>
        </div>

        <div className="report-kpi-card">
          <span>Completed</span>
          <strong>
            {
              REPORTS.filter(
                (report) => report.status === "Completed"
              ).length
            }
          </strong>
        </div>

        <div className="report-kpi-card">
          <span>In Progress</span>
          <strong>
            {
              REPORTS.filter(
                (report) => report.status === "In Progress"
              ).length
            }
          </strong>
        </div>

        <div className="report-kpi-card">
          <span>Pending</span>
          <strong>
            {
              REPORTS.filter(
                (report) => report.status === "Pending"
              ).length
            }
          </strong>
        </div>
      </section>

      <section className="reports-library">
        <div className="library-header">
          <div>
            <span className="section-label">
              REPORT LIBRARY
            </span>

            <h2>Recent Reports</h2>
          </div>

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="report-grid">
          {filteredReports.map((report) => (
            <article
              className="report-card"
              key={report.id}
            >
              <div className="report-card-top">
                <span className="report-type">
                  {report.type}
                </span>

                <span className="report-status">
                  {report.status}
                </span>
              </div>

              <span className="report-id">
                {report.id}
              </span>

              <h3>{report.title}</h3>

              <div className="report-score">
                <span>Compliance Score</span>

                <strong>
                  {report.score > 0
                    ? `${report.score}%`
                    : "Pending"}
                </strong>
              </div>

              <button type="button">
                View Report →
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}