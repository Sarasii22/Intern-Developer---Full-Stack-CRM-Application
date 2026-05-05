import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0, new: 0, qualified: 0, won: 0, lost: 0,
    totalValue: 0, wonValue: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads', { withCredentials: true });
      const leads = res.data;

      const total = leads.length;
      const newLeads = leads.filter(l => l.status === 'New').length;
      const qualified = leads.filter(l => l.status === 'Qualified').length;
      const won = leads.filter(l => l.status === 'Won').length;
      const lost = leads.filter(l => l.status === 'Lost').length;

      const totalValue = leads.reduce((sum, l) => sum + (l.dealValue || 0), 0);
      const wonValue = leads.filter(l => l.status === 'Won')
                           .reduce((sum, l) => sum + (l.dealValue || 0), 0);

      setStats({ total, new: newLeads, qualified, won, lost, totalValue, wonValue });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3>Total Leads</h3>
          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="card">
          <h3>New Leads</h3>
          <p className="text-4xl font-bold mt-2 text-amber-600">{stats.new}</p>
        </div>
        <div className="card">
          <h3>Qualified</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-600">{stats.qualified}</p>
        </div>
        <div className="card">
          <h3>Won Deals</h3>
          <p className="text-4xl font-bold mt-2 text-green-600">{stats.won}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3>Total Pipeline Value</h3>
          <p className="text-4xl font-bold mt-2">₹{stats.totalValue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Won Value</h3>
          <p className="text-4xl font-bold mt-2 text-green-600">₹{stats.wonValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;