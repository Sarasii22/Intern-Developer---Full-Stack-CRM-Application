import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', source: '', search: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      let url = 'http://localhost:5000/api/leads?';
      if (filters.status) url += `status=${filters.status}&`;
      if (filters.source) url += `source=${filters.source}&`;
      if (filters.search) url += `search=${filters.search}`;

      const res = await axios.get(url, { withCredentials: true });
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`, { withCredentials: true });
      fetchLeads();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const getStatusClass = (status) => {
    return `status status-${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Leads</h1>
        <Link to="/leads/new" className="btn btn-primary">+ New Lead</Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by name, company, email..."
              className="form-control"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div>
            <select className="form-control" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <select className="form-control" value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value })}>
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Cold Email">Cold Email</option>
              <option value="Event">Event</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button onClick={() => setFilters({ status: '', source: '', search: '' })} className="btn btn-danger">
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th>Deal Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id}>
                <td><Link to={`/leads/${lead._id}`} style={{color: '#1e40af', textDecoration: 'none'}}>{lead.name}</Link></td>
                <td>{lead.company}</td>
                <td>{lead.email}</td>
                <td><span className={getStatusClass(lead.status)}>{lead.status}</span></td>
                <td>₹{lead.dealValue ? lead.dealValue.toLocaleString() : '0'}</td>
                <td>
                  <Link to={`/leads/${lead._id}`} className="btn btn-primary btn-sm">View</Link>
                  <button onClick={() => deleteLead(lead._id)} className="btn btn-danger btn-sm ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {leads.length === 0 && !loading && <p className="text-center py-10">No leads found.</p>}
    </div>
  );
};

export default Leads;