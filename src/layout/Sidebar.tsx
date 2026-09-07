import { NavLink } from "react-router-dom";
import { OverviewIcon, RisksIcon, SalesIcon } from "./navIcons";
import { useSalesStats } from "../data/useSalesStats";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: OverviewIcon, end: true },
  { to: "/sales", label: "Sales reports", icon: SalesIcon, end: false },
  { to: "/risks", label: "Flagged risks", icon: RisksIcon, end: false },
];

export default function Sidebar() {
  const { openRisks } = useSalesStats();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">CD</span>
        <span className="sidebar-brand-name">Compliance Dashboard</span>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
          >
            <Icon className="sidebar-link-icon" />
            <span className="sidebar-link-label">{label}</span>
            {label === "Flagged risks" && openRisks.length > 0 && (
              <span className="sidebar-badge">{openRisks.length}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
