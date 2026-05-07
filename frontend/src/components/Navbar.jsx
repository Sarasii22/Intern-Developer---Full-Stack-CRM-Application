import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>CRM System</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/leads">Leads</Link>

        <Link to="/add-lead">Add Lead</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;