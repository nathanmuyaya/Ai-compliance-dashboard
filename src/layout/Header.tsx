
import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onMenuClick: () => void;
};

const SEARCH_DATA = [
  {
    title: "High Risk Transaction",
    description: "Transaction exceeded the configured risk threshold",
    type: "Risk",
    path: "/risks",
  },
  {
    title: "Third-party Vendor Risk",
    description: "Vendor requires compliance review",
    type: "Risk",
    path: "/risks",
  },
  {
    title: "Data Protection Policy",
    description: "Policy expires soon",
    type: "Policy",
    path: "/policies",
  },
  {
    title: "Access Control Policy",
    description: "User access requirements and controls",
    type: "Policy",
    path: "/policies",
  },
  {
    title: "IT Security Audit",
    description: "Scheduled compliance audit",
    type: "Audit",
    path: "/audits",
  },
  {
    title: "Annual Compliance Report",
    description: "Annual compliance assessment",
    type: "Report",
    path: "/reports",
  },
  {
    title: "High Risk Alert",
    description: "A high severity compliance alert",
    type: "Alert",
    path: "/alerts",
  },
];

export default function Header({ onMenuClick }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode
      ? "dark"
      : "light";
  }, [darkMode]);

  const filteredResults = SEARCH_DATA.filter((item) => {
    if (!searchQuery.trim()) {
      return false;
    }

    const query = searchQuery.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  const handleResultClick = (path: string) => {
    setSearchQuery("");
    navigate(path);
  };

  return (
    <header className="header">

      {/* LEFT SECTION */}
      <div className="header-left">

        <button
          className="icon-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* SEARCH */}
        <div className="search-wrapper">

          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search policies, risks, audits..."
            />

            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
                type="button"
              >
                ×
              </button>
            )}

          </div>

          {/* SEARCH RESULTS */}
          {searchQuery.trim() !== "" && (
            <div className="search-results">

              {filteredResults.length > 0 ? (
                <>
                  <div className="search-results-header">
                    <span>Search results</span>
                    <span>{filteredResults.length}</span>
                  </div>

                  {filteredResults.map((result) => (
                    <button
                      key={result.title}
                      className="search-result"
                      onClick={() =>
                        handleResultClick(result.path)
                      }
                      type="button"
                    >
                      <div className="search-result-icon">
                        <Search size={17} />
                      </div>

                      <div className="search-result-content">
                        <strong>{result.title}</strong>

                        <span>
                          {result.description}
                        </span>
                      </div>

                      <span className="search-result-type">
                        {result.type}
                      </span>
                    </button>
                  ))}
                </>
              ) : (
                <div className="search-no-results">
                  <Search size={20} />

                  <strong>
                    No results found
                  </strong>

                  <span>
                    Try searching for a policy, risk,
                    audit, report, or alert.
                  </span>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="header-actions">

        {/* NOTIFICATIONS */}
        <div className="dropdown-wrapper">

          <button
            className="icon-button notification-button"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            type="button"
          >
            <Bell size={20} />

            <span className="notification-badge">
              5
            </span>
          </button>

          {showNotifications && (
            <div className="dropdown notifications-dropdown">

              <div className="dropdown-header">
                <h3>Notifications</h3>
                <span>5 new</span>
              </div>

              <div className="notification-item">
                <div className="notification-icon">
                  ⚠
                </div>

                <div>
                  <strong>
                    High risk detected
                  </strong>

                  <p>
                    Third-party vendor requires attention.
                  </p>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon">
                  📄
                </div>

                <div>
                  <strong>
                    Policy expiring soon
                  </strong>

                  <p>
                    Data Protection Policy expires soon.
                  </p>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Audit scheduled
                  </strong>

                  <p>
                    IT Security Audit is scheduled tomorrow.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* THEME BUTTON */}
        <button
          className="icon-button"
          onClick={() => setDarkMode(!darkMode)}
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          type="button"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* PROFILE */}
        <div className="dropdown-wrapper">

          <button
            className="profile-button"
            onClick={() =>
              setShowProfile(!showProfile)
            }
            type="button"
          >
            <div className="profile-avatar">
              US
            </div>

            <div className="profile-info">
              <strong>UserAdmin</strong>

              <span>
                Compliance Officer
              </span>
            </div>
          </button>

          {showProfile && (
            <div className="dropdown profile-dropdown">

              <div className="profile-menu-header">

                <div className="profile-avatar large">
                  US
                </div>

                <div>
                  <strong>UserAdmin</strong>

                  <p>
                    Compliance Officer
                  </p>
                </div>

              </div>

              <hr />

              <button type="button">
                <User size={16} />
                My Profile
              </button>

              <button type="button">
                ⚙ Settings
              </button>

              <button
                className="logout-button"
                type="button"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

