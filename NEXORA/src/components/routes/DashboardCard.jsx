import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ title, value, icon }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Body className="text-center">
      <div className="fs-1">{icon}</div>
      <h5>{title}</h5>
      <h2>{value}</h2>
    </Card.Body>
  </Card>
);

export default DashboardCard;
