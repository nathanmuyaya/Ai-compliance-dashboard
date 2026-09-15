import { NavLink } from "react-router-dom";
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

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: OverviewIcon, end: true },
  {
    to: "/reports",
    label: "Compliance Reports",
    icon: SalesIcon,
    end: false,
  },
  {
    to: "/risks",
    label: "Flagged risks",
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
    label: "Users",
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

type SidebarProps = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: SidebarProps) {
  const { openRisks } = useSalesStats();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">CD</span>

        {!collapsed && (
          <span className="sidebar-brand-name">
            Compliance Dashboard
          </span>
        )}
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "sidebar-link-active" : ""
              }`
            }
          >
            <Icon className="sidebar-link-icon" />

            {!collapsed && (
              <span className="sidebar-link-label">
                {label}
              </span>
            )}

            {!collapsed &&
              label === "Flagged risks" &&
              openRisks.length > 0 && (
                <span className="sidebar-badge">
                  {openRisks.length}
                </span>
              )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}