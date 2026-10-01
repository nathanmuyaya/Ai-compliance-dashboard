import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {X} from "lucide-react";

import {
  OverviewIcon,
  RisksIcon,
  SalesIcon,
  AlertsIcon,
  RecordsIcon,
  PoliciesIcon,
  UsersIcon,
  SettingsIcon,
} from "./navIcons";

import { useSalesStats } from "../data/useSalesStats";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  {
    to: "/",
    label: "Overview",
    icon: OverviewIcon,
    end: true,
  },
  {
    to: "/Sales",
    label: "Sales",
    icon: SalesIcon,
    end: false,
  },
  {
    to: "/reports",
    label: "Compliance Reports",
    icon: SalesIcon,
    end: false,
  },
  {
    to: "/risks",
    label: "Flagged Risks",
    icon: RisksIcon,
    end: false,
  },
  {
    to: "/alerts",
    label: "Alerts",
    icon: AlertsIcon,
    end: false,
  },
  {
    to: "/Records",
    label: "Records",
    icon: RecordsIcon,
    end: false,
  },
  {
    to: "/policies",
    label: "Policies",
    icon: PoliciesIcon,
    end: false,
  },
  {
    to: "/users",
    label: "Users & Roles",
    icon: UsersIcon,
    end: false,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: SettingsIcon,
    end: false,
  },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const { openRisks } = useSalesStats();

  // =========================================
  // MOBILE NAVIGATION
  // =========================================

  const handleNavigation = () => {
    if (window.innerWidth <= 800 && !collapsed) {
      onToggle();
    }
  };

  // =========================================
  // DESKTOP HOVER BEHAVIOR
  // =========================================

  const handleMouseEnter = () => {
    if (window.innerWidth > 800 && collapsed) {
      onToggle();
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 800 && !collapsed) {
      onToggle();
    }
  };

  return (
    <>
      {/* =========================================
          MOBILE BACKDROP
      ========================================== */}

      <div
        className={`sidebar-backdrop ${
          !collapsed ? "visible" : ""
        }`}
        onClick={onToggle}
        aria-hidden="true"
      />

      {/* =========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`sidebar ${
          collapsed ? "collapsed" : "open"
        }`}
        aria-label="Main navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* =====================================
            BRAND
        ====================================== */}

        <div className="sidebar-brand">
          <div
            className="sidebar-brand-mark"
            aria-label="Compliance Dashboard"
          >
            <span className="logo-c">C</span>
            <span className="logo-d">D</span>
          </div>

          <div className="sidebar-brand-text">
            <strong>Compliance</strong>
            <span>Business Intelligence</span>
          </div>
        </div>

        
        {/* =====================================
            MOBILE CLOSE BUTTON
        ====================================== */}

        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={onToggle}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

        {/* =====================================
            NAVIGATION
        ====================================== */}

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">
            <span>MAIN MENU</span>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={handleNavigation}
              >
                <span className="sidebar-link-icon">
                  <Icon />
                </span>

                <span className="sidebar-link-label">
                  {item.label}
                </span>

                {item.to === "/risks" &&
                  openRisks.length > 0 && (
                    <span className="sidebar-badge danger">
                      {openRisks.length}
                    </span>
                  )}

                {item.to === "/alerts" && (
                  <span className="sidebar-badge">
                    3
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* =====================================
            SYSTEM STATUS
        ====================================== */}

        <div className="sidebar-status">
          <div className="sidebar-status-indicator" />

          <div className="sidebar-status-text">
            <strong>System Healthy</strong>

            <span>
              All services operational
            </span>
          </div>
        </div>

        {/* =====================================
            FOOTER
        ====================================== */}

        <div className="sidebar-footer">
          <span>Compliance Dashboard</span>
          <span>v1.0.0</span>
        </div>
      </aside>
    </>
  );
}