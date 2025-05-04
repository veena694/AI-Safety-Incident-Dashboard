import React, { useState } from 'react';
import './IncidentCard.css';

function IncidentCard({ incident }) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="incident-card">
      <div className="incident-header">
        <h3>{incident.title}</h3>
        <span className={`severity ${incident.severity.toLowerCase()}`}>
          {incident.severity}
        </span>
      </div>
      <p className="incident-date">{formatDate(incident.reported_at)}</p>
      <button className="toggle-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Details' : 'View Details'}
      </button>
      {expanded && <p className="incident-description">{incident.description}</p>}
    </div>
  );
}

export default IncidentCard;
