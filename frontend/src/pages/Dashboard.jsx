import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    newLeads: 0,
    contacted: 0,
    qualified: 0,
    proposalSent: 0,
    won: 0,
    lost: 0,
    totalValue: 0,
    wonValue: 0,
    openValue: 0,
  });

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");

      const leads = res.data;

      const totalValue = leads.reduce(
        (sum, l) => sum + Number(l.estimatedDealValue || 0),
        0
      );

      const wonValue = leads
        .filter((l) => l.status === "Won")
        .reduce((sum, l) => sum + Number(l.estimatedDealValue || 0), 0);

      setStats({
        total: leads.length,
        newLeads: leads.filter((l) => l.status === "New").length,
        contacted: leads.filter((l) => l.status === "Contacted").length,
        qualified: leads.filter((l) => l.status === "Qualified").length,
        proposalSent: leads.filter((l) => l.status === "Proposal Sent").length,
        won: leads.filter((l) => l.status === "Won").length,
        lost: leads.filter((l) => l.status === "Lost").length,
        totalValue,
        wonValue,
        openValue: totalValue - wonValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const getPercent = (count) => {
    return stats.total ? Math.round((count / stats.total) * 100) : 0;
  };

  const getValuePercent = (value) => {
    return stats.totalValue ? Math.round((value / stats.totalValue) * 100) : 0;
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Sales intelligence built for your team</p>
            <h1>Move leads forward with clarity and confidence.</h1>
            <p className="hero-text">
              Analyze pipeline health, prioritize top opportunities, and stay on top of every customer conversation from one beautiful CRM dashboard.
            </p>
          </div>

          <div className="hero-actions">
            <button className="hero-button" onClick={() => navigate("/leads")}>View Leads</button>
            <button className="hero-secondary" onClick={() => navigate("/add-lead")}>Add New Lead</button>
          </div>
        </section>

        <h1>Dashboard</h1>

        <div className="dashboard-grid">
          <div className="card">
            <h3>Total Leads</h3>
            <p>{stats.total}</p>
          </div>

          <div className="card">
            <h3>New Leads</h3>
            <p>{stats.newLeads}</p>
          </div>

          <div className="card">
            <h3>Qualified Leads</h3>
            <p>{stats.qualified}</p>
          </div>

          <div className="card">
            <h3>Won Leads</h3>
            <p>{stats.won}</p>
          </div>

          <div className="card">
            <h3>Lost Leads</h3>
            <p>{stats.lost}</p>
          </div>

          <div className="card">
            <h3>Total Deal Value</h3>
            <p>${stats.totalValue}</p>
          </div>

          <div className="card">
            <h3>Won Deal Value</h3>
            <p>${stats.wonValue}</p>
          </div>
        </div>

        <section className="dashboard-visuals">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Pipeline Distribution</h3>
              <span>{stats.total} leads</span>
            </div>
            <div className="status-chart">
              {[
                { label: "New       - ", count: stats.newLeads, color: "new" },
                { label: "Contacted - ", count: stats.contacted, color: "contacted" },
                { label: "Qualified - ", count: stats.qualified, color: "qualified" },
                { label: "Proposal  - ", count: stats.proposalSent, color: "proposal" },
                { label: "Won       - ", count: stats.won, color: "won" },
                { label: "Lost      - ", count: stats.lost, color: "lost" },
              ].map((item) => (
                <div className="status-row" key={item.label}>
                  <div className="status-label">
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <div className="status-bar">
                    <div
                      className={`status-fill ${item.color}`}
                      style={{ width: `${getPercent(item.count)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Deal Value Breakdown</h3>
              <span>${stats.totalValue.toLocaleString()}</span>
            </div>
            <div className="value-chart">
              <div className="value-row">
                <span>Won value</span>
                <strong>${stats.wonValue.toLocaleString()}</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill won"
                  style={{ width: `${getValuePercent(stats.wonValue)}%` }}
                />
              </div>
              <div className="value-row">
                <span>Open pipeline</span>
                <strong>${stats.openValue.toLocaleString()}</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill open"
                  style={{ width: `${getValuePercent(stats.openValue)}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;