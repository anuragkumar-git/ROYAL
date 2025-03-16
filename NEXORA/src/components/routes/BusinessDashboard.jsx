// src/components/BusinessDashboard.js

import React from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChartBar,
  FaAd,
  FaCog,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../assets/css/BusinessDashboard.css";
import { Link } from "react-router-dom";

const BusinessDashboard = () => {
  // Dummy Data (Replace with API calls later)
  //   const business = {
  //     name: "Pizza Palace",
  //     activeDeals: 3,
  //     pendingDeals: 1,
  //     featuredAds: 2,
  //     locationAnalytics: {
  //       views: 1200,
  //       interactions: 300,
  //       nearbySearches: 450,
  //     },
  //     deals: [
  //       { id: 1, title: "Buy 1 Get 1 Free", status: "Active" },
  //       { id: 2, title: "Flat 30% OFF", status: "Pending Approval" },
  //       { id: 3, title: "Weekend Special 20% OFF", status: "Active" },
  //     ],
  //   };

  // Dummy Data (replace with API calls)
  const business = {
    name: "Pizza Palace",
    activeDeals: 3,
    pendingDeals: 1,
    mapHighlightAds: 1,
    flashDeals: 3,
    featuredAds: 2,
    locationAnalytics: {
      views: 1200,
      interactions: 300,
      nearbySearches: 450,
    },
    deals: [
      { id: 1, title: "Buy 1 Get 1 Free", status: "Active" },
      { id: 2, title: "Flat 30% OFF", status: "Pending Approval" },
      { id: 3, title: "Weekend Special 20% OFF", status: "Active" },
    ],
  };

  // Pie Chart Data (Advertisement Insights)
  const adData = [
    { name: "Featured Deals", value: business.featuredAds },
    { name: "Map Highlights", value: business.mapHighlightAds },
    { name: "Flash Deals", value: business.flashDeals },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  // Bar Chart Data (Location Analytics)
  const locationData = [
    { name: "Views", value: business.locationAnalytics.views },
    { name: "Interactions", value: business.locationAnalytics.interactions },
    {
      name: "Nearby Searches",
      value: business.locationAnalytics.nearbySearches,
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {business.name}</h2>

      {/* Dashboard Overview */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5>Active Deals</h5>
            <p>{business.activeDeals}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5>Pending Approval</h5>
            <p>{business.pendingDeals}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5>Featured Ads</h5>
            <p>{business.featuredAds}</p>
          </div>
        </div>
      </div>

      {/* Manage Deals */}
      <div className="mt-5">
        <h4>Manage Your Deals</h4>
        <Link to={'/adddeal'}>
        <button className="btn btn-primary mb-3">
          <FaPlus /> Add New Deal
        </button>
        </Link>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {business.deals.map((deal) => (
                <tr key={deal.id}>
                  <td>{deal.id}</td>
                  <td>{deal.title}</td>
                  <td>
                    <span
                      className={`badge ${
                        deal.status === "Active" ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {deal.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary me-2">
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-outline-danger">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advertisements Section */}
      {/* <div className="mt-5">
        <h4>
          <FaAd /> Advertisement Insights
        </h4>
        </div> */}
      <h4 className="mt-4">📊 Advertisement Insights</h4>
      <ResponsiveContainer width="50%" height={300}>
        <p>Featured Deals: {business.featuredAds}</p>
        <PieChart>
          <Pie
            data={adData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {adData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Location Analytics */}
      {/* <div className="mt-5">
        <h4>
          <FaChartBar /> Location Analytics
        </h4>
        <p>Views: {business.locationAnalytics.views}</p>
        <p>Interactions: {business.locationAnalytics.interactions}</p>
        <p>Nearby Searches: {business.locationAnalytics.nearbySearches}</p>
      </div> */}
      <h4 className="mt-5">📍 Location Analytics</h4>
      <div>
        <p>Views: {business.locationAnalytics.views}</p>
        <p>Interactions: {business.locationAnalytics.interactions}</p>
        <p>Nearby Searches: {business.locationAnalytics.nearbySearches}</p>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart data={locationData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1f1c2c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Settings */}
      <div className="mt-5">
        <h4>
          <FaCog /> Business Settings
        </h4>
        <button className="btn btn-outline-secondary">
          Edit Business Info
        </button>
      </div>
    </div>
  );
};

export default BusinessDashboard;
