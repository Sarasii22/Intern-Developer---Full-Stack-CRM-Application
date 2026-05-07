import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const fetchLead = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/leads/${id}`);
      setLead(res.data);
    } catch (error) {
      console.error("Error fetching lead:", error);
      alert("Failed to fetch lead details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const addNote = async () => {
    if (!note.trim()) {
      alert("Please enter a note");
      return;
    }

    try {
      setAddingNote(true);
      await API.post(`/leads/${id}/notes`, { content: note.trim() });
      setNote("");
      fetchLead();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note");
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page">
          <h1>Loading lead details...</h1>
        </div>
      </>
    );
  }

  if (!lead) {
    return (
      <>
        <Navbar />
        <div className="page">
          <h1>Lead not found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Lead Details</h1>

        <div className="details-card">
          <p><strong>Name:</strong> {lead.leadName}</p>
          <p><strong>Company:</strong> {lead.companyName}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phoneNumber}</p>
          <p><strong>Lead Source:</strong> {lead.leadSource}</p>
          <p><strong>Salesperson:</strong> {lead.assignedSalesperson}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Priority:</strong> {lead.priority}</p>
          <p><strong>Deal Value:</strong> ${lead.estimatedDealValue}</p>
          <p><strong>Created:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(lead.updatedAt).toLocaleString()}</p>
        </div>

        <div className="notes-section">
          <h2>Notes</h2>

          <div className="note-input">
            <textarea
              placeholder="Add a new note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={addingNote}
            />
            <button onClick={addNote} disabled={addingNote}>
              {addingNote ? "Adding..." : "Add Note"}
            </button>
          </div>

          {lead.notes && lead.notes.length > 0 ? (
            lead.notes.map((n, index) => (
              <div className="note-card" key={index}>
                <p>{n.content}</p>
                <small>
                  By {n.createdBy} | {new Date(n.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p>No notes yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LeadDetails;