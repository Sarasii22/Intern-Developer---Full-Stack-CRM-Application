import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchLeads();
  }, []);

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

  return (
    <>
      <Navbar />

      <div className="page">
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