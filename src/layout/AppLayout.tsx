import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import "./AppLayout.css";

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => !current);
  };

  return (
    <div className={`shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      <div className="main">
        <Header
          onMenuClick={toggleSidebar}
          darkMode={darkMode}
          onDarkModeToggle={() =>
            setDarkMode((current) => !current)
          }
        />

        <div className="app-shell">
          <Outlet context={{ darkMode, setDarkMode }} />
        </div>
      </div>

      <div className="brightness-overlay" aria-hidden="true" />
    </div>
  );
}