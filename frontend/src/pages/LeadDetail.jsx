import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [lead, setLead] = useState({
    name: '', company: '', email: '', phone: '', source: 'Website',
    assignedTo: 'Admin', status: 'New', dealValue: 0
  });
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (!isNew) fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leads/${id}`, { withCredentials: true });
      setLead(res.data);
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await axios.post('http://localhost:5000/api/leads', lead, { withCredentials: true });
      } else {
        await axios.put(`http://localhost:5000/api/leads/${id}`, lead, { withCredentials: true });
      }
      navigate('/leads');
    } catch (err) {
      alert('Failed to save lead');
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/leads/${id}/notes`, 
        { content: newNote }, 
        { withCredentials: true }
      );
      setNotes(res.data.notes);
      setNewNote('');
    } catch (err) {
      alert('Failed to add note');
    }
  };

  return (
    <div className="container py-8">
      <button onClick={() => navigate('/leads')} className="mb-6 text-blue-600">← Back to Leads</button>

      <h1 className="text-3xl font-bold mb-8">{isNew ? 'Create New Lead' : 'Lead Details'}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lead Form */}
        <div className="lg:col-span-2 card">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Lead Name</label>
                <input type="text" className="form-control" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" className="form-control" value={lead.company} onChange={e => setLead({...lead, company: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={lead.email} onChange={e => setLead({...lead, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" value={lead.phone} onChange={e => setLead({...lead, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Source</label>
                <select className="form-control" value={lead.source} onChange={e => setLead({...lead, source: e.target.value})}>
                  <option>Website</option>
                  <option>LinkedIn</option>
                  <option>Referral</option>
                  <option>Cold Email</option>
                  <option>Event</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-control" value={lead.status} onChange={e => setLead({...lead, status: e.target.value})}>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Proposal Sent</option>
                  <option>Won</option>
                  <option>Lost</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assigned To</label>
                <input type="text" className="form-control" value={lead.assignedTo} onChange={e => setLead({...lead, assignedTo: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Estimated Deal Value (₹)</label>
                <input type="number" className="form-control" value={lead.dealValue} onChange={e => setLead({...lead, dealValue: Number(e.target.value)})} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-6 w-full">
              {isNew ? 'Create Lead' : 'Update Lead'}
            </button>
          </form>
        </div>

        {/* Notes Section */}
        {!isNew && (
          <div className="card">
            <h3>Notes</h3>
            <div className="mt-4">
              <textarea
                className="form-control"
                rows="3"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
              />
              <button onClick={addNote} className="btn btn-primary mt-2">Add Note</button>
            </div>

            <div className="mt-6 space-y-4 max-h-96 overflow-auto">
              {notes.map((note, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-2 bg-gray-50">
                  <p>{note.content}</p>
                  <small className="text-gray-500">
                    {new Date(note.createdAt).toLocaleString()} by {note.createdBy}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDetail;