import React from "react";

const DealPreview = ({ deal }) => {
  return (
    <div
      style={{ color: "black" }}
      className="my-5 p-4 border rounded bg-light"
    >
      <h3>Deal Preview <strong>Need to redesign preview(same as deal detail || deals )</strong></h3>
      <h4>{deal.title || "Deal Title"}</h4>
      <p>{deal.description || "Deal Description"}</p>
      <p>
        <strong>Category:</strong> {deal.category}
      </p>
      <p>
        <strong>Price:</strong> ₹{deal.finalPrice || "0.00"}
      </p>
      <p>
        <strong>Deal Type:</strong> {deal.type}
      </p>
      {deal.images.length > 0 && (
        <div>
          <p>
            <strong>Images:</strong>
          </p>
          {deal.images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt="Deal Preview"
              style={{ width: "100px", marginRight: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DealPreview;
