import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import EditLead from "./pages/EditLead";
import LeadDetails from "./pages/LeadDetail";
import Kanban from "./pages/Kanban";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-lead"
            element={
              <ProtectedRoute>
                <AddLead />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-lead/:id"
            element={
              <ProtectedRoute>
                <EditLead />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lead/:id"
            element={
              <ProtectedRoute>
                <LeadDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <Kanban />
              </ProtectedRoute>
            }
          />
        </Routes>

        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;