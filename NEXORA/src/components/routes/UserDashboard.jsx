// src/components/Dashboard.js
import React, { useState } from 'react';
import '../../assets/css/UserDashboard.css';
import { FaUser, FaHeart, FaCog, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  // Simulated user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAACUCAMAAADmiEg1AAAAMFBMVEXk5ueutLfg4uSnrrHn6eqqsbSxt7rS1dfW2dva3d7Hy82/xMa7wMPKztDq7O3CxskpgEGPAAAETElEQVR4nO2c25KkIAxAuQQExOb//3bRvk1v28olEqzyPM1O1VadoWKIkMjYxcXFxcXFxcXFxcUFHQDUBlkAE8KayYUQ3DQZK8QJ/gAAMTivlVQPJNfeDZ2rw80ErZXiH8R/+9H0aw5gNP+JNn2KAzNa/tbmXGpD7bgCWK+2rOd4kcF2t+aT3tOezfXQmfi4L33H36hV/yBSFvu55ILa9oVNlV7QvQT5VvZbXfE+xG2e9iJO7RwRmdYL1NKR5CfyL57amo1F3jzQWsNUZB1jfCDVzn4m31B6s92a5PeCE26cMGwWgNtIuroWyq05YU6BqThKFshqwyrrGOE0FVZxDqRe8PJk8ljwkcIaTO1yc04SKJVP5bzgE4G28PXrrQkC3FbsOU9ke21Ws1e+vNtnFKjNJgtj8yIFMLS5bl9cIYQJJ8iEBse7dVFYW1M9af1g3gKOt2vtjbDrzIzn9FbNvctfiD+8/Tm9+eXd1Lt9nCDlk+beyRcj27TOJ+Bw9p2ptfdwzn3+rHXVaevYurPBJ+3fG6DwouEDFdq/75z0vZhZhPWmOIeoPh7k7XfLhfo3NUlxObXZ3JMIzQF49TkyzSXmac/toS5QaI7tWX1tRXYvVbfgJEnw7l1TFErK7pnyIoWiNHlT3FegNKH1/GiWrjdpH0cULzzfdLTahTlF0fcpMZbe8/jSprj/+8LmiistevDObVbqpe8xs4Wwk9VegIxQ8V0NDITExW5+obOHSetb727IAUSQO+ZKun5C+83OhINSvkdrtszB+K/hnae0HnvJfitEc+f5//GiJPfOdpVGvgAQZhi1ko9BLymlHgfb+ZzXGzFMk1vG6qhNMoCFW+T+E7XPHoujEMJaY4Y7xtiIYL3qx+UFYQcXRu+91vNQ4ML8o/Z+DG4wgt36ko/OdhpnQz67rqXB+ZfxD3BGxOCh9mXzFGDc4p2Xe3vl6w+IOXEQ9/9HJx1DY/rO1/vu87qTqQNb22RS3X2gGd69senXpp6ornUwjWN9rkQw7ouVbnmMAmLYnsjNQGpn20R6tPZlQb2OiubHiwNMviaq182DPfiQE+MyahV3aLBYjxXX/6P4cJQ5MMeRI+TD3B8T5kipb0NcTwcsORy62A9z9DdnyJg0rxFHbpAAi537foF7xFJ9M5wO4tQaJB7+IYljHTPjTI7kmOOIt9aO4ginn6K9Nsq3aSi068+bUbrtisyrsgqEo+qoQ8WxhnSKKL+aPazYTqP4KrxNTfKbws9GlbYMoFEW4lUfUcDxLutkIrbmZW2/WAMMVeR/Mwryvu10ECr/dpn6obyTW9MSp+4XKjeJ9xDdM5kRXvRRqiPIaxEnLUw+yWrFquw0xiSrHRXj2w9IqIxPGnQUJjznQ1dYw6w4pL+ydZNNFpL3zPJm3SNIH1UHR+36QfLBG9lL/DrpNQrSzDMSyWcpFR/nO4TEt4dYesuuSJ6dFp2xovgPOvI9e4LYmyIAAAAASUVORK5CYII=",
    savedDeals: [
      { id: 1, title: "30% Off on Coffee", expires: "March 25, 2025" },
      { id: 2, title: "Buy 1 Get 1 Pizza", expires: "April 10, 2025" },
    ],
    reviewHistory: [
      { id: 1, title: "Best coffee shop!", rating: 4.5, date: "Feb 20, 2025" },
      { id: 2, title: "Great service!", rating: 5, date: "March 5, 2025" },
    ],
    preferences: {
      notifications: true,
      locationTracking: true,
    },
  };

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mt-4 dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header text-center mb-4">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      <div className="row">
        {/* Sidebar Navigation */}
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item ${activeTab === 'profile' && 'active'}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser className="me-2" /> Profile
            </button>
            <button
              className={`list-group-item ${activeTab === 'savedDeals' && 'active'}`}
              onClick={() => setActiveTab("savedDeals")}
            >
              <FaHeart className="me-2" /> Saved Deals
            </button>
            <button
              className={`list-group-item ${activeTab === 'history' && 'active'}`}
              onClick={() => setActiveTab("history")}
            >
              <FaHistory className="me-2" /> Review History
            </button>
            <button
              className={`list-group-item ${activeTab === 'settings' && 'active'}`}
              onClick={() => setActiveTab("settings")}
            >
              <FaCog className="me-2" /> Settings
            </button>
            <button className="list-group-item text-danger">
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-9">
          {activeTab === "profile" && (
            <div>
              <h3>Profile Information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}

          {activeTab === "savedDeals" && (
            <div>
              <h3>Saved Deals</h3>
              {user.savedDeals.length > 0 ? (
                user.savedDeals.map((deal) => (
                  <div key={deal.id} className="deal-item card p-3 mb-3">
                    <h5>{deal.title}</h5>
                    <p><strong>Expires on:</strong> {deal.expires}</p>
                    <button className="btn btn-primary btn-sm">View Deal</button>
                  </div>
                ))
              ) : (
                <p>No saved deals found.</p>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h3>Review History</h3>
              {user.reviewHistory.map((review) => (
                <div key={review.id} className="review-item card p-3 mb-3">
                  <h5>{review.title}</h5>
                  <p><strong>Rating:</strong> {review.rating} ⭐</p>
                  <p><strong>Date:</strong> {review.date}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3>Settings</h3>
              <p>
                <strong>Notifications:</strong> {user.preferences.notifications ? "Enabled" : "Disabled"}
              </p>
              <p>
                <strong>Location Tracking:</strong> {user.preferences.locationTracking ? "Enabled" : "Disabled"}
              </p>
              <button className="btn btn-outline-secondary btn-sm">Update Preferences</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
