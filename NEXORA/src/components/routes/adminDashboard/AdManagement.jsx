// src/components/Admin/AdManagement.jsx

import React, { useState } from "react";
import { Table, Button, Form, Modal, Pagination, Badge } from "react-bootstrap";
import DashboardCard from "./DashboardCard";

const AdManagement = () => {
  // Sample ad data (replace with API calls later)
  const initialAds = [
    {
      id: 1,
      businessName: "Pizza Palace",
      adType: "Featured Deal",
      status: "Pending",
      startDate: "2025-03-01",
      endDate: "2025-03-30",
      clicks: 250,
    },
    {
      id: 2,
      businessName: "Tech Store",
      adType: "Map Highlight",
      status: "Active",
      startDate: "2025-03-05",
      endDate: "2025-04-05",
      clicks: 580,
    },
    {
      id: 3,
      businessName: "Coffee Corner",
      adType: "Featured Deal",
      status: "Expired",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      clicks: 430,
    },
  ];

  const [ads, setAds] = useState(initialAds);
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [bulkSelection, setBulkSelection] = useState([]);

  // Handle Ad Actions
  const handleApprove = (id) => {
    updateAdStatus(id, "Active");
  };

  const handleSuspend = (id) => {
    updateAdStatus(id, "Suspended");
  };

  const handleDelete = (id) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const handleFeatureToggle = (id) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id
        ? {
            ...ad,
            adType:
              ad.adType === "Featured Deal" ? "Map Highlight" : "Featured Deal",
          }
        : ad
    );
    setAds(updatedAds);
  };

  // Bulk Action Handler
  const handleBulkDelete = () => {
    setAds(ads.filter((ad) => !bulkSelection.includes(ad.id)));
    setBulkSelection([]);
  };

  const handleBulkApprove = () => {
    setAds(
      ads.map((ad) =>
        bulkSelection.includes(ad.id) && ad.status === "Pending"
          ? { ...ad, status: "Active" }
          : ad
      )
    );
    setBulkSelection([]);
  };

  const updateAdStatus = (id, status) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id ? { ...ad, status } : ad
    );
    setAds(updatedAds);
  };

  // Open Modal with Ad Details
  const openAdDetails = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  // Badge Colors by Status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Pending":
        return "warning";
      case "Expired":
        return "secondary";
      case "Suspended":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <div className="ad-management-container">
      <h3>Ad Management</h3>

      {/* Ad Overview Cards */}
      <div className="row mb-4">
        <DashboardCard title="Total Ads" value={ads.length} />
        <DashboardCard
          title="Active Ads"
          value={ads.filter((ad) => ad.status === "Active").length}
        />
        <DashboardCard
          title="Pending Approvals"
          value={ads.filter((ad) => ad.status === "Pending").length}
        />
        <DashboardCard
          title="Featured Deals"
          value={ads.filter((ad) => ad.adType === "Featured Deal").length}
        />
      </div>

      {/* Bulk Actions */}
      {bulkSelection.length > 0 && (
        <div className="mb-3">
          <Button variant="success" onClick={handleBulkApprove} className="me-2">
            Approve Selected
          </Button>
          <Button variant="danger" onClick={handleBulkDelete}>
            Delete Selected
          </Button>
        </div>
      )}

      {/* Ad List Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                onChange={(e) =>
                  setBulkSelection(
                    e.target.checked ? ads.map((ad) => ad.id) : []
                  )
                }
              />
            </th>
            <th>Business Name</th>
            <th>Ad Type</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id}>
              <td>
                <Form.Check
                  checked={bulkSelection.includes(ad.id)}
                  onChange={() =>
                    setBulkSelection((prev) =>
                      prev.includes(ad.id)
                        ? prev.filter((id) => id !== ad.id)
                        : [...prev, ad.id]
                    )
                  }
                />
              </td>
              <td>{ad.businessName}</td>
              <td>{ad.adType}</td>
              <td>
                <Badge bg={getStatusBadge(ad.status)}>{ad.status}</Badge>
              </td>
              <td>{ad.startDate}</td>
              <td>{ad.endDate}</td>
              <td>{ad.clicks}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => openAdDetails(ad)}
                  className="me-1"
                >
                  View
                </Button>
                {ad.status === "Pending" && (
                  <Button size="sm" variant="success" onClick={() => handleApprove(ad.id)}>
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(ad.id)}
                  className="ms-1"
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleFeatureToggle(ad.id)}
                  className="ms-1"
                >
                  Toggle Feature
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Ad Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ad Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAd && (
            <>
              <p><b>Business:</b> {selectedAd.businessName}</p>
              <p><b>Type:</b> {selectedAd.adType}</p>
              <p><b>Status:</b> {selectedAd.status}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdManagement;
