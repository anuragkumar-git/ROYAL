// src/components/Admin/DealManagement.jsx
import React, { useState } from 'react';
import { Table, Button, Form, Modal, Pagination } from 'react-bootstrap';
import DealDetailsModal from './DealDetailsModal';

const DealManagement = () => {
  // Sample deal data (Replace with actual API data in production)
  const [deals, setDeals] = useState([
    {
      id: 1,
      businessName: 'Pizza Hub',
      title: '50% Off on All Pizzas',
      type: 'Flash',
      status: 'Pending',
      startDate: '2025-03-15',
      endDate: '2025-03-30',
      reportedReason: '',
    },
    {
      id: 2,
      businessName: 'Cafe Delight',
      title: 'Buy 1 Get 1 Free',
      type: 'Regular',
      status: 'Active',
      startDate: '2025-03-10',
      endDate: '2025-04-01',
      reportedReason: 'Misleading Info',
    },
  ]);

  // State for search & filters
  const [filters, setFilters] = useState({
    businessName: '',
    type: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  // Modal State for Deal Details
  const [showModal, setShowModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  // Handle Search & Filter Change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtered Deals
  const filteredDeals = deals.filter((deal) => {
    return (
      (filters.businessName === '' || deal.businessName.toLowerCase().includes(filters.businessName.toLowerCase())) &&
      (filters.type === '' || deal.type === filters.type) &&
      (filters.status === '' || deal.status === filters.status) &&
      (filters.startDate === '' || new Date(deal.startDate) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(deal.endDate) <= new Date(filters.endDate))
    );
  });

  // Deal Actions (Approve, Reject, Suspend, Delete, Feature)
  const handleAction = (dealId, action) => {
    let updatedDeals = [...deals];
    const index = updatedDeals.findIndex((deal) => deal.id === dealId);
    if (index !== -1) {
      switch (action) {
        case 'approve':
          updatedDeals[index].status = 'Active';
          break;
        case 'reject':
          updatedDeals[index].status = 'Rejected';
          break;
        case 'suspend':
          updatedDeals[index].status = updatedDeals[index].status === 'Suspended' ? 'Active' : 'Suspended';
          break;
        case 'delete':
          updatedDeals.splice(index, 1);
          break;
        case 'feature':
          updatedDeals[index].type = 'Featured';
          break;
        default:
          break;
      }
      setDeals(updatedDeals);
      alert(`Deal ${action}d successfully.`);
    }
  };

  // Open Deal Details Modal
  const openDealDetails = (deal) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Deal Management</h2>

      {/* Search & Filter Section */}
      <Form className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="text"
            name="businessName"
            value={filters.businessName}
            onChange={handleFilterChange}
            placeholder="Search by business"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Deal Type</Form.Label>
          <Form.Select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="Regular">Regular</option>
            <option value="Flash">Flash</option>
            <option value="Featured">Featured</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Expired">Expired</option>
            <option value="Reported">Reported</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </Form.Group>
      </Form>

      {/* Deal List (Table View) */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Business Name</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeals.map((deal) => (
            <tr key={deal.id}>
              <td>{deal.id}</td>
              <td>{deal.businessName}</td>
              <td>{deal.title}</td>
              <td>{deal.type}</td>
              <td>{deal.status}</td>
              <td>{deal.startDate}</td>
              <td>{deal.endDate}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => openDealDetails(deal)}>View</Button>{' '}
                {deal.status === 'Pending' && (
                  <>
                    <Button variant="success" size="sm" onClick={() => handleAction(deal.id, 'approve')}>Approve</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleAction(deal.id, 'reject')}>Reject</Button>
                  </>
                )}
                <Button
                  variant={deal.status === 'Suspended' ? 'warning' : 'secondary'}
                  size="sm"
                  onClick={() => handleAction(deal.id, 'suspend')}
                >
                  {deal.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                </Button>{' '}
                <Button variant="primary" size="sm" onClick={() => handleAction(deal.id, 'feature')}>Feature</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleAction(deal.id, 'delete')}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination (Optional) */}
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Next />
      </Pagination>

      {/* Deal Details Modal */}
      {selectedDeal && <DealDetailsModal show={showModal} handleClose={() => setShowModal(false)} deal={selectedDeal} />}
    </div>
  );
};

export default DealManagement;
