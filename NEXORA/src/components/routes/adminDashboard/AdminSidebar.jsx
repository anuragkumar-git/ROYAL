// AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaUsers, FaBullhorn, FaTags } from 'react-icons/fa';
import '../../../assets/css/AdminSidebar.css'; // Custom Sidebar Styling

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Tukku Admin</h2>
      <ul className="nav-links">
        <li>
          <Link to="/admin/dashboard">
            <FaChartPie /> Dashboard Overview
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <FaUsers /> User Management
          </Link>
        </li>
        <li>
          <Link to="/admin/ads">
            <FaBullhorn /> Advertisement Management
          </Link>
        </li>
        <li>
          <Link to="/admin/deals">
            <FaTags /> Deal Review
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
