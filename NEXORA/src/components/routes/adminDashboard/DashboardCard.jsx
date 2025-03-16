// DashboardCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ title, value, icon, bg }) => (
  <Card className={`text-white mb-4 ${bg}`}>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>{title}</h5>
          <h2>{value}</h2>
        </div>
        <div className="fs-1">{icon}</div>
      </div>
    </Card.Body>
  </Card>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  bg: PropTypes.string,
};

DashboardCard.defaultProps = {
  bg: 'bg-primary',
};

export default DashboardCard;
