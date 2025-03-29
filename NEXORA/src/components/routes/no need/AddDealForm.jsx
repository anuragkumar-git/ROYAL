import React, { useState } from "react";
import DealPreview from "./DealPreview";
import { CCalendar } from "@coreui/react-pro";
// import "bootstrap/dist/css/bootstrap.min.css";

const AddDealForm = () => {
  // State to store form values
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    category: "Food",
    type: "regular",
    images: [],
    startDate: "",
    endDate: "",
    recurring: false,
    // location: "",
    // multiLocation: false,
    originalPrice: "",
    discount: "",
    finalPrice: "",
    customLabel: "",
    highlightOnMap: false,
    limitRedemptions: "",
    visibilityDuration: "",
    terms: "",
    contactInfo: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeal({
      ...deal,
      [name]: type === "checkbox" ? checked : value,
    });

    // Auto-calculate final price
    if (name === "originalPrice" || name === "discount") {
      const discountPrice =
        value && name === "discount" ? value : deal.discount;
      const originalPrice =
        value && name === "originalPrice" ? value : deal.originalPrice;
      const finalPrice =
        originalPrice && discountPrice
          ? originalPrice - originalPrice * (discountPrice / 100)
          : "";
      setDeal((prev) => ({ ...prev, finalPrice }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setDeal((prev) => ({ ...prev, images: files }));
  };

  // Submit handler (placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deal Submitted: ", deal);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add a New Deal</h2>
      <form onSubmit={handleSubmit} className="row g-4">
        {/* Deal Title */}
        <div className="col-md-6">
          <label className="form-label">Deal Title</label>
          <input
            type="text"
            name="title"
            value={deal.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Deal Description */}
        <div className="col-md-6">
          <label className="form-label">Deal Description</label>
          <textarea
            name="description"
            value={deal.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>

        {/* Category */}
        <div className="col-md-4">
          <label className="form-label">Deal Category</label>
          <select
            name="category"
            value={deal.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Food">Food</option>
            <option value="Beverages">Beverages</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        {/* Deal Type */}
        <div className="col-md-4">
          <label className="form-label">Deal Type</label>
          <div className="d-flex gap-3">
            {["regular", "featured", "flash"].map((type) => (
              <div key={type} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  value={type}
                  checked={deal.type === type}
                  onChange={handleChange}
                />
                <label className="form-check-label">{type}</label>
              </div>
            ))}
          </div>
        </div>

        <label for="startDate">Birthday:</label>
        <input
          onChange={handleChange}
          type="date"
          id="startDate"
          name="startDate"
        />

        {/* Image Upload */}
        <div className="col-md-4">
          <label className="form-label">Deal Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="form-control"
          />
        </div>

        {/* Pricing */}
        <div className="col-md-4">
          <label className="form-label">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={deal.originalPrice}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={deal.discount}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Final Price</label>
          <input
            type="number"
            name="finalPrice"
            value={deal.finalPrice}
            readOnly
            className="form-control"
          />
        </div>

        {/* Contact Info */}
        <div className="col-md-6">
          <label className="form-label">Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            value={deal.contactInfo}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Submission Controls */}
        <div className="col-12 d-flex gap-3">
          <button type="submit" className="btn btn-primary">
            Publish Deal
          </button>
          <button type="button" className="btn btn-secondary">
            Save as Draft
          </button>
        </div>
      </form>

      {/* Real-Time Deal Preview */}
      <DealPreview deal={deal} />
    </div>
  );
};

export default AddDealForm;
