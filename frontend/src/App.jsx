import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Navbar from './components/Navbar';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const hasToken = document.cookie.includes('token');
      setIsAuth(hasToken);
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuth && <Navbar setIsAuth={setIsAuth} />}
        
        <Routes>
          <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to="/" />} />
          <Route path="/" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/leads" element={isAuth ? <Leads /> : <Navigate to="/login" />} />
          <Route path="/leads/:id" element={isAuth ? <LeadDetail /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;