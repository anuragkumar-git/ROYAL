// UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { FaSearch, FaEye, FaTrash, FaUserSlash, FaUserCheck, FaRedo } from 'react-icons/fa';

const UserManagement = () => {
  // Simulated user data (Replace with API call in real implementation)
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Fetch Users (Simulating API Call)
  useEffect(() => {
    const fetchUsers = async () => {
      const sampleUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Regular', status: 'Active' },
        { id: 2, name: 'Pizza House', email: 'owner@pizzahouse.com', type: 'Business Owner', status: 'Active' },
        { id: 3, name: 'Alice Smith', email: 'alice@example.com', type: 'Regular', status: 'Suspended' },
      ];
      setUsers(sampleUsers);
      setFilteredUsers(sampleUsers);
    };
    fetchUsers();
  }, []);

  // Search & Filter Logic
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'all' || user.type === filterType || 
                       (filterType === 'suspended' && user.status === 'Suspended');
      return matchSearch && matchType;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, filterType, users]);

  // Action Handlers
  const handleSuspendToggle = (id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' } : user
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleResetPassword = (email) => {
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <Container fluid>
      <h2 className="my-4">User Management</h2>

      {/* Search & Filter Controls */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputGroup.Text><FaSearch /></InputGroup.Text>

        <Form.Select
          className="ms-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="Regular">Regular Users</option>
          <option value="Business Owner">Business Owners</option>
          <option value="suspended">Suspended Accounts</option>
        </Form.Select>
      </InputGroup>

      {/* Users Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No users found</td></tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <span className={user.status === 'Active' ? 'text-success' : 'text-danger'}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <Button variant="info" size="sm" className="me-2">
                    <FaEye /> View
                  </Button>
                  <Button
                    variant={user.status === 'Active' ? 'warning' : 'success'}
                    size="sm"
                    onClick={() => handleSuspendToggle(user.id)}
                    className="me-2"
                  >
                    {user.status === 'Active' ? <FaUserSlash /> : <FaUserCheck />} {user.status === 'Active' ? 'Suspend' : 'Unsuspend'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    className="me-2"
                  >
                    <FaTrash /> Delete
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleResetPassword(user.email)}
                  >
                    <FaRedo /> Reset Password
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManagement;
