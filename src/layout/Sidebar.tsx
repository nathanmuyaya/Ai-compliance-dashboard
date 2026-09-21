import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  OverviewIcon,
  RisksIcon,
  SalesIcon,
  AlertsIcon,
  AuditsIcon,
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
    to: "/audits",
    label: "Audits",
    icon: AuditsIcon,
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

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop ${
          collapsed ? "" : "visible"
        }`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${
          collapsed ? "collapsed" : ""
        }`}
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            CB
          </div>

          <div className="sidebar-brand-text">
            <strong>Compliance</strong>
            <span>Business Intelligence</span>
          </div>
        </div>

        {/* =====================================
            COLLAPSE / CLOSE BUTTON
        ====================================== */}
        <button
  type="button"
  className="sidebar-collapse-button"
  onClick={onToggle}
  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
  title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
>
  {collapsed ? (
    <ChevronRight size={18} />
  ) : (
    <ChevronLeft size={18} />
  )}
</button>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-title">
            
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
                onClick={() => {
                  if (window.innerWidth <= 800) {
                    onToggle();
                  }
                }}
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

        {/* System status */}
        <div className="sidebar-status">
          <div className="sidebar-status-indicator" />

          <div className="sidebar-status-text">
            <strong>System Healthy</strong>
            <span>
              All services operational
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <span>Compliance Dashboard</span>
          <span>v1.0.0</span>
        </div>
      </aside>
    </>
  );
}