import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import '../styles/Kanban.css';

const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost"
];

function Kanban() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData("leadId", leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");

    try {
      await API.put(`/leads/${leadId}`, { status: newStatus });
      fetchLeads(); // Refresh board
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getLeadsByStatus = (status) => {
    return leads.filter(lead => lead.status === status);
  };

  if (loading) return <><Navbar /><div className="page"><h1>Loading Kanban Board...</h1></div></>;

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="kanban-header">
          <h1>Kanban Board</h1>
          <Link to="/leads">
            <button className="primary-btn">List View</button>
          </Link>
        </div>

        <div className="kanban-board">
          {statuses.map(status => (
            <div
              key={status}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="column-header">
                <h3>{status}</h3>
                <span className="count">{getLeadsByStatus(status).length}</span>
              </div>
              <div className="column-content">
                {getLeadsByStatus(status).map(lead => (
                  <div
                    key={lead._id}
                    className="kanban-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead._id)}
                  >
                    <h4>{lead.leadName}</h4>
                    <p className="company">{lead.companyName}</p>
                    <p className="value">${lead.estimatedDealValue}</p>
                    <div className="card-footer">
                      <span className={`priority priority-${lead.priority?.toLowerCase()}`}>
                        {lead.priority}
                      </span>
                      <Link to={`/lead/${lead._id}`} className="view-link">View</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Kanban;