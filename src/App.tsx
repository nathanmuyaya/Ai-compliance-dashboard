import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import OverviewPage from "./pages/OverviewPage";
import SalesPage from "./pages/SalesPage";
import RisksPage from "./pages/RisksPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="risks" element={<RisksPage />} />
      </Route>
    </Routes>
  );
}
