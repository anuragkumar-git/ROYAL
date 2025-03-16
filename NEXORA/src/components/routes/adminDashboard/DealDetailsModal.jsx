// src/components/Admin/DealDetailsModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DealDetailsModal = ({ show, handleClose, deal }) => {
  if (!deal) return null; // Ensure deal exists

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Deal Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>{deal.title}</h5>
        <p><strong>Business:</strong> {deal.businessName}</p>
        <p><strong>Type:</strong> {deal.type}</p>
        <p><strong>Status:</strong> {deal.status}</p>

        <p><strong>Deal Description:</strong></p>
        <p>{deal.description || "No description provided."}</p>

        <p><strong>Duration:</strong> {deal.startDate} to {deal.endDate}</p>

        {deal.reportedReason && (
          <p className="text-danger"><strong>Reported Reason:</strong> {deal.reportedReason}</p>
        )}

        {deal.images && deal.images.length > 0 && (
          <div>
            <strong>Deal Images:</strong>
            <div className="mt-2">
              {deal.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Deal image ${index + 1}`}
                  style={{ width: '150px', height: 'auto', marginRight: '10px' }}
                />
              ))}
            </div>
          </div>
        )}

        <p><strong>Original Price:</strong> ₹{deal.originalPrice}</p>
        <p><strong>Discounted Price:</strong> ₹{deal.finalPrice}</p>
        {deal.customLabel && <p><strong>Custom Label:</strong> {deal.customLabel}</p>}

        <p><strong>Location:</strong> {deal.location || "Location not specified"}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DealDetailsModal;
