import { Route, Routes } from "react-router-dom";
import "./App.css";

import SplashScreen from "./components/SplashScreen";
import AppLayout from "./layout/AppLayout";
import ProfilePage from "./pages/ProfilePage";

import OverviewPage from "./pages/OverviewPage";
import RisksPage from "./pages/RisksPage";
import PoliciesPage from "./pages/PoliciesPage";
import AuditsPage from "./pages/AuditsPage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <>
      <SplashScreen />

      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<OverviewPage />} />

          <Route path="reports" element={<ReportsPage />} />

          <Route path="risks" element={<RisksPage />} />

          <Route path="policies" element={<PoliciesPage />} />

          <Route path="audits" element={<AuditsPage />} />

          <Route path="sales" element={<SalesPage />} />

          <Route path="alerts" element={<AlertsPage />} />

          <Route path="users" element={<UsersPage />} />

          <Route path="settings" element={<SettingsPage />} />

          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}