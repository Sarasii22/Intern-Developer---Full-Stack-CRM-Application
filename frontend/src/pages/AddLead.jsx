import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import API from "../services/api";

function AddLead() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    leadSource: "Website",
    assignedSalesperson: "",
    status: "New",
    priority: "Medium",
    estimatedDealValue: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await API.post("/leads", formData);
      alert("✅ Lead Added Successfully!");
      navigate("/leads");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add lead. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>Add New Lead</h1>
        <LeadForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Add Lead"
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default AddLead;