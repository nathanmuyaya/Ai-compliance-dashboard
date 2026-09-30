import "./SettingsPage.css";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  Bell,
  Check,
  Globe,
  Lock,
  Moon,
  Save,
  ShieldCheck,
  Sun,
} from "lucide-react";

import { useOutletContext } from "react-router-dom";


/* =========================================================
   CONTEXT TYPE
========================================================= */

type SettingsContext = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;

  brightness: number;
  setBrightness: Dispatch<SetStateAction<number>>;
};


/* =========================================================
   SETTINGS PAGE
========================================================= */

export default function SettingsPage() {

  const {
    darkMode,
    setDarkMode,
    brightness,
    setBrightness,
  } = useOutletContext<SettingsContext>();


  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const [language, setLanguage] = useState("English");
  const [timeZone, setTimeZone] = useState("Africa/Lusaka");

  const [saved, setSaved] = useState(false);


  /* =========================================================
     LOAD SETTINGS
  ========================================================= */

  useEffect(() => {

    const savedNotifications =
      localStorage.getItem("notifications");

    const savedTwoFactor =
      localStorage.getItem("twoFactor");

    const savedAutoSave =
      localStorage.getItem("autoSave");

    const savedLanguage =
      localStorage.getItem("language");

    const savedTimeZone =
      localStorage.getItem("timeZone");


    if (savedNotifications !== null) {
      setNotifications(savedNotifications === "true");
    }

    if (savedTwoFactor !== null) {
      setTwoFactor(savedTwoFactor === "true");
    }

    if (savedAutoSave !== null) {
      setAutoSave(savedAutoSave === "true");
    }

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    if (savedTimeZone) {
      setTimeZone(savedTimeZone);
    }

  }, []);


  /* =========================================================
     SAVE SETTINGS
  ========================================================= */

  const saveSettings = () => {

    localStorage.setItem(
      "notifications",
      String(notifications)
    );

    localStorage.setItem(
      "twoFactor",
      String(twoFactor)
    );

    localStorage.setItem(
      "autoSave",
      String(autoSave)
    );

    localStorage.setItem(
      "language",
      language
    );

    localStorage.setItem(
      "timeZone",
      timeZone
    );

    localStorage.setItem(
      "brightness",
      String(brightness)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  /* =========================================================
     TOGGLE
  ========================================================= */

  const handleDarkMode = () => {
    setDarkMode((current) => !current);
  };


  return (

    <main className="settings-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="settings-hero">

        <div className="settings-hero-content">

          <div className="settings-hero-icon">
            <ShieldCheck size={25} />
          </div>

          <div>

            <span className="settings-eyebrow">
              SYSTEM CONFIGURATION
            </span>

            <h1>
              Settings
            </h1>

            <p>
              Manage your dashboard appearance,
              security, notifications and regional
              preferences.
            </p>

          </div>

        </div>


        <button
          className={`settings-save-button ${
            saved ? "saved" : ""
          }`}
          onClick={saveSettings}
        >

          {saved ? (
            <>
              <Check size={17} />
              Changes Saved
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}

        </button>

      </section>


      {/* =====================================================
          QUICK STATUS
      ===================================================== */}

      <section className="settings-overview">

        <div className="settings-overview-item">

          <div className="overview-icon">
            {darkMode ? (
              <Moon size={17} />
            ) : (
              <Sun size={17} />
            )}
          </div>

          <div>
            <span>THEME</span>
            <strong>
              {darkMode ? "Dark Mode" : "Light Mode"}
            </strong>
          </div>

        </div>


        <div className="settings-overview-divider" />


        <div className="settings-overview-item">

          <div className="overview-icon">
            <Bell size={17} />
          </div>

          <div>
            <span>NOTIFICATIONS</span>
            <strong>
              {notifications ? "Enabled" : "Disabled"}
            </strong>
          </div>

        </div>


        <div className="settings-overview-divider" />


        <div className="settings-overview-item">

          <div className="overview-icon">
            <Lock size={17} />
          </div>

          <div>
            <span>SECURITY</span>
            <strong>
              {twoFactor ? "Protected" : "Standard"}
            </strong>
          </div>

        </div>


        <div className="settings-overview-divider" />


        <div className="settings-overview-item">

          <div className="overview-icon">
            <Globe size={17} />
          </div>

          <div>
            <span>REGION</span>
            <strong>
              {timeZone}
            </strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN SETTINGS GRID
      ===================================================== */}

      <div className="settings-grid">


        {/* ===================================================
            APPEARANCE
        =================================================== */}

        <section className="settings-panel appearance-panel">

          <div className="settings-panel-header">

            <div className="panel-icon">
              {darkMode ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}
            </div>

            <div>

              <span>
                APPEARANCE
              </span>

              <h2>
                Interface Theme
              </h2>

            </div>

          </div>


          <div className="theme-preview">

            <div className="theme-preview-top">
              <div />
              <div />
              <div />
            </div>

            <div className="theme-preview-body">

              <div className="theme-preview-sidebar" />

              <div className="theme-preview-content">

                <div />
                <div />
                <div />

              </div>

            </div>

            <div className="theme-preview-label">

              <span>
                {darkMode ? "Dark interface" : "Light interface"}
              </span>

              <span className="theme-live">
                ACTIVE
              </span>

            </div>

          </div>


          <div className="setting-control-row">

            <div className="setting-control-info">

              <div className="control-icon">
                {darkMode ? (
                  <Moon size={17} />
                ) : (
                  <Sun size={17} />
                )}
              </div>

              <div>

                <strong>
                  Dark Mode
                </strong>

                <span>
                  Use a darker interface for
                  low-light environments.
                </span>

              </div>

            </div>


            <button
              type="button"
              className={`toggle ${
                darkMode ? "active" : ""
              }`}
              onClick={handleDarkMode}
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
            >
              <span />
            </button>

          </div>

        </section>


        {/* ===================================================
            BRIGHTNESS
        =================================================== */}

        <section className="settings-panel brightness-panel">

          <div className="settings-panel-header">

            <div className="panel-icon">
              <Sun size={19} />
            </div>

            <div>

              <span>
                DISPLAY
              </span>

              <h2>
                Brightness
              </h2>

            </div>

          </div>


          <div className="brightness-value">

            <strong>
              {brightness}%
            </strong>

            <span>
              Dashboard brightness
            </span>

          </div>


          <div className="brightness-slider-wrapper">

            <span>20%</span>

            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={brightness}
              onChange={(event) =>
                setBrightness(
                  Number(event.target.value)
                )
              }
              className="brightness-slider"
              aria-label="Dashboard brightness"
            />

            <span>100%</span>

          </div>


          <div
            className="brightness-preview"
            style={{
              opacity: 0.45 + brightness / 180,
            }}
          >

            <Sun size={22} />

            <div>

              <strong>
                Brightness Preview
              </strong>

              <span>
                Interface visibility preview
              </span>

            </div>

          </div>

        </section>


        {/* ===================================================
            NOTIFICATIONS
        =================================================== */}

        <section className="settings-panel">

          <div className="settings-panel-header">

            <div className="panel-icon">
              <Bell size={19} />
            </div>

            <div>

              <span>
                ALERTS
              </span>

              <h2>
                Notifications
              </h2>

            </div>

          </div>


          <div className="setting-control-row">

            <div className="setting-control-info">

              <div className="control-icon">
                <Bell size={17} />
              </div>

              <div>

                <strong>
                  Compliance Notifications
                </strong>

                <span>
                  Receive alerts about risks,
                  compliance issues and system events.
                </span>

              </div>

            </div>


            <button
              type="button"
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications(
                  (current) => !current
                )
              }
              aria-label="Toggle notifications"
              aria-pressed={notifications}
            >
              <span />
            </button>

          </div>

        </section>


        {/* ===================================================
            SECURITY
        =================================================== */}

        <section className="settings-panel security-panel">

          <div className="settings-panel-header">

            <div className="panel-icon security-icon">
              <ShieldCheck size={19} />
            </div>

            <div>

              <span>
                PROTECTION
              </span>

              <h2>
                Security
              </h2>

            </div>

            <div className="security-badge">
              {twoFactor ? "SECURE" : "STANDARD"}
            </div>

          </div>


          <div className="setting-control-row">

            <div className="setting-control-info">

              <div className="control-icon">
                <Lock size={17} />
              </div>

              <div>

                <strong>
                  Two-Factor Authentication
                </strong>

                <span>
                  Add an additional layer of
                  protection to your account.
                </span>

              </div>

            </div>


            <button
              type="button"
              className={`toggle ${
                twoFactor ? "active" : ""
              }`}
              onClick={() =>
                setTwoFactor(
                  (current) => !current
                )
              }
              aria-label="Toggle two-factor authentication"
              aria-pressed={twoFactor}
            >
              <span />
            </button>

          </div>


          <div className="setting-control-row">

            <div className="setting-control-info">

              <div className="control-icon">
                <Save size={17} />
              </div>

              <div>

                <strong>
                  Auto Save
                </strong>

                <span>
                  Automatically save dashboard
                  configuration changes.
                </span>

              </div>

            </div>


            <button
              type="button"
              className={`toggle ${
                autoSave ? "active" : ""
              }`}
              onClick={() =>
                setAutoSave(
                  (current) => !current
                )
              }
              aria-label="Toggle auto save"
              aria-pressed={autoSave}
            >
              <span />
            </button>

          </div>

        </section>


        {/* ===================================================
            REGIONAL SETTINGS
        =================================================== */}

        <section className="settings-panel regional-panel">

          <div className="settings-panel-header">

            <div className="panel-icon">
              <Globe size={19} />
            </div>

            <div>

              <span>
                REGIONAL
              </span>

              <h2>
                Language & Region
              </h2>

            </div>

          </div>


          <div className="regional-fields">

            <div className="settings-field">

              <label htmlFor="language">
                Language
              </label>

              <select
                id="language"
                value={language}
                onChange={(event) =>
                  setLanguage(
                    event.target.value
                  )
                }
              >

                <option value="English">
                  English
                </option>

                <option value="French">
                  French
                </option>

                <option value="Portuguese">
                  Portuguese
                </option>

              </select>

            </div>


            <div className="settings-field">

              <label htmlFor="timeZone">
                Time Zone
              </label>

              <select
                id="timeZone"
                value={timeZone}
                onChange={(event) =>
                  setTimeZone(
                    event.target.value
                  )
                }
              >

                <option value="Africa/Lusaka">
                  Africa/Lusaka
                </option>

                <option value="Africa/Johannesburg">
                  Africa/Johannesburg
                </option>

                <option value="Africa/Nairobi">
                  Africa/Nairobi
                </option>

                <option value="UTC">
                  UTC
                </option>

              </select>

            </div>

          </div>

        </section>

      </div>


      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <section className="system-status-panel">

        <div className="system-status-left">

          <div className="system-status-indicator">
            <span />
          </div>

          <div>

            <strong>
              System Operational
            </strong>

            <span>
              All dashboard services are
              running normally.
            </span>

          </div>

        </div>


        <div className="system-version">
          <span>VERSION</span>
          <strong>v1.0.0</strong>
        </div>

      </section>

    </main>
  );
}