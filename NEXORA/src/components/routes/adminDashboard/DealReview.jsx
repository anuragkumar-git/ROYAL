// src/components/AdminDashboard/DealReview.jsx
import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const DealReview = () => {
    // Sample Data (Replace with API integration later)
    const [reportedDeals, setReportedDeals] = useState([
        {
            id: 1,
            businessName: "Pizza Paradise",
            dealTitle: "50% Off on Large Pizza",
            dealType: "Flash",
            reportReason: "Misleading Info",
            reportedBy: "user123@example.com",
            reportDate: "2025-03-20",
            status: "Pending",
        },
        {
            id: 2,
            businessName: "Tech Hub",
            dealTitle: "Buy 1 Get 1 Free",
            dealType: "Featured",
            reportReason: "Spam",
            reportedBy: "user456@example.com",
            reportDate: "2025-03-18",
            status: "Pending",
        },
    ]);

    // Modal State for Viewing Deal Details
    const [showModal, setShowModal] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState(null);

    // Function to handle Modal Opening
    const handleViewDetails = (deal) => {
        setSelectedDeal(deal);
        setShowModal(true);
    };

    // Approve/Reject/Remove Handlers
    const handleApprove = (id) => {
        const updatedDeals = reportedDeals.map((deal) =>
            deal.id === id ? { ...deal, status: "Resolved" } : deal
        );
        setReportedDeals(updatedDeals);
    };

    const handleSuspend = (id) => {
        alert(`Deal ID ${id} has been suspended.`);
    };

    const handleDelete = (id) => {
        setReportedDeals(reportedDeals.filter((deal) => deal.id !== id));
    };

    return (
        <div className="container mt-4">
            <h2>Deal Review & Moderation</h2>

            {/* Search and Filter Section */}
            <Form className="mb-3">
                <Form.Group controlId="search">
                    <Form.Control type="text" placeholder="Search by Business Name" />
                </Form.Group>
            </Form>

            {/* Reported Deals Table */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Business Name</th>
                        <th>Deal Title</th>
                        <th>Deal Type</th>
                        <th>Report Reason</th>
                        <th>Reported By</th>
                        <th>Report Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedDeals.map((deal) => (
                        <tr key={deal.id}>
                            <td>{deal.id}</td>
                            <td>{deal.businessName}</td>
                            <td>{deal.dealTitle}</td>
                            <td>{deal.dealType}</td>
                            <td>{deal.reportReason}</td>
                            <td>{deal.reportedBy}</td>
                            <td>{deal.reportDate}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        deal.status === "Pending"
                                            ? "bg-warning"
                                            : "bg-success"
                                    }`}
                                >
                                    {deal.status}
                                </span>
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleViewDetails(deal)}
                                >
                                    View
                                </Button>{" "}
                                {deal.status === "Pending" && (
                                    <>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleApprove(deal.id)}
                                        >
                                            Approve
                                        </Button>{" "}
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleSuspend(deal.id)}
                                        >
                                            Suspend
                                        </Button>{" "}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(deal.id)}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Deal Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Deal Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDeal && (
                        <>
                            <p>
                                <strong>Business Name:</strong> {selectedDeal.businessName}
                            </p>
                            <p>
                                <strong>Deal Title:</strong> {selectedDeal.dealTitle}
                            </p>
                            <p>
                                <strong>Deal Type:</strong> {selectedDeal.dealType}
                            </p>
                            <p>
                                <strong>Report Reason:</strong> {selectedDeal.reportReason}
                            </p>
                            <p>
                                <strong>Reported By:</strong> {selectedDeal.reportedBy}
                            </p>
                            <p>
                                <strong>Report Date:</strong> {selectedDeal.reportDate}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`badge ${
                                        selectedDeal.status === "Pending"
                                            ? "bg-warning"
                                            : "bg-success"
                                    }`}
                                >
                                    {selectedDeal.status}
                                </span>
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DealReview;
