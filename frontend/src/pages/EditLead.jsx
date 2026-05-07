import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import API from "../services/api";

function EditLead() {
  const { id } = useParams();
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

  const fetchLead = async () => {
    try {
      const res = await API.get(`/leads/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load lead");
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await API.put(`/leads/${id}`, formData);
      alert("Lead Updated Successfully!");
      navigate("/leads");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>Edit Lead</h1>
        <LeadForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Update Lead"
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default EditLead;