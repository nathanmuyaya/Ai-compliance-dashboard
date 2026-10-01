import "./Header.css";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldAlert,
  Sun,
  User,
  Users,
  X,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast/Toast";

interface HeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

interface SearchItem {
  title: string;
  category: string;
  path: string;
  type: "page" | "action";
  keywords?: string[];
}

const SEARCH_DATA: SearchItem[] = [
  {
    title: "Overview Dashboard",
    category: "Dashboard",
    path: "/",
    type: "page",
    keywords: ["home", "dashboard", "overview", "analytics"],
  },
  {
    title: "Compliance Reports",
    category: "Reports",
    path: "/reports",
    type: "page",
    keywords: ["report", "reports", "compliance", "analytics"],
  },
  {
    title: "Flagged Risks",
    category: "Risk Management",
    path: "/risks",
    type: "page",
    keywords: ["risk", "risks", "flagged", "danger"],
  },
  {
    title: "Data Protection Policy",
    category: "Policies",
    path: "/policies",
    type: "page",
    keywords: ["data", "protection", "privacy", "policy"],
  },
  {
    title: "Access Control Policy",
    category: "Policies",
    path: "/policies",
    type: "page",
    keywords: ["access", "control", "security", "policy"],
  },
  {
    title: "IT Security Audit",
    category: "Audits",
    path: "/audits",
    type: "page",
    keywords: ["audit", "security", "it", "review"],
  },
  {
    title: "Alerts",
    category: "Monitoring",
    path: "/alerts",
    type: "page",
    keywords: ["alert", "alerts", "notification", "monitoring"],
  },
  {
    title: "Users & Roles",
    category: "Administration",
    path: "/users",
    type: "page",
    keywords: ["users", "roles", "admin", "administration"],
  },
  {
    title: "Settings",
    category: "System",
    path: "/settings",
    type: "page",
    keywords: ["settings", "configuration", "preferences"],
  },
  {
    title: "My Profile",
    category: "Account",
    path: "/profile",
    type: "page",
    keywords: ["profile", "account", "user"],
  },
  {
    title: "Review Flagged Risks",
    category: "Risk Management",
    path: "/risks",
    type: "action",
    keywords: ["review", "risk", "flagged"],
  },
  {
    title: "View Compliance Reports",
    category: "Reports",
    path: "/reports",
    type: "action",
    keywords: ["view", "reports", "compliance"],
  },
  {
    title: "Open System Settings",
    category: "System",
    path: "/settings",
    type: "action",
    keywords: ["open", "settings", "system"],
  },
];

const ICONS: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Reports: FileText,
  "Risk Management": ShieldAlert,
  Policies: ClipboardCheck,
  Audits: ClipboardCheck,
  Monitoring: Bell,
  Administration: Users,
  System: Settings,
  Account: User,
};

export default function Header({
  onMenuClick,
  darkMode,
  onDarkModeToggle,
}: HeaderProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<
    string[]
  >(() => {
    try {
      const saved = localStorage.getItem(
        "dashboardRecentSearches"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = 3;

  const normalizedSearch = search.trim().toLowerCase();

  const filteredResults =
    normalizedSearch.length > 0
      ? SEARCH_DATA.filter((item) => {
          const searchableText = [
            item.title,
            item.category,
            ...(item.keywords ?? []),
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedSearch);
        }).slice(0, 8)
      : [];

  const pageResults = filteredResults.filter(
    (item) => item.type === "page"
  );

  const actionResults = filteredResults.filter(
    (item) => item.type === "action"
  );

  const allVisibleResults = [
    ...pageResults,
    ...actionResults,
  ];

  const highlightMatch = (text: string) => {
    if (!normalizedSearch) {
      return text;
    }

    const index = text
      .toLowerCase()
      .indexOf(normalizedSearch);

    if (index === -1) {
      return text;
    }

    return (
      <>
        {text.slice(0, index)}
        <mark>
          {text.slice(
            index,
            index + normalizedSearch.length
          )}
        </mark>
        {text.slice(index + normalizedSearch.length)}
      </>
    );
  };

  const saveRecentSearch = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    const updated = [
      trimmed,
      ...recentSearches.filter(
        (item) =>
          item.toLowerCase() !== trimmed.toLowerCase()
      ),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem(
      "dashboardRecentSearches",
      JSON.stringify(updated)
    );
  };

  /* =========================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
     ========================================================= */

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

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     KEYBOARD SHORTCUT
     ========================================================= */

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen(true);

        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);

        return;
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setSelectedIndex(0);
        return;
      }

      if (!searchOpen || !search.trim()) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((current) =>
          current < allVisibleResults.length - 1
            ? current + 1
            : 0
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedIndex((current) =>
          current > 0
            ? current - 1
            : Math.max(allVisibleResults.length - 1, 0)
        );
      }

      if (
        event.key === "Enter" &&
        allVisibleResults[selectedIndex]
      ) {
        event.preventDefault();

        const item = allVisibleResults[selectedIndex];

        saveRecentSearch(item.title);
        navigate(item.path);

        setSearch("");
        setSearchOpen(false);
        setSelectedIndex(0);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [
    searchOpen,
    search,
    allVisibleResults,
    selectedIndex,
    navigate,
    recentSearches,
  ]);

  /* =========================================================
     THEME
     ========================================================= */

  useEffect(() => {
    document.documentElement.dataset.theme =
      darkMode ? "dark" : "light";
  }, [darkMode]);

  /* =========================================================
     SEARCH
     ========================================================= */

  const openSearch = () => {
    setSearchOpen(true);

    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleSearchNavigate = (
    path: string,
    title?: string
  ) => {
    if (title) {
      saveRecentSearch(title);
    }

    navigate(path);

    setSearch("");
    setSearchOpen(false);
    setSelectedIndex(0);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setSearch(value);
    setSearchOpen(true);
    setSelectedIndex(0);
  };

  const handleRecentSearch = (value: string) => {
    setSearch(value);
    setSearchOpen(true);
    setSelectedIndex(0);

    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(
      "dashboardRecentSearches"
    );
  };

  /* =========================================================
     THEME TOGGLE
     ========================================================= */

  const handleThemeToggle = () => {
    const newMode = !darkMode;

    onDarkModeToggle();

    showToast({
      type: "info",
      title: newMode
        ? "Dark mode enabled"
        : "Light mode enabled",
      message: newMode
        ? "The dashboard is now using the dark interface."
        : "The dashboard is now using the light interface.",
    });
  };

  return (
    <header className="header">

      {/* =====================================================
          HEADER LEFT
          ===================================================== */}

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


      {/* =====================================================
          HEADER ACTIONS
          ===================================================== */}

      <div className="header-actions">

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          ref={searchRef}
          className={`header-search ${
            searchOpen ? "search-active" : ""
          }`}
          onClick={openSearch}
        >

          <Search
            size={18}
            className="header-search-icon"
          />

          <input
            ref={searchInputRef}
            type="text"
            value={search}
            placeholder="Search dashboard..."
            onFocus={() => setSearchOpen(true)}
            onChange={handleSearchChange}
            autoComplete="off"
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={(event) => {
                event.stopPropagation();
                setSearch("");
                setSelectedIndex(0);
                searchInputRef.current?.focus();
              }}
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

          {searchOpen && (
            <div
              className="search-results"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* =============================================
                  SEARCH WITH NO QUERY
              ============================================= */}

              {!search.trim() && (
                <>
                  {recentSearches.length > 0 ? (
                    <>
                      <div className="search-section-header">
                        <span>Recent searches</span>

                        <button
                          type="button"
                          onClick={clearRecentSearches}
                        >
                          Clear
                        </button>
                      </div>

                      <div className="recent-search-list">
                        {recentSearches.map(
                          (item, index) => (
                            <button
                              type="button"
                              className="recent-search-item"
                              key={`${item}-${index}`}
                              onClick={() =>
                                handleRecentSearch(item)
                              }
                            >
                              <Search size={15} />

                              <span>{item}</span>
                            </button>
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="search-welcome">
                      <div className="search-welcome-icon">
                        <Search size={20} />
                      </div>

                      <strong>
                        Search your dashboard
                      </strong>

                      <span>
                        Find pages, reports, policies,
                        risks and settings.
                      </span>

                      <div className="search-keyboard-hint">
                        <kbd>↑</kbd>
                        <kbd>↓</kbd>
                        <span>Navigate</span>

                        <kbd>Enter</kbd>
                        <span>Open</span>

                        <kbd>Esc</kbd>
                        <span>Close</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* =============================================
                  SEARCH RESULTS
              ============================================= */}

              {search.trim() && (
                <>
                  {allVisibleResults.length > 0 ? (
                    <>
                      {pageResults.length > 0 && (
                        <>
                          <div className="search-section-header">
                            <span>Pages</span>
                          </div>

                          {pageResults.map(
                            (item) => {
                              const globalIndex =
                                allVisibleResults.indexOf(
                                  item
                                );

                              const Icon =
                                ICONS[item.category] ??
                                Search;

                              return (
                                <button
                                  type="button"
                                  className={`search-result ${
                                    selectedIndex ===
                                    globalIndex
                                      ? "search-result-selected"
                                      : ""
                                  }`}
                                  key={`${item.title}-${item.path}`}
                                  onMouseEnter={() =>
                                    setSelectedIndex(
                                      globalIndex
                                    )
                                  }
                                  onClick={() =>
                                    handleSearchNavigate(
                                      item.path,
                                      item.title
                                    )
                                  }
                                >
                                  <div className="search-result-icon">
                                    <Icon size={16} />
                                  </div>

                                  <div className="search-result-content">
                                    <strong>
                                      {highlightMatch(
                                        item.title
                                      )}
                                    </strong>

                                    <span>
                                      {item.category}
                                    </span>
                                  </div>

                                  {selectedIndex ===
                                    globalIndex && (
                                    <span className="search-result-enter">
                                      Enter ↵
                                    </span>
                                  )}
                                </button>
                              );
                            }
                          )}
                        </>
                      )}

                      {actionResults.length > 0 && (
                        <>
                          <div className="search-section-header search-actions-heading">
                            <span>Actions</span>
                          </div>

                          {actionResults.map(
                            (item) => {
                              const globalIndex =
                                allVisibleResults.indexOf(
                                  item
                                );

                              return (
                                <button
                                  type="button"
                                  className={`search-result ${
                                    selectedIndex ===
                                    globalIndex
                                      ? "search-result-selected"
                                      : ""
                                  }`}
                                  key={`${item.title}-${item.path}`}
                                  onMouseEnter={() =>
                                    setSelectedIndex(
                                      globalIndex
                                    )
                                  }
                                  onClick={() =>
                                    handleSearchNavigate(
                                      item.path,
                                      item.title
                                    )
                                  }
                                >
                                  <div className="search-result-icon action-icon">
                                    <Search size={16} />
                                  </div>

                                  <div className="search-result-content">
                                    <strong>
                                      {highlightMatch(
                                        item.title
                                      )}
                                    </strong>

                                    <span>
                                      {item.category}
                                    </span>
                                  </div>

                                  {selectedIndex ===
                                    globalIndex && (
                                    <span className="search-result-enter">
                                      Enter ↵
                                    </span>
                                  )}
                                </button>
                              );
                            }
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <div className="search-empty">
                      <div className="search-empty-icon">
                        <Search size={22} />
                      </div>

                      <strong>
                        No results found
                      </strong>

                      <span>
                        Try searching for a policy,
                        risk, report or setting.
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* =============================================
                  SEARCH FOOTER
              ============================================= */}

              {search.trim() &&
                allVisibleResults.length > 0 && (
                  <div className="search-footer">
                    <span>
                      <kbd>↑</kbd>
                      <kbd>↓</kbd>
                      Navigate
                    </span>

                    <span>
                      <kbd>Enter</kbd>
                      Open
                    </span>

                    <span>
                      <kbd>Esc</kbd>
                      Close
                    </span>
                  </div>
                )}

            </div>
          )}

        </div>


        {/* =================================================
            THEME
        ================================================= */}

        <button
          type="button"
          className="header-icon-button theme-button"
          onClick={handleThemeToggle}
          aria-label={
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


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div
          className="header-dropdown-wrapper notification-hover-wrapper"
          ref={notificationRef}
        >

          <button
            type="button"
            className={`header-icon-button notification-button ${
              notificationsOpen
                ? "active"
                : ""
            }`}
            onClick={() => {
              setNotificationsOpen(
                (current) => !current
              );

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

          <div className="notification-tooltip">
            {unreadNotifications > 0
              ? `You have ${unreadNotifications} unread notifications`
              : "No new notifications"}
          </div>


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
                  onClick={() =>
                    navigate("/risks")
                  }
                >
                  <div className="notification-dot critical" />

                  <div>
                    <strong>
                      High-risk transaction detected
                    </strong>

                    <span>
                      A transaction requires immediate
                      review.
                    </span>

                    <small>
                      5 minutes ago
                    </small>
                  </div>
                </button>


                <button
                  type="button"
                  className="notification-item unread"
                  onClick={() =>
                    navigate("/alerts")
                  }
                >
                  <div className="notification-dot warning" />

                  <div>
                    <strong>
                      Multiple login failures
                    </strong>

                    <span>
                      Unusual authentication activity
                      detected.
                    </span>

                    <small>
                      18 minutes ago
                    </small>
                  </div>
                </button>


                <button
                  type="button"
                  className="notification-item unread"
                  onClick={() =>
                    navigate("/policies")
                  }
                >
                  <div className="notification-dot info" />

                  <div>
                    <strong>
                      Policy review approaching
                    </strong>

                    <span>
                      A compliance policy is due for
                      review.
                    </span>

                    <small>
                      1 hour ago
                    </small>
                  </div>
                </button>

              </div>

              <button
                type="button"
                className="dropdown-footer-button"
                onClick={() =>
                  navigate("/alerts")
                }
              >
                View all alerts
              </button>

            </div>
          )}

        </div>


        {/* =================================================
            PROFILE
        ================================================= */}

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
              setProfileOpen(
                (current) => !current
              );

              setNotificationsOpen(false);
            }}
          >

            <span className="profile-avatar">
              A
            </span>

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
                  A
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
                onClick={() =>
                  navigate("/profile")
                }
              >
                <User size={17} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className="profile-menu-item"
                onClick={() =>
                  navigate("/settings")
                }
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