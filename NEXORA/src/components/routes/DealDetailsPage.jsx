// src/components/DealDetailsPage.js
import React from "react";
import "../../assets/css/DealDetailsPage.css";
import {
  FaMapMarkerAlt,
  FaShareAlt,
  FaStar,
  FaRegBookmark,
  FaFlag,
} from "react-icons/fa";
import tukkulogo from "../../assets/images/tukkuLogo.png";
const DealDetailsPage = () => {
  const deal = {
    title: "50% Off on Sourdough Bread",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwNzN4W5DEjpatX1OVW1x2dJNuqam3FoAYA&s",
    description:
      "Enjoy freshly baked sourdough bread with a 50% discount on your first purchase.",
    terms: "Valid for dine-in only. Offer ends March 31, 2025.",
    vendor: {
      name: "Tukku Bakery",
      logo: "",
      address: "123 Main Street, Cityville",
      mapLink: "https://www.google.com/maps",
    },
    rating: 4.5,
    reviews: 125,
    expires: "March 31, 2025",
    views: 3421,
    shares: 78,
  };

  return (
    <>
      <div className="container mt-4">
        {/* Deal Header */}
        <div className="deal-header text-center mb-4">
          <img
            src={deal.image}
            alt={deal.title}
            className="deal-image img-fluid"
          />
          <h1 className="mt-3">{deal.title}</h1>
          <p className="badge bg-success fs-5">50% OFF</p>
        </div>

        {/* Vendor Information */}
        <div className="vendor-info d-flex align-items-center mb-3">
          <img
            src={tukkulogo}
            alt={deal.vendor.name}
            className="vendor-logo me-3"
          />
          <div>
            <h5>{deal.vendor.name}</h5>
            <p>
              <FaMapMarkerAlt /> {deal.vendor.address}{" "}
              <a
                href={deal.vendor.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-2 btn btn-outline-primary btn-sm"
              >
                Get Directions
              </a>
            </p>
          </div>
        </div>

        {/* Deal Description */}
        <div className="deal-description mb-4">
          <h4>About this Deal</h4>
          <p>{deal.description}</p>
          <h5>Terms & Conditions</h5>
          <p>{deal.terms}</p>
          <p>
            <strong>Expires on:</strong> {deal.expires}
          </p>
        </div>

        {/* Actions */}
        <div className="deal-actions d-flex gap-3 mb-4">
          <button className="btn btn-primary">Claim Deal</button>
          <button className="btn btn-outline-secondary">
            <FaRegBookmark /> Save for Later
          </button>
          <button className="btn btn-outline-danger">
            <FaFlag /> Report Deal
          </button>
        </div>

        {/* Social & Insights */}
        <div className="deal-insights d-flex justify-content-between align-items-center">
          <div className="ratings">
            <FaStar className="text-warning" /> {deal.rating} ({deal.reviews}{" "}
            Reviews)
          </div>
          <div className="share-button">
            <button className="btn btn-outline-dark">
              <FaShareAlt /> Share Deal
            </button>
          </div>
        </div>

        {/* Deal Statistics */}
        <div className="deal-stats mt-4">
          <p>
            <strong>Views:</strong> {deal.views} | <strong>Shares:</strong>{" "}
            {deal.shares}
          </p>
        </div>
      </div>
    </>
  );
};

export default DealDetailsPage;
