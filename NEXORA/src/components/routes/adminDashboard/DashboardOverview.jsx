// DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import { FaUsers, FaTags, FaClipboardCheck, FaExclamationTriangle, FaAdversal, FaChartBar } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const DashboardOverview = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeDeals: 0,
    pendingApprovals: 0,
    reportedDeals: 0,
    activeAds: 0,
    platformAnalytics: {
      userActivity: 0,
      topCategory: 'N/A',
      mostViewedDeal: 'N/A',
    },
  });

  // Simulate fetching data (replace with API calls)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call (replace with actual API logic)
        setTimeout(() => {
          setMetrics({
            totalUsers: 452,
            activeDeals: 128,
            pendingApprovals: 15,
            reportedDeals: 7,
            activeAds: 23,
            platformAnalytics: {
              userActivity: 1204,
              topCategory: 'Food & Beverages',
              mostViewedDeal: 'Buy 1 Get 1 Pizza',
            },
          });
        }, 1000);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid>
      <h2 className="my-4">Admin Dashboard Overview</h2>
      <Row>
        <Col md={4}>
          <DashboardCard title="Total Users" value={metrics.totalUsers} icon={<FaUsers />} bg="bg-primary" />
        </Col>
        <Col md={4}>
          <DashboardCard title="Active Deals" value={metrics.activeDeals} icon={<FaTags />} bg="bg-success" />
        </Col>
        <Col md={4}>
          <DashboardCard title="Pending Approvals" value={metrics.pendingApprovals} icon={<FaClipboardCheck />} bg="bg-warning" />
        </Col>
        <Col md={4}>
          <DashboardCard title="Reported Deals" value={metrics.reportedDeals} icon={<FaExclamationTriangle />} bg="bg-danger" />
        </Col>
        <Col md={4}>
          <DashboardCard title="Active Ads" value={metrics.activeAds} icon={<FaAdversal />} bg="bg-info" />
        </Col>
        <Col md={4}>
          <DashboardCard
            title="Platform Analytics"
            value={`${metrics.platformAnalytics.userActivity} users`}
            icon={<FaChartBar />}
            bg="bg-secondary"
          />
        </Col>
      </Row>
      <h4 className="mt-4">Insights:</h4>
      <ul>
        <li><strong>Top Category:</strong> {metrics.platformAnalytics.topCategory}</li>
        <li><strong>Most Viewed Deal:</strong> {metrics.platformAnalytics.mostViewedDeal}</li>
      </ul>
    </Container>
  );
};

export default DashboardOverview;
