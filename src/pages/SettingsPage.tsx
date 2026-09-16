import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import "./SettingsPage.css";

export default function SettingsPage() {
 const { darkMode, setDarkMode } = useOutletContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}>();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoReports, setAutoReports] = useState(false);

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your dashboard preferences and system settings.</p>
        </div>
      </div>

      {/* Appearance */}
      <section className="settings-section">
        <div className="settings-section-header">
          <div>
            <h2>Appearance</h2>
            <p>Customize how the dashboard looks.</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-row">
            <div>
              <strong>Dark Mode</strong>
              <span>Use a darker interface for comfortable viewing.</span>
            </div>

            <button
              className={`toggle ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              <span />
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="settings-section">
        <div className="settings-section-header">
          <div>
            <h2>Notifications</h2>
            <p>Control how you receive alerts and updates.</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-row">
            <div>
              <strong>Push Notifications</strong>
              <span>Receive alerts about important dashboard events.</span>
            </div>

            <button
              className={`toggle ${notifications ? "active" : ""}`}
              onClick={() => setNotifications(!notifications)}
              aria-label="Toggle push notifications"
            >
              <span />
            </button>
          </div>

          <div className="settings-divider" />

          <div className="settings-row">
            <div>
              <strong>Email Alerts</strong>
              <span>Receive important compliance alerts by email.</span>
            </div>

            <button
              className={`toggle ${emailAlerts ? "active" : ""}`}
              onClick={() => setEmailAlerts(!emailAlerts)}
              aria-label="Toggle email alerts"
            >
              <span />
            </button>
          </div>

          <div className="settings-divider" />

          <div className="settings-row">
            <div>
              <strong>Automatic Reports</strong>
              <span>Generate compliance reports automatically.</span>
            </div>

            <button
              className={`toggle ${autoReports ? "active" : ""}`}
              onClick={() => setAutoReports(!autoReports)}
              aria-label="Toggle automatic reports"
            >
              <span />
            </button>
          </div>
        </div>
      </section>

      {/* System Preferences */}
      <section className="settings-section">
        <div className="settings-section-header">
          <div>
            <h2>System Preferences</h2>
            <p>Configure general dashboard behaviour.</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-field">
            <label>Default Dashboard View</label>

            <select defaultValue="overview">
              <option value="overview">Overview</option>
              <option value="risks">Risks</option>
              <option value="reports">Reports</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Report Frequency</label>

            <select defaultValue="monthly">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Language</label>

            <select defaultValue="english">
              <option value="english">English</option>
            </select>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="settings-section">
        <div className="settings-section-header">
          <div>
            <h2>Security</h2>
            <p>Manage account and security preferences.</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-row">
            <div>
              <strong>Two-Factor Authentication</strong>
              <span>Add an additional layer of account security.</span>
            </div>

            <button className="settings-action-button">
              Configure
            </button>
          </div>

          <div className="settings-divider" />

          <div className="settings-row">
            <div>
              <strong>Change Password</strong>
              <span>Update your account password.</span>
            </div>

            <button className="settings-action-button">
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="settings-footer">
        <button className="settings-save-button">
          Save Changes
        </button>
      </div>
    </div>
  );
}