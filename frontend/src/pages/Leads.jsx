import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");

      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("Delete this lead?")) {
      await API.delete(`/leads/${id}`);

      fetchLeads();
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.leadName.toLowerCase().includes(search.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Leads</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>

            <option value="New">New</option>

            <option value="Qualified">Qualified</option>

            <option value="Won">Won</option>

            <option value="Lost">Lost</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
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

                <td>{lead.status}</td>

                <td>${lead.estimatedDealValue}</td>

                <td>
                  <Link to={`/lead/${lead._id}`}>
                    <button>View</button>
                  </Link>

                  <Link to={`/edit-lead/${lead._id}`}>
                    <button>Edit</button>
                  </Link>

                  <button onClick={() => deleteLead(lead._id)}>
                    Delete
                  </button>
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