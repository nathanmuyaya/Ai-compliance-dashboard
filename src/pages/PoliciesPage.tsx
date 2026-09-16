import { useState } from "react";
import "./PoliciesPage.css";

interface Policy {
  id: number;
  name: string;
  category: string;
  owner: string;
  status: "Active" | "Under Review" | "Expired";
  lastReviewed: string;
  nextReview: string;
}

const policies: Policy[] = [
  {
    id: 1,
    name: "Data Protection Policy",
    category: "Data Privacy",
    owner: "Compliance Team",
    status: "Active",
    lastReviewed: "12 Aug 2026",
    nextReview: "12 Aug 2027",
  },
  {
    id: 2,
    name: "Information Security Policy",
    category: "Security",
    owner: "IT Department",
    status: "Active",
    lastReviewed: "05 Jul 2026",
    nextReview: "05 Jul 2027",
  },
  {
    id: 3,
    name: "Anti-Money Laundering Policy",
    category: "Financial Compliance",
    owner: "Risk Department",
    status: "Under Review",
    lastReviewed: "18 Jun 2026",
    nextReview: "18 Sep 2026",
  },
  {
    id: 4,
    name: "Employee Code of Conduct",
    category: "Human Resources",
    owner: "HR Department",
    status: "Active",
    lastReviewed: "21 May 2026",
    nextReview: "21 May 2027",
  },
  {
    id: 5,
    name: "Business Continuity Policy",
    category: "Operations",
    owner: "Operations Team",
    status: "Expired",
    lastReviewed: "10 Jan 2025",
    nextReview: "10 Jan 2026",
  },
];

export default function Policies() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(search.toLowerCase()) ||
      policy.category.toLowerCase().includes(search.toLowerCase()) ||
      policy.owner.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || policy.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Policies</h1>
          <p>
            Manage, review and monitor your organization's compliance policies.
          </p>
        </div>

        <button
  className="primary-button"
  onClick={() => setShowModal(true)}
>
  + Add Policy
</button>
      </div>

      <div className="policy-summary">
        <div className="summary-card">
          <span>Total Policies</span>
          <strong>{policies.length}</strong>
        </div>

        <div className="summary-card">
          <span>Active</span>
          <strong>
            {policies.filter((p) => p.status === "Active").length}
          </strong>
        </div>

        <div className="summary-card">
          <span>Under Review</span>
          <strong>
            {policies.filter((p) => p.status === "Under Review").length}
          </strong>
        </div>

        <div className="summary-card">
          <span>Expired</span>
          <strong>
            {policies.filter((p) => p.status === "Expired").length}
          </strong>
        </div>
      </div>

      <div className="policy-panel">
        <div className="policy-toolbar">
          <input
            type="text"
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

       {/* Desktop Table */}
<div className="policy-table-wrapper desktop-policy-table">
  <table className="policy-table">
    <thead>
      <tr>
        <th>Policy</th>
        <th>Category</th>
        <th>Owner</th>
        <th>Status</th>
        <th>Last Reviewed</th>
        <th>Next Review</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredPolicies.map((policy) => (
        <tr key={policy.id}>
          <td>
            <div className="policy-name">
              <strong>{policy.name}</strong>
              <span>
                POL-{String(policy.id).padStart(3, "0")}
              </span>
            </div>
          </td>

          <td>{policy.category}</td>

          <td>{policy.owner}</td>

          <td>
            <span
              className={`policy-status ${policy.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {policy.status}
            </span>
          </td>

          <td>{policy.lastReviewed}</td>

          <td>{policy.nextReview}</td>

          <td>
            <div className="policy-actions">
              <button>View</button>
              <button>Edit</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {filteredPolicies.length === 0 && (
    <div className="empty-state">
      No policies found.
    </div>
  )}
</div>

{/* Mobile Policy Cards */}
<div className="mobile-policy-list">
  {filteredPolicies.map((policy) => (
    <div className="mobile-policy-card" key={policy.id}>
      <div className="mobile-policy-card-header">
        <div>
          <h3>{policy.name}</h3>
          <span>
            POL-{String(policy.id).padStart(3, "0")}
          </span>
        </div>

        <span
          className={`policy-status ${policy.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {policy.status}
        </span>
      </div>

      <div className="mobile-policy-details">
        <div>
          <span>Category</span>
          <strong>{policy.category}</strong>
        </div>

        <div>
          <span>Owner</span>
          <strong>{policy.owner}</strong>
        </div>

        <div>
          <span>Last Reviewed</span>
          <strong>{policy.lastReviewed}</strong>
        </div>

        <div>
          <span>Next Review</span>
          <strong>{policy.nextReview}</strong>
        </div>
      </div>

      <div className="mobile-policy-actions">
        <button>View</button>
        <button>Edit</button>
      </div>
    </div>
  ))}

  {filteredPolicies.length === 0 && (
    <div className="empty-state">
      No policies found.
    </div>
  )}
</div>
      </div>
{showModal && (
  <div className="modal-overlay">
    <div className="policy-modal">
      <div className="modal-header">
        <div>
          <h2>Add New Policy</h2>
          <p>Create a new compliance policy.</p>
        </div>

        <button
          className="modal-close"
          onClick={() => setShowModal(false)}
        >
          ×
        </button>
      </div>

      <div className="modal-form">
        <label>
          Policy Name
          <input
            type="text"
            placeholder="e.g. Data Protection Policy"
          />
        </label>

        <label>
          Category
          <select defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            <option>Data Privacy</option>
            <option>Security</option>
            <option>Financial Compliance</option>
            <option>Human Resources</option>
            <option>Operations</option>
          </select>
        </label>

        <label>
          Policy Owner
          <input
            type="text"
            placeholder="e.g. Compliance Team"
          />
        </label>

        <label>
          Next Review Date
          <input type="date" />
        </label>
      </div>

      <div className="modal-footer">
        <button
          className="secondary-button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

        <button
          className="primary-button"
          onClick={() => setShowModal(false)}
        >
          Create Policy
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}