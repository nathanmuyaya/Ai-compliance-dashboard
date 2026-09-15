import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div
      className={`shell ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <Sidebar collapsed={sidebarCollapsed} />

      <main className="main">
        <Header onMenuClick={toggleSidebar} />

        <div className="app-shell">
          <Outlet />
        </div>
      </main>
    </div>
  );
}