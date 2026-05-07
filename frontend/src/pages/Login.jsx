import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Branding / Illustration */}
        <div className="login-left">
          <div className="brand-content">
            <h1 className="brand-title">CRM Pro</h1>
            <p className="brand-subtitle">
              Streamline your sales pipeline.<br />
              Close more deals.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="form-box">
            <h2>Welcome Back</h2>
            <p className="form-subtitle">Sign in to access your dashboard</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;