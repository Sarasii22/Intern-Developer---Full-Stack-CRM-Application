import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);

  const [note, setNote] = useState("");

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const res = await API.get(`/leads/${id}`);

      setLead(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async () => {
    if (!note) {
      return alert("Enter note");
    }

    try {
      await API.post(`/leads/${id}/notes`, {
        content: note,
      });

      setNote("");

      fetchLead();
    } catch (error) {
      console.log(error);
    }
  };

  if (!lead) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Lead Details</h1>

        <div className="details-card">
          <p>
            <strong>Name:</strong> {lead.leadName}
          </p>

          <p>
            <strong>Company:</strong> {lead.companyName}
          </p>

          <p>
            <strong>Email:</strong> {lead.email}
          </p>

          <p>
            <strong>Phone:</strong> {lead.phoneNumber}
          </p>

          <p>
            <strong>Lead Source:</strong> {lead.leadSource}
          </p>

          <p>
            <strong>Salesperson:</strong>{" "}
            {lead.assignedSalesperson}
          </p>

          <p>
            <strong>Status:</strong> {lead.status}
          </p>

          <p>
            <strong>Deal Value:</strong> $
            {lead.estimatedDealValue}
          </p>
        </div>

        <div className="notes-section">
          <h2>Notes</h2>

          <div className="note-input">
            <textarea
              placeholder="Add note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button onClick={addNote}>Add Note</button>
          </div>

          {lead.notes.map((n, index) => (
            <div className="note-card" key={index}>
              <p>{n.content}</p>

              <small>
                By {n.createdBy} |{" "}
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LeadDetails;