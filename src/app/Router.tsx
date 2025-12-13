
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home/Home";
import Daily from "@/pages/Daily/Daily";
import AppList from "@/pages/Apps/AppList";
import AppDetails from "@/pages/Apps/AppDetails";

const Router = () => {
  return (
    <div>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Page Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/apps" element={<AppList />} />
        <Route path="/apps/:appId" element={<AppDetails />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};

export default Router;
