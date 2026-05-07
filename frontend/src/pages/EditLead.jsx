import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import API from "../services/api";

function EditLead() {
  const { id } = useParams();

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

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const res = await API.get(`/leads/${id}`);

      setFormData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/leads/${id}`, formData);

      alert("Lead Updated");

      navigate("/leads");
    } catch (error) {
      console.log(error);
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
        />
      </div>
    </>
  );
}

export default EditLead;