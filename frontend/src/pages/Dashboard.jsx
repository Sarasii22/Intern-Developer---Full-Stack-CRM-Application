import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    newLeads: 0,
    qualified: 0,
    won: 0,
    lost: 0,
    totalValue: 0,
    wonValue: 0,
  });

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");

      const leads = res.data;

      setStats({
        total: leads.length,

        newLeads: leads.filter((l) => l.status === "New").length,

        qualified: leads.filter((l) => l.status === "Qualified").length,

        won: leads.filter((l) => l.status === "Won").length,

        lost: leads.filter((l) => l.status === "Lost").length,

        totalValue: leads.reduce(
          (sum, l) => sum + Number(l.estimatedDealValue || 0),
          0
        ),

        wonValue: leads
          .filter((l) => l.status === "Won")
          .reduce(
            (sum, l) => sum + Number(l.estimatedDealValue || 0),
            0
          ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

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
      </div>
    </>
  );
}

export default Dashboard;