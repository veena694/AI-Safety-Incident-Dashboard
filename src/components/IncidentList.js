import React from "react";
import IncidentItem from "./IncidentItem";

function IncidentList({ incidents }) {
  return (
    <div>
      {incidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
}

export default IncidentList;
