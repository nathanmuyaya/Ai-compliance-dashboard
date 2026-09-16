import "./SplashScreen.css";

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <span className="splash-logo-text">CD</span>
          <span className="splash-shield">✓</span>
        </div>

        <h1>
          Compliance
          <span>Dashboard</span>
        </h1>

        <p>Smarter Insights. Safer Decisions.</p>

        <div className="splash-loader">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}