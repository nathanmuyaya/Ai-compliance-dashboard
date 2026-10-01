import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

import "./AppLayout.css";

export default function AppLayout() {
  /* =========================================================
     SIDEBAR
  ========================================================= */

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => !current);
  };


  /* =========================================================
     DARK MODE
  ========================================================= */

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });


  /* =========================================================
     BRIGHTNESS
  ========================================================= */

  const [brightness, setBrightness] = useState(() => {
    const savedBrightness =
      localStorage.getItem("brightness");

    if (savedBrightness) {
      const value = Number(savedBrightness);

      if (!Number.isNaN(value)) {
        return Math.min(
          100,
          Math.max(20, value)
        );
      }
    }

    return 100;
  });


  /* =========================================================
     APPLY DARK MODE
  ========================================================= */

  useEffect(() => {
    document.documentElement.dataset.theme =
      darkMode ? "dark" : "light";

    localStorage.setItem(
      "darkMode",
      String(darkMode)
    );
  }, [darkMode]);


  /* =========================================================
     APPLY BRIGHTNESS
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "brightness",
      String(brightness)
    );

    document.documentElement.style.setProperty(
      "--dashboard-brightness",
      String(brightness / 100)
    );
  }, [brightness]);


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className={`shell ${
        sidebarCollapsed
          ? "sidebar-collapsed"
          : ""
      }`}
    >

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />


      <div className="main">

        <Header
          onMenuClick={toggleSidebar}
          darkMode={darkMode}
          onDarkModeToggle={() =>
            setDarkMode(
              (current) => !current
            )
          }
        />


        <div className="app-shell">

          <Outlet
            context={{
              darkMode,
              setDarkMode,
              brightness,
              setBrightness,
            }}
          />

        </div>

      </div>


      {/* =====================================================
          BRIGHTNESS OVERLAY
      ===================================================== */}

      <div
        className="brightness-overlay"
        aria-hidden="true"
      />

    </div>
  );
}