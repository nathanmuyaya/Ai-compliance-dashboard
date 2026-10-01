import {
  Camera,
  CheckCircle2,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import ProfileSkeleton from "../components/LoadingSkeleton/ProfileSkeleton.tsx";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <main className="profile-page">

      {/* PAGE HEADER */}
      <section className="profile-page-header">
        <div>
          <span className="profile-section-label">
            ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and account
            details.
          </p>
        </div>
      </section>

      {/* PROFILE OVERVIEW */}
      <section className="profile-overview-card">

        <div className="profile-cover" />

        <div className="profile-overview-content">

          <div className="profile-photo-wrapper">

            <div className="profile-photo">
              UA
            </div>

            <button
              className="profile-camera-button"
              type="button"
              aria-label="Change profile photo"
            >
              <Camera size={15} />
            </button>

          </div>

          <div className="profile-main-info">

            <div>
              <h2>UserAdmin</h2>

              <p>
                Compliance Officer
              </p>
            </div>

            <span className="profile-active-badge">
              <span />
              Active
            </span>

          </div>

        </div>

      </section>

      {/* MAIN GRID */}
      <section className="profile-content-grid">

        {/* PERSONAL INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-header">

            <div>
              <span className="profile-card-label">
                PERSONAL INFORMATION
              </span>

              <h2>Account Details</h2>
            </div>

            <div className="profile-card-icon">
              <User size={18} />
            </div>

          </div>

          <div className="profile-details">

            <div className="profile-detail-item">
              <span>Full Name</span>
              <strong>UserAdmin</strong>
            </div>

            <div className="profile-detail-item">
              <span>Email Address</span>
              <strong>admin@compliance.local</strong>
            </div>

            <div className="profile-detail-item">
              <span>Role</span>
              <strong>Compliance Officer</strong>
            </div>

            <div className="profile-detail-item">
              <span>Department</span>
              <strong>Compliance & Risk</strong>
            </div>

          </div>

        </div>

        {/* ACCOUNT SECURITY */}
        <div className="profile-card">

          <div className="profile-card-header">

            <div>
              <span className="profile-card-label">
                SECURITY
              </span>

              <h2>Account Security</h2>
            </div>

            <div className="profile-card-icon">
              <ShieldCheck size={18} />
            </div>

          </div>

          <div className="security-list">

            <div className="security-item">

              <div className="security-icon success">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <strong>
                  Account Verified
                </strong>

                <span>
                  Your account has been verified.
                </span>
              </div>

              <span className="security-status">
                Verified
              </span>

            </div>

            <div className="security-item">

              <div className="security-icon">
                <ShieldCheck size={17} />
              </div>

              <div>
                <strong>
                  Two-Factor Authentication
                </strong>

                <span>
                  Additional account protection.
                </span>
              </div>

              <span className="security-status enabled">
                Enabled
              </span>

            </div>

            <div className="security-item">

              <div className="security-icon">
                <Mail size={17} />
              </div>

              <div>
                <strong>
                  Email Security
                </strong>

                <span>
                  Security notifications are enabled.
                </span>
              </div>

              <span className="security-status enabled">
                Active
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* ACCOUNT ACTIVITY */}
      <section className="profile-card activity-card">

        <div className="profile-card-header">

          <div>
            <span className="profile-card-label">
              ACCOUNT ACTIVITY
            </span>

            <h2>Recent Activity</h2>
          </div>

          <div className="profile-card-icon">
            <CheckCircle2 size={18} />
          </div>

        </div>

        <div className="activity-list">

          <div className="activity-item">

            <div className="activity-dot" />

            <div className="activity-content">

              <strong>
                Signed in to dashboard
              </strong>

              <span>
                Today at 09:42
              </span>

            </div>

            <span className="activity-device">
              Desktop
            </span>

          </div>

          <div className="activity-item">

            <div className="activity-dot" />

            <div className="activity-content">

              <strong>
                Updated dashboard settings
              </strong>

              <span>
                Yesterday at 16:28
              </span>

            </div>

            <span className="activity-device">
              Desktop
            </span>

          </div>

          <div className="activity-item">

            <div className="activity-dot" />

            <div className="activity-content">

              <strong>
                Reviewed compliance alerts
              </strong>

              <span>
                18 Sep 2026 at 14:10
              </span>

            </div>

            <span className="activity-device">
              Desktop
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}