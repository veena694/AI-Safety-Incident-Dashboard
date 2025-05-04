import React, { useState } from "react";

function NewIncidentForm({ onAddIncident }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields!");
      return;
    }
    const newIncident = {
      id: Date.now(), // generate unique id
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    onAddIncident(newIncident);
    setTitle("");
    setDescription("");
    setSeverity("Low");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Report New Incident</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" style={{ padding: "10px 20px" }}>
        Submit
      </button>
    </form>
  );
}

export default NewIncidentForm;
