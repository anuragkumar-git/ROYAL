import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DashboardCard from './DashboardCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaChartLine, FaMapMarkerAlt, FaBullhorn, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BusinessDashboard2 = () => {
  // Mock Data for Graphs
  const locationData = [
    { name: 'Nearby', views: 120 },
    { name: 'City-wide', views: 80 },
    { name: 'Other', views: 40 },
  ];

  const adInsights = [
    { name: 'Featured', clicks: 150 },
    { name: 'Flash', clicks: 90 },
    { name: 'Regular', clicks: 45 },
  ];

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">📊 Business Dashboard</h2>

      {/* Top Stats */}
      <Row>
        <Col md={3}><DashboardCard title="Active Deals" value="8" icon={<FaChartLine />} /></Col>
        <Col md={3}><DashboardCard title="Total Views" value="2,345" icon={<FaMapMarkerAlt />} /></Col>
        <Col md={3}><DashboardCard title="Total Clicks" value="1,123" icon={<FaBullhorn />} /></Col>
        <Col md={3}>
        <Link to={'/adddeal'}>
          <Button variant="primary" className="w-100">
            <FaPlusCircle /> Add New Deal
          </Button>
        </Link>
        </Col>
      </Row>

      {/* Advertisement Insights */}
      <h4 className="mt-5">📈 Advertisement Insights</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={adInsights}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" fill="#6a5acd" />
        </BarChart>
      </ResponsiveContainer>

      {/* Location Analytics */}
      <h4 className="mt-5">📍 Location Analytics</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={locationData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#483d8b" />
        </BarChart>
      </ResponsiveContainer>

      {/* Manage Deals */}
      <h4 className="mt-5">🛠️ Manage Deals</h4>
      <ul>
        <li>Edit Active Deals</li>
        <li>Review Draft Deals</li>
        <li>Monitor Deal Expirations</li>
      </ul>
    </Container>
  );
};

export default BusinessDashboard2;
