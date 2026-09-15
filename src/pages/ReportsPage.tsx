import {
  BarChart3,
  ShieldCheck,
  TriangleAlert,
  ClipboardCheck,
  FileText,
  Download,
} from "lucide-react";

const reports = [
  {
    title: "Overall Compliance",
    description: "View your organization's overall compliance status.",
    icon: ShieldCheck,
    status: "92% Compliant",
  },
  {
    title: "Risk Assessment",
    description: "Review identified risks and their severity levels.",
    icon: TriangleAlert,
    status: "6 Open Risks",
  },
  {
    title: "Audit Report",
    description: "View completed and upcoming compliance audits.",
    icon: ClipboardCheck,
    status: "8 Audits",
  },
  {
    title: "Policy Compliance",
    description: "Monitor policy implementation and compliance.",
    icon: FileText,
    status: "48 Policies",
  },
];

export default function ReportsPage() {
  return (
    <div className="reports-page">
      
      <div className="page-header">
        <div>
          <h1>Compliance Reports</h1>
          <p>
            Generate, review, and download compliance reports.
          </p>
        </div>

        <button className="primary-button">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="reports-grid">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div className="report-card" key={report.title}>
              
              <div className="report-icon">
                <Icon size={24} />
              </div>

              <h3>{report.title}</h3>

              <p>{report.description}</p>

              <div className="report-footer">
                <span>{report.status}</span>

                <button>
                  View Report
                </button>
              </div>

            </div>
          );
        })}
      </div>


      <div className="report-summary">

        <div className="summary-header">
          <div>
            <h2>Compliance Summary</h2>
            <p>Overview of your organization's compliance performance.</p>
          </div>

          <BarChart3 size={24} />
        </div>


        <div className="summary-stats">

          <div>
            <span>Compliance Score</span>
            <strong>92%</strong>
          </div>

          <div>
            <span>Open Risks</span>
            <strong>6</strong>
          </div>

          <div>
            <span>Policies</span>
            <strong>48</strong>
          </div>

          <div>
            <span>Completed Audits</span>
            <strong>8</strong>
          </div>

        </div>

      </div>

    </div>
  );
}