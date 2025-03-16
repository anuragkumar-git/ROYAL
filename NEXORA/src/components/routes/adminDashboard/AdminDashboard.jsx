// AdminDashboard.jsx
// import React from 'react';
// import DashboardOverview from './DashboardOverview';
// import { Container } from 'react-bootstrap';

// const AdminDashboard = () => {
//   return (
//     <Container fluid>
//       <h1 className="my-3">Admin Dashboard</h1>
//       <DashboardOverview />
//     </Container>
//   );
// };

// export default AdminDashboard;
// AdminDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardOverview from './DashboardOverview';
import UserManagement from './UserManagement';
import AdManagement from './AdManagement';
import DealReview from './DealReview';
import DealManagement from './DealManagement';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* <AdminSidebar /> */}
      <div className="admin-content">
        <Routes>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/ads" element={<AdManagement />} />
          <Route path="/deals" element={<DealReview />} />
          <Route path="/dealmanegment" element={<DealManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
