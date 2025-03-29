import React from "react";
import AddDeal from "./AddDeal";
import { Route, Routes } from "react-router-dom";
import BusinessDashboard from "./BusinessDashboard";

export const DashboardOverview = () => {
  return (
    <div className="admin-dashboard">
      {/* <AdminSidebar /> */}
      <div className="admin-content">
        <Routes>
          <Route path="/adddeal" element={<AddDeal />} />
          <Route path="/dashboard" element={<BusinessDashboard />} />
          {/* <Route path="/users" element={<UserManagement />} />
          <Route path="/ads" element={<AdManagement />} />
          <Route path="/deals" element={<DealReview />} />
          <Route path="/dealmanegment" element={<DealManagement />} />  */}
        </Routes>
      </div>
    </div>
  );
};
