// src/components/business/AddAdvertisement.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const AddAdvertisement = () => {
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    adType: "featured",
    images: [],
    location: "",
    radius: 5,
    startDate: "",
    endDate: "",
    schedule: false,
    budget: 0,
    paymentMethod: "manual",
    preview: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdData({
      ...adData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setAdData({ ...adData, images: [...adData.images, ...files] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ad Submitted: ", adData);
  };

  // Preview the ad
  const togglePreview = () => {
    setAdData({ ...adData, preview: !adData.preview });
  };

  return (
    <div className="add-advertisement p-4">
      <h2 className="mb-4">Create Advertisement</h2>
      <Form onSubmit={handleSubmit}>
        {/* 1. Advertisement Information */}
        <h4>Advertisement Information</h4>
        <Form.Group controlId="adTitle">
          <Form.Label>Ad Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ad title"
            name="title"
            value={adData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="adDescription">
          <Form.Label>Ad Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter ad description"
            name="description"
            value={adData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="adType">
          <Form.Label>Ad Type</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="Featured Deal"
                name="adType"
                value="featured"
                checked={adData.adType === "featured"}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Map Highlight"
                name="adType"
                value="map"
                checked={adData.adType === "map"}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Flash Deal"
                name="adType"
                value="flash"
                checked={adData.adType === "flash"}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="adImages">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleImageUpload} />
        </Form.Group>

        {/* 2. Target & Location Settings */}
        <h4>Target & Location Settings</h4>
        <Form.Group controlId="location">
          <Form.Label>Business Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter business location"
            name="location"
            value={adData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="radius">
          <Form.Label>Target Radius (km)</Form.Label>
          <Form.Control
            type="number"
            name="radius"
            value={adData.radius}
            onChange={handleChange}
          />
        </Form.Group>

        {/* 3. Ad Duration & Scheduling */}
        <h4>Ad Duration & Scheduling</h4>
        <Row>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={adData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="endDate">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                value={adData.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="schedule">
          <Form.Check
            type="checkbox"
            label="Enable Recurring Ad"
            name="schedule"
            checked={adData.schedule}
            onChange={handleChange}
          />
        </Form.Group>

        {/* 4. Budget & Payment */}
        <h4>Budget & Payment</h4>
        <Form.Group controlId="budget">
          <Form.Label>Ad Budget ($)</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              name="budget"
              value={adData.budget}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="paymentMethod">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            as="select"
            name="paymentMethod"
            value={adData.paymentMethod}
            onChange={handleChange}
          >
            <option value="manual">Manual Approval</option>
            <option value="online">Online Payment (Coming Soon)</option>
          </Form.Control>
        </Form.Group>

        {/* 5. Preview & Submission */}
        <div className="mt-4">
          <Button variant="secondary" onClick={togglePreview} className="me-2">
            {adData.preview ? "Hide Preview" : "Preview Ad"}
          </Button>
          <Button type="submit" variant="primary">
            Submit Advertisement
          </Button>
        </div>
      </Form>

      {/* Ad Preview */}
      {adData.preview && (
        <div className="mt-4 p-3 border">
          <h3>Ad Preview</h3>
          <p><strong>Title:</strong> {adData.title}</p>
          <p><strong>Description:</strong> {adData.description}</p>
          <p><strong>Type:</strong> {adData.adType}</p>
          <p><strong>Location:</strong> {adData.location}</p>
          <p><strong>Budget:</strong> ${adData.budget}</p>
          <p><strong>Start:</strong> {adData.startDate}</p>
          <p><strong>End:</strong> {adData.endDate}</p>
          {adData.images.length > 0 && (
            <div>
              <strong>Images:</strong>
              {adData.images.map((img, index) => (
                <div key={index}>{img.name}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddAdvertisement;
