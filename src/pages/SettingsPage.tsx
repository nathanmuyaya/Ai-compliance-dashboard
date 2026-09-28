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

import "./SettingsPage.css";


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


  /* --------------------------------
     OTHER SETTINGS
  -------------------------------- */

  const [notifications, setNotifications] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(true);

  const [autoSave, setAutoSave] =
    useState(true);

  const [language, setLanguage] =
    useState("English");

  const [timeZone, setTimeZone] =
    useState("Africa/Lusaka");

  const [saved, setSaved] =
    useState(false);


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
      setNotifications(
        savedNotifications === "true"
      );
    }

    if (savedTwoFactor !== null) {
      setTwoFactor(
        savedTwoFactor === "true"
      );
    }

    if (savedAutoSave !== null) {
      setAutoSave(
        savedAutoSave === "true"
      );
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
     DARK MODE
  ========================================================= */

  const handleDarkMode = () => {

    setDarkMode(
      (current) => !current
    );

  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <main className="settings-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="settings-header">

        <div>

          <span className="settings-eyebrow">
            SYSTEM CONFIGURATION
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Configure your dashboard preferences,
            security and system behavior.
          </p>

        </div>


        <button
          className="settings-save-button"
          onClick={saveSettings}
        >

          {saved ? (
            <>
              <Check size={17} />
              Saved
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}

        </button>

      </header>


      {/* =====================================================
          APPEARANCE
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">

            {darkMode ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}

          </div>


          <div>

            <span className="settings-section-label">
              APPEARANCE
            </span>

            <h2>
              Theme
            </h2>

            <p>
              Customize how the dashboard looks.
            </p>

          </div>

        </div>


        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-title">

              {darkMode ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}

              <span>
                Dark Mode
              </span>

            </div>

            <p>
              Use a darker interface for
              low-light environments.
            </p>

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


      {/* =====================================================
          BRIGHTNESS
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            <Sun size={20} />
          </div>


          <div>

            <span className="settings-section-label">
              DISPLAY
            </span>

            <h2>
              Brightness
            </h2>

            <p>
              Adjust the brightness of the
              entire dashboard interface.
            </p>

          </div>

        </div>


        <div className="brightness-setting">


          {/* BRIGHTNESS HEADER */}

          <div className="brightness-top">

            <div className="brightness-title">

              <Sun
                size={18}
                className="brightness-icon-low"
              />

              <span>
                Dashboard Brightness
              </span>

            </div>


            <strong>
              {brightness}%
            </strong>

          </div>


          {/* SLIDER */}

          <div className="brightness-slider-wrapper">

            <span className="brightness-min">
              20%
            </span>


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


            <span className="brightness-max">
              100%
            </span>

          </div>


          {/* PREVIEW */}

          <div className="brightness-preview">

            <div
              className="brightness-preview-content"
              style={{
                opacity:
                  0.35 +
                  brightness / 150,
              }}
            >

              <div className="brightness-preview-icon">

                <Sun size={18} />

              </div>


              <div>

                <strong>
                  Brightness Preview
                </strong>

                <span>
                  Move the slider to adjust
                  the entire dashboard.
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          NOTIFICATIONS
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            <Bell size={20} />
          </div>


          <div>

            <span className="settings-section-label">
              NOTIFICATIONS
            </span>

            <h2>
              Notifications
            </h2>

            <p>
              Control compliance and system
              alerts.
            </p>

          </div>

        </div>


        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-title">

              <Bell size={18} />

              <span>
                Compliance Notifications
              </span>

            </div>

            <p>
              Receive alerts about risks,
              compliance issues and important
              system events.
            </p>

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


      {/* =====================================================
          SECURITY
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            <ShieldCheck size={20} />
          </div>


          <div>

            <span className="settings-section-label">
              SECURITY
            </span>

            <h2>
              Security & Protection
            </h2>

            <p>
              Manage account security and
              data protection settings.
            </p>

          </div>

        </div>


        {/* TWO FACTOR */}

        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-title">

              <Lock size={18} />

              <span>
                Two-Factor Authentication
              </span>

            </div>

            <p>
              Add an additional layer of
              protection to your account.
            </p>

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


        {/* AUTO SAVE */}

        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-title">

              <Save size={18} />

              <span>
                Auto Save
              </span>

            </div>

            <p>
              Automatically save dashboard
              configuration changes.
            </p>

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


      {/* =====================================================
          REGIONAL SETTINGS
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            <Globe size={20} />
          </div>


          <div>

            <span className="settings-section-label">
              REGIONAL
            </span>

            <h2>
              Language & Region
            </h2>

            <p>
              Configure your language and
              regional preferences.
            </p>

          </div>

        </div>


        <div className="settings-select-grid">


          {/* LANGUAGE */}

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


          {/* TIME ZONE */}

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


      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <section className="settings-card settings-system-card">

        <div className="settings-system-info">

          <div className="system-status-dot" />

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


        <span className="system-version">
          v1.0.0
        </span>

      </section>

    </main>
  );
}