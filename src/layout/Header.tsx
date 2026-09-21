import "./Header.css";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

interface SearchItem {
  title: string;
  category: string;
  path: string;
}

const SEARCH_DATA: SearchItem[] = [
  {
    title: "Overview Dashboard",
    category: "Dashboard",
    path: "/",
  },
  {
    title: "Compliance Reports",
    category: "Reports",
    path: "/reports",
  },
  {
    title: "Flagged Risks",
    category: "Risk Management",
    path: "/risks",
  },
  {
    title: "Data Protection Policy",
    category: "Policies",
    path: "/policies",
  },
  {
    title: "Access Control Policy",
    category: "Policies",
    path: "/policies",
  },
  {
    title: "IT Security Audit",
    category: "Audits",
    path: "/audits",
  },
  {
    title: "Alerts",
    category: "Monitoring",
    path: "/alerts",
  },
  {
    title: "Users & Roles",
    category: "Administration",
    path: "/users",
  },
  {
    title: "Settings",
    category: "System",
    path: "/settings",
  },
];

export default function Header({
  onMenuClick,
  darkMode,
  onDarkModeToggle,
}: HeaderProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = 3;

  const filteredResults =
    search.trim().length > 0
      ? SEARCH_DATA.filter((item) =>
          `${item.title} ${item.category}`
            .toLowerCase()
            .includes(search.toLowerCase())
        ).slice(0, 6)
      : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();

        const input =
          searchRef.current?.querySelector<HTMLInputElement>(
            "input"
          );

        input?.focus();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode
      ? "dark"
      : "light";
  }, [darkMode]);

  const handleSearchNavigate = (path: string) => {
    navigate(path);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={21} />
        </button>

        <div className="header-title">
          <span className="header-eyebrow">
            COMPLIANCE CENTER
          </span>

          <h1>Business Intelligence</h1>
        </div>
      </div>

      <div className="header-actions">
        {/* SEARCH */}
        <div
          className={`header-search ${
            searchOpen ? "search-active" : ""
          }`}
          ref={searchRef}
        >
          <Search size={18} />

          <input
            type="text"
            value={search}
            placeholder="Search dashboard..."
            onFocus={() => setSearchOpen(true)}
            onChange={(event) => {
              setSearch(event.target.value);
              setSearchOpen(true);
            }}
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

          {!search && (
            <span className="search-shortcut">
              Ctrl K
            </span>
          )}

          {searchOpen && search.trim() && (
            <div className="search-results">
              {filteredResults.length > 0 ? (
                <>
                  <div className="search-results-heading">
                    Search results
                  </div>

                  {filteredResults.map((item) => (
                    <button
                      type="button"
                      className="search-result"
                      key={`${item.title}-${item.path}`}
                      onClick={() =>
                        handleSearchNavigate(item.path)
                      }
                    >
                      <div className="search-result-icon">
                        <Search size={15} />
                      </div>

                      <div className="search-result-content">
                        <strong>{item.title}</strong>
                        <span>{item.category}</span>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="search-empty">
                  <Search size={20} />
                  <strong>No results found</strong>
                  <span>
                    Try searching for a policy, risk or audit.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* THEME */}
        <button
          type="button"
          className="header-icon-button theme-button"
          onClick={onDarkModeToggle}
          aria-label={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {darkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        {/* NOTIFICATIONS */}
        <div
          className="header-dropdown-wrapper"
          ref={notificationRef}
        >
          <button
            type="button"
            className={`header-icon-button notification-button ${
              notificationsOpen ? "active" : ""
            }`}
            onClick={() => {
              setNotificationsOpen((current) => !current);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={19} />

            {unreadNotifications > 0 && (
              <span className="notification-badge">
                {unreadNotifications}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="header-dropdown notifications-dropdown">
              <div className="dropdown-header">
                <div>
                  <strong>Notifications</strong>
                  <span>
                    {unreadNotifications} unread
                  </span>
                </div>

                <button type="button">
                  <Check size={15} />
                  Mark all read
                </button>
              </div>

              <div className="notification-list">
                <button
                  type="button"
                  className="notification-item unread"
                  onClick={() => navigate("/risks")}
                >
                  <div className="notification-dot critical" />

                  <div>
                    <strong>High-risk transaction detected</strong>
                    <span>
                      A transaction requires immediate review.
                    </span>
                    <small>5 minutes ago</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="notification-item unread"
                  onClick={() => navigate("/alerts")}
                >
                  <div className="notification-dot warning" />

                  <div>
                    <strong>Multiple login failures</strong>
                    <span>
                      Unusual authentication activity detected.
                    </span>
                    <small>18 minutes ago</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="notification-item unread"
                  onClick={() => navigate("/policies")}
                >
                  <div className="notification-dot info" />

                  <div>
                    <strong>Policy review approaching</strong>
                    <span>
                      A compliance policy is due for review.
                    </span>
                    <small>1 hour ago</small>
                  </div>
                </button>
              </div>

              <button
                type="button"
                className="dropdown-footer-button"
                onClick={() => navigate("/alerts")}
              >
                View all alerts
              </button>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          className="header-dropdown-wrapper"
          ref={profileRef}
        >
          <button
            type="button"
            className={`profile-button ${
              profileOpen ? "active" : ""
            }`}
            onClick={() => {
              setProfileOpen((current) => !current);
              setNotificationsOpen(false);
            }}
          >
            <span className="profile-avatar">NM</span>

            <span className="profile-info">
              <strong>Admin User</strong>
              <small>Administrator</small>
            </span>

            <ChevronDown
              size={16}
              className={`profile-chevron ${
                profileOpen ? "rotate" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-dropdown-header">
                <span className="profile-avatar large">
                  NM
                </span>

                <div>
                  <strong>Admin User</strong>
                  <span>Administrator</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="profile-menu-item"
                onClick={() => navigate("/profile")}
              >
                <User size={17} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className="profile-menu-item"
                onClick={() => navigate("/settings")}
              >
                <Settings size={17} />
                <span>Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}