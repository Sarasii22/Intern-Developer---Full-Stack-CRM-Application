import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [salespersonFilter, setSalespersonFilter] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (error) {
      alert("Failed to delete lead");
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (!newStatus) return;
    setUpdatingId(id);
    try {
      await API.put(`/leads/${id}`, { status: newStatus });
      fetchLeads();
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.leadName?.toLowerCase().includes(search.toLowerCase()) ||
      lead.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesSource = !sourceFilter || lead.leadSource === sourceFilter;
    const matchesSalesperson = !salespersonFilter || lead.assignedSalesperson === salespersonFilter;

    return matchesSearch && matchesStatus && matchesSource && matchesSalesperson;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page"><h1>Loading leads...</h1></div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>Leads Management</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by name, company, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Cold Email">Cold Email</option>
            <option value="Facebook">Facebook</option>
            <option value="Event">Event</option>
          </select>
          <select value={salespersonFilter} onChange={(e) => setSalespersonFilter(e.target.value)}>
            <option value="">All Salespeople</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </div>

        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Source</th>
              <th>Salesperson</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.leadName}</td>
                <td>{lead.companyName}</td>
                <td>{lead.email}</td>

                {/* Clean Status Dropdown */}
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                    disabled={updatingId === lead._id}
                    className="status-select"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                  {updatingId === lead._id && <span className="loading-text">Updating...</span>}
                </td>

                <td>
                  <span className={`priority priority-${lead.priority?.toLowerCase()}`}>
                    {lead.priority}
                  </span>
                </td>
                <td>{lead.leadSource}</td>
                <td>{lead.assignedSalesperson}</td>
                <td>${lead.estimatedDealValue}</td>
                <td>
                  <Link to={`/lead/${lead._id}`}><button className="action-btn">View</button></Link>
                  <Link to={`/edit-lead/${lead._id}`}><button className="action-btn">Edit</button></Link>
                  <button onClick={() => deleteLead(lead._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leads;