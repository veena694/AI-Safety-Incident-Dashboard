import React, { useState } from 'react';
import './App.css';

const initialIncidents = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

function App() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [newIncident, setNewIncident] = useState({ title: '', description: '', severity: 'Low' });
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIncident.title || !newIncident.description) return;

    const today = new Date();
    const reportedAt = today.toISOString();

    const newId = incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1;

    const newEntry = {
      ...newIncident,
      id: newId,
      reported_at: reportedAt,
    };

    setIncidents([newEntry, ...incidents]);
    setNewIncident({ title: '', description: '', severity: 'Low' });
  };

  const filteredIncidents = incidents
    .filter(incident => filterSeverity === 'All' || incident.severity === filterSeverity)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      return sortOrder === 'Newest First' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="container">
      <header className="header">AI Safety Incident Dashboard</header>

      <div className="controls">
        <div>
          <label>Filter by severity:</label>
          <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Sort by:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="incident-list">
        <div className="incident-header">
          <div>Title</div>
          <div>Severity</div>
          <div>Reported Date</div>
          <div>Action</div>
        </div>

        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            <div className="incident-title">{incident.title}</div>
            <div>
              <span className={`severity-pill ${incident.severity.toLowerCase()}`}>
                {incident.severity}
              </span>
            </div>
            <div>{incident.reported_at}</div>
            <div>
              <button onClick={() => setSelectedIncident(incident)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="incident-form">
        <h2>Report New Incident</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={newIncident.title}
            onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={newIncident.description}
            onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
            required
          ></textarea>
        </div>

        <div>
          <label>Severity</label>
          <div className="severity-options">
            {["Low", "Medium", "High"].map(level => (
              <label key={level}>
                <input
                  type="radio"
                  value={level}
                  checked={newIncident.severity === level}
                  onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>

      {selectedIncident && (
        <div className="incident-details">
          <h3>{selectedIncident.title}</h3>
          <p><strong>Severity:</strong> {selectedIncident.severity}</p>
          <p><strong>Reported At:</strong> {selectedIncident.reported_at}</p>
          <p><strong>Description:</strong> {selectedIncident.description}</p>
          <button onClick={() => setSelectedIncident(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
