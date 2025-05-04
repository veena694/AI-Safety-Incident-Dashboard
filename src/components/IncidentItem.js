import React, { useState } from "react";

function IncidentItem({ incident }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "8px" }}>
      <h3>{incident.title}</h3>
      <p>Severity: {incident.severity}</p>
      <p>Reported on: {new Date(incident.reported_at).toLocaleDateString()}</p>
      <button onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "View Details"}
      </button>
      {showDetails && (
        <p style={{ marginTop: "10px" }}>{incident.description}</p>
      )}
    </div>
  );
}

export default IncidentItem;
