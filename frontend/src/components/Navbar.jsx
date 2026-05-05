import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setIsAuth(false);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">CRM Leads</h1>
          <div>
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/leads" className="nav-link">Leads</Link>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;