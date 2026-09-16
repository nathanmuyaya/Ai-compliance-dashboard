import { useState } from "react";
import "./UsersPage.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastActive: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Banda",
    email: "john.banda@company.com",
    role: "Administrator",
    status: "Active",
    lastActive: "Today, 10:32 AM",
  },
  {
    id: 2,
    name: "Mary Phiri",
    email: "mary.phiri@company.com",
    role: "Compliance Manager",
    status: "Active",
    lastActive: "Today, 09:15 AM",
  },
  {
    id: 3,
    name: "David Mwansa",
    email: "david.mwansa@company.com",
    role: "Risk Analyst",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: 4,
    name: "Grace Zulu",
    email: "grace.zulu@company.com",
    role: "Auditor",
    status: "Inactive",
    lastActive: "12 Sep 2026",
  },
  {
    id: 5,
    name: "Peter Tembo",
    email: "peter.tembo@company.com",
    role: "Viewer",
    status: "Active",
    lastActive: "11 Sep 2026",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="users-page">
      {/* Header */}
      <div className="users-header">
        <div>
          <h1>Users & Roles</h1>
          <p>Manage users, roles and permissions across the dashboard.</p>
        </div>

        <button
          className="users-primary-button"
          onClick={() => setShowModal(true)}
        >
          + Add User
        </button>
      </div>

      {/* Summary */}
      <div className="users-summary">
        <div className="users-summary-card">
          <span>Total Users</span>
          <strong>{users.length}</strong>
        </div>

        <div className="users-summary-card">
          <span>Active Users</span>
          <strong>
            {users.filter((user) => user.status === "Active").length}
          </strong>
        </div>

        <div className="users-summary-card">
          <span>Administrators</span>
          <strong>
            {users.filter((user) => user.role === "Administrator").length}
          </strong>
        </div>

        <div className="users-summary-card">
          <span>Inactive</span>
          <strong>
            {users.filter((user) => user.status === "Inactive").length}
          </strong>
        </div>
      </div>

      {/* Users Panel */}
      <div className="users-panel">
        <div className="users-toolbar">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Compliance Manager">
              Compliance Manager
            </option>
            <option value="Risk Analyst">Risk Analyst</option>
            <option value="Auditor">Auditor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        {/* Desktop Table */}
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{user.role}</td>

                  <td>
                    <span
                      className={`user-status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.lastActive}</td>

                  <td>
                    <div className="user-actions">
                      <button>View</button>
                      <button>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="users-empty">
              No users found.
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="mobile-users-list">
          {filteredUsers.map((user) => (
            <div className="mobile-user-card" key={user.id}>
              <div className="mobile-user-header">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                <span
                  className={`user-status ${user.status.toLowerCase()}`}
                >
                  {user.status}
                </span>
              </div>

              <div className="mobile-user-details">
                <div>
                  <span>Role</span>
                  <strong>{user.role}</strong>
                </div>

                <div>
                  <span>Last Active</span>
                  <strong>{user.lastActive}</strong>
                </div>
              </div>

              <div className="mobile-user-actions">
                <button>View</button>
                <button>Edit</button>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="users-empty">
              No users found.
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="users-modal-overlay">
          <div className="users-modal">
            <div className="users-modal-header">
              <div>
                <h2>Add New User</h2>
                <p>Create a new dashboard user.</p>
              </div>

              <button
                className="users-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="users-form">
              <label>
                Full Name
                <input
                  type="text"
                  placeholder="e.g. John Banda"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  placeholder="e.g. john@company.com"
                />
              </label>

              <label>
                Role
                <select defaultValue="">
                  <option value="" disabled>
                    Select role
                  </option>
                  <option>Administrator</option>
                  <option>Compliance Manager</option>
                  <option>Risk Analyst</option>
                  <option>Auditor</option>
                  <option>Viewer</option>
                </select>
              </label>
            </div>

            <div className="users-modal-footer">
              <button
                className="users-secondary-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="users-primary-button"
                onClick={() => setShowModal(false)}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}