// src/components/DealDetailPage2.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { FaShareAlt, FaSave, FaFlag } from 'react-icons/fa';
import '../../assets/css/DealDetailPage2.css'; // Ensure you have this CSS file

const DealDetailPage2 = () => {
  const { id } = useParams(); // Fetching deal ID from URL

  // Dummy Data (Replace with API call later)
  const deal = {
    id: id,
    title: "Buy 1 Get 1 Free Pizza",
    description: "Enjoy a delicious pizza with our special buy 1 get 1 free offer!",
    price: "₹499",
    discount: "50% OFF",
    validity: "Valid till March 30, 2025",
    vendor: {
      name: "Pizza Palace",
      location: "123 Food Street, City Center",
      contact: "+91-9876543210",
    },
    rating: 4.5,
    reviews: [
      { user: "John Doe", comment: "Loved it!", rating: 5 },
      { user: "Jane Doe", comment: "Great offer.", rating: 4 },
    ],
  };

  return (
    <div className="container mt-5">
      {/* Deal Header */}
      <div className="card shadow-lg p-4">
        <h2 className="deal-title">{deal.title}</h2>
        <p className="text-muted">{deal.description}</p>

        <div className="deal-meta mt-3">
          <span className="price fw-bold">{deal.price}</span> &nbsp; 
          <span className="badge bg-success">{deal.discount}</span>
          <p className="text-danger mt-2">{deal.validity}</p>
        </div>

        {/* Action Buttons */}
        <div className="deal-actions mt-4">
          <button className="btn btn-outline-primary me-2">
            <FaShareAlt /> Share
          </button>
          <button className="btn btn-outline-secondary me-2">
            <FaSave /> Save
          </button>
          <button className="btn btn-outline-danger">
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Vendor Details */}
      <div className="card mt-4 p-4 shadow-sm">
        <h4>Offered by: {deal.vendor.name}</h4>
        <p>📍 {deal.vendor.location}</p>
        <p>📞 {deal.vendor.contact}</p>
      </div>

      {/* Reviews */}
      <div className="card mt-4 p-4 shadow-sm">
        <h4>Customer Reviews (⭐ {deal.rating})</h4>
        {deal.reviews.map((review, index) => (
          <div key={index} className="mt-3">
            <strong>{review.user}</strong>
            <p>{review.comment} - ⭐ {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealDetailPage2;
