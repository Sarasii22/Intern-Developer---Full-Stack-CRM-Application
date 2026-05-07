import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import API from "../services/api";

function AddLead() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    leadSource: "",
    assignedSalesperson: "",
    status: "New",
    estimatedDealValue: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/leads", formData);

      alert("Lead Added");

      navigate("/leads");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Add Lead</h1>

        <LeadForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Add Lead"
        />
      </div>
    </>
  );
}

export default AddLead;