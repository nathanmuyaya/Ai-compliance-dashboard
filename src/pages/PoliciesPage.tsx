import { useMemo, useState } from "react";
import "./PoliciesPage.css";

type PolicyStatus = "Active" | "Under Review" | "Expired";

interface Policy {
  id: string;
  name: string;
  category: string;
  owner: string;
  status: PolicyStatus;
  lastReviewed: string;
  nextReview: string;
}

const INITIAL_POLICIES: Policy[] = [
  {
    id: "POL-001",
    name: "Data Protection Policy",
    category: "Data Privacy",
    owner: "Compliance Team",
    status: "Active",
    lastReviewed: "12 Aug 2026",
    nextReview: "12 Aug 2027",
  },
  {
    id: "POL-002",
    name: "Information Security Policy",
    category: "Security",
    owner: "IT Department",
    status: "Active",
    lastReviewed: "05 Jul 2026",
    nextReview: "05 Jul 2027",
  },
  {
    id: "POL-003",
    name: "Anti-Money Laundering Policy",
    category: "Financial Compliance",
    owner: "Risk Department",
    status: "Under Review",
    lastReviewed: "18 Jun 2026",
    nextReview: "18 Sep 2026",
  },
  {
    id: "POL-004",
    name: "Access Control Policy",
    category: "Security",
    owner: "IT Department",
    status: "Active",
    lastReviewed: "22 May 2026",
    nextReview: "22 May 2027",
  },
  {
    id: "POL-005",
    name: "Business Continuity Policy",
    category: "Operations",
    owner: "Operations Team",
    status: "Expired",
    lastReviewed: "15 Jan 2025",
    nextReview: "15 Jan 2026",
  },
];

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>(
    INITIAL_POLICIES
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedPolicy, setSelectedPolicy] =
    useState<Policy | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [newPolicy, setNewPolicy] = useState({
    name: "",
    category: "",
    owner: "",
    status: "Active" as PolicyStatus,
    lastReviewed: "",
    nextReview: "",
  });

  /* =========================================
     FILTER OPTIONS
  ========================================= */

  const categories = useMemo(() => {
    return Array.from(
      new Set(policies.map((policy) => policy.category))
    );
  }, [policies]);

  /* =========================================
     FILTER POLICIES
  ========================================= */

  const filteredPolicies = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return policies.filter((policy) => {
      const matchesSearch =
        policy.name.toLowerCase().includes(search) ||
        policy.id.toLowerCase().includes(search) ||
        policy.owner.toLowerCase().includes(search) ||
        policy.category.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        policy.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        policy.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    policies,
    searchTerm,
    statusFilter,
    categoryFilter,
  ]);

  /* =========================================
     SUMMARY COUNTS
  ========================================= */

  const totalPolicies = policies.length;

  const activePolicies = policies.filter(
    (policy) => policy.status === "Active"
  ).length;

  const reviewPolicies = policies.filter(
    (policy) => policy.status === "Under Review"
  ).length;

  const expiredPolicies = policies.filter(
    (policy) => policy.status === "Expired"
  ).length;

  /* =========================================
     STATUS CLASS
  ========================================= */

  const getStatusClass = (status: PolicyStatus) => {
    if (status === "Under Review") {
      return "review";
    }

    return status.toLowerCase();
  };

  /* =========================================
     ADD POLICY
  ========================================= */

  const handleAddPolicy = () => {
    if (
      !newPolicy.name.trim() ||
      !newPolicy.category.trim() ||
      !newPolicy.owner.trim()
    ) {
      return;
    }

    const policy: Policy = {
      id: `POL-${String(policies.length + 1).padStart(
        3,
        "0"
      )}`,
      name: newPolicy.name,
      category: newPolicy.category,
      owner: newPolicy.owner,
      status: newPolicy.status,
      lastReviewed:
        newPolicy.lastReviewed || "Not reviewed",
      nextReview:
        newPolicy.nextReview || "Not scheduled",
    };

    setPolicies((current) => [...current, policy]);

    setNewPolicy({
      name: "",
      category: "",
      owner: "",
      status: "Active",
      lastReviewed: "",
      nextReview: "",
    });

    setShowAddModal(false);
  };

  return (
    <main className="policies-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="policies-header">
        <div>
          <span className="policies-eyebrow">
            COMPLIANCE
          </span>

          <h1>Policies</h1>

          <p>
            Manage, review, and monitor organizational
            compliance policies.
          </p>
        </div>

        <button
          className="add-policy-button"
          onClick={() => setShowAddModal(true)}
        >
          + Add Policy
        </button>
      </section>

      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <section className="policy-summary-grid">

        <div className="policy-card">
          <span>Total Policies</span>
          <strong>{totalPolicies}</strong>
          <small>All registered policies</small>
        </div>

        <div className="policy-card">
          <span>Active</span>
          <strong>{activePolicies}</strong>
          <small>Currently active</small>
        </div>

        <div className="policy-card">
          <span>Under Review</span>
          <strong>{reviewPolicies}</strong>
          <small>Require attention</small>
        </div>

        <div className="policy-card">
          <span>Expired</span>
          <strong>{expiredPolicies}</strong>
          <small>Requires renewal</small>
        </div>

      </section>

      {/* =====================================
          POLICY REGISTER
      ===================================== */}

      <section className="policies-panel">

        <div className="policies-panel-header">

          <div>
            <h2>Policy Register</h2>

            <p>
              {filteredPolicies.length} policies displayed
            </p>
          </div>

          <div className="policy-search">
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

        </div>

        {/* FILTERS */}

        <div className="policy-filters">

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Under Review">
              Under Review
            </option>
            <option value="Expired">Expired</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
          >
            <option value="All">All Categories</option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

        </div>

        {/* =====================================
            TABLE
        ===================================== */}

        <div className="policies-table-wrapper">

          <table className="policies-table">

            <thead>
              <tr>
                <th>Policy</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Last Reviewed</th>
                <th>Next Review</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredPolicies.map((policy) => (
                <tr key={policy.id}>

                  <td>
                    <div className="policy-name">
                      <strong>{policy.name}</strong>
                      <span>{policy.id}</span>
                    </div>
                  </td>

                  <td>{policy.category}</td>

                  <td>{policy.owner}</td>

                  <td>
                    <span
                      className={`policy-status ${getStatusClass(
                        policy.status
                      )}`}
                    >
                      {policy.status}
                    </span>
                  </td>

                  <td>
                    {policy.lastReviewed}
                  </td>

                  <td>
                    {policy.nextReview}
                  </td>

                  <td>
                    <button
                      className="view-policy-button"
                      onClick={() =>
                        setSelectedPolicy(policy)
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {/* EMPTY STATE */}

          {filteredPolicies.length === 0 && (
            <div className="policy-empty-state">
              <strong>No policies found</strong>
              <p>
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* =====================================
          VIEW POLICY MODAL
      ===================================== */}

      {selectedPolicy && (
        <div
          className="policy-modal-overlay"
          onClick={() => setSelectedPolicy(null)}
        >
          <div
            className="policy-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="policy-modal-header">
              <div>
                <span>POLICY DETAILS</span>

                <h2>
                  {selectedPolicy.name}
                </h2>

                <small>
                  {selectedPolicy.id}
                </small>
              </div>

              <button
                className="policy-modal-close"
                onClick={() =>
                  setSelectedPolicy(null)
                }
              >
                ×
              </button>
            </div>

            <div className="policy-details-grid">

              <div>
                <span>Category</span>
                <strong>
                  {selectedPolicy.category}
                </strong>
              </div>

              <div>
                <span>Owner</span>
                <strong>
                  {selectedPolicy.owner}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedPolicy.status}
                </strong>
              </div>

              <div>
                <span>Last Reviewed</span>
                <strong>
                  {selectedPolicy.lastReviewed}
                </strong>
              </div>

              <div>
                <span>Next Review</span>
                <strong>
                  {selectedPolicy.nextReview}
                </strong>
              </div>

            </div>

            <div className="policy-modal-footer">

              <button
                className="modal-secondary-button"
                onClick={() =>
                  setSelectedPolicy(null)
                }
              >
                Close
              </button>

              <button
                className="modal-primary-button"
                onClick={() =>
                  setSelectedPolicy(null)
                }
              >
                Review Policy
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================
          ADD POLICY MODAL
      ===================================== */}

      {showAddModal && (
        <div
          className="policy-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="policy-modal add-policy-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="policy-modal-header">

              <div>
                <span>POLICY MANAGEMENT</span>

                <h2>Add New Policy</h2>
              </div>

              <button
                className="policy-modal-close"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ×
              </button>

            </div>

            <div className="policy-form">

              <label>
                Policy Name

                <input
                  type="text"
                  placeholder="e.g. Data Retention Policy"
                  value={newPolicy.name}
                  onChange={(event) =>
                    setNewPolicy({
                      ...newPolicy,
                      name: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Category

                <input
                  type="text"
                  placeholder="e.g. Data Privacy"
                  value={newPolicy.category}
                  onChange={(event) =>
                    setNewPolicy({
                      ...newPolicy,
                      category: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Policy Owner

                <input
                  type="text"
                  placeholder="e.g. Compliance Team"
                  value={newPolicy.owner}
                  onChange={(event) =>
                    setNewPolicy({
                      ...newPolicy,
                      owner: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Status

                <select
                  value={newPolicy.status}
                  onChange={(event) =>
                    setNewPolicy({
                      ...newPolicy,
                      status:
                        event.target
                          .value as PolicyStatus,
                    })
                  }
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Under Review">
                    Under Review
                  </option>

                  <option value="Expired">
                    Expired
                  </option>
                </select>
              </label>

              <label>
                Last Reviewed

                <input
                  type="date"
                  value={newPolicy.lastReviewed}
                  onChange={(event) =>
                    setNewPolicy({
                      ...newPolicy,
                      lastReviewed:
                        event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Next Review

                <input
                  type="date"
                  value={newPolicy.nextReview}
                  onChange={(event) =>
                    setNewPolicy({
                      ...newPolicy,
                      nextReview:
                        event.target.value,
                    })
                  }
                />
              </label>

            </div>

            <div className="policy-modal-footer">

              <button
                className="modal-secondary-button"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="modal-primary-button"
                onClick={handleAddPolicy}
              >
                Add Policy
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}