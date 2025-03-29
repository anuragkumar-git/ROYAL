import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../assets/css/AddDeal.css";
import { useNavigate } from "react-router-dom";

const AddDeal = () => {

  const navigate = useNavigate()
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    category: "Clothing",
    options: ["Regular"],
    startDate: "",
    endDate: "",
    image: null,
    originalPrice: "",
    discount: "",
    finalPrice: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedOptions = checked
        ? [...deal.options, value]
        : deal.options.filter((option) => option !== value);
      setDeal({ ...deal, options: updatedOptions });
    } else if (type === "file") {
      setDeal({ ...deal, image: e.target.files[0] });
    } else {
      setDeal({ ...deal, [name]: value });
    }

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

  const handleSubmit = (e) => {
    navigate('/business/dashboard')
    // e.preventDefault();
    console.log("Form Data:", deal);
  };

  return (
    <div className="add-deal-form container p-4 rounded">
      <h2 className="mb-3">Add Deal Form</h2>
      <p>Please fill in the details of your deal</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Deal title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter deal title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deal description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Enter deal description"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 row">
          <div className="col">
            <label className="form-label">Deal category</label>
            <select
              name="category"
              className="form-select col"
              onChange={handleChange}
              value={deal.category}
            >
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Food</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Deal options</label>
          <div>
            {["Regular", "Featured", "Flash"].map((option) => (
              <div className="form-check form-check-inline" key={option}>
                <input
                  type="radio"
                  className="form-check-input"
                  name="options"
                  value={option}
                  checked={deal.options === option}
                  onChange={handleChange}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col">
            <label className="form-label">Start date</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">End date</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Deal image</label>
          <input
            type="file"
            className="form-control-file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 row">
          <div className="col">
            <label className="form-label">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={deal.originalPrice}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col">
            <label className="form-label">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={deal.discount}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* <div className="col"> */}
          {/* <label className="form-label">Final Price</label> */}
          {/* </div> */}
        </div>
          <p>
            <strong className="form-label">Price:</strong> ₹
            {deal.finalPrice || "0.00"}
          </p>

        <div class="text-center">
          <button
            type="submit"
            className="btn add-deal btn-outline-dark btn-lg px-5 " //btn-outline-light
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeal;
