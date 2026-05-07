function LeadForm({
  formData,
  handleChange,
  handleSubmit,
  buttonText,
  isLoading = false,
}) {
  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <div className="form-grid">
        <input
          type="text"
          name="leadName"
          placeholder="Lead Name"
          value={formData.leadName || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName || ""}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />

        {/* Improved Phone Number */}
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number (e.g. 0771234567)"
          value={formData.phoneNumber || ""}
          onChange={handleChange}
          required
          pattern="[0-9+\s-]{8,15}"   // Basic validation for phone
          title="Please enter a valid phone number"
        />

        <select 
          name="leadSource" 
          value={formData.leadSource || "Website"} 
          onChange={handleChange}
        >
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Email">Cold Email</option>
          <option value="Facebook">Facebook</option>
          <option value="Event">Event</option>
        </select>

        {/* Improved Assigned Salesperson */}
        <select 
          name="assignedSalesperson" 
          value={formData.assignedSalesperson || "Unassigned"} 
          onChange={handleChange}
        >
          <option value="Unassigned">Unassigned</option>
          <option value="Sarasi">Sarasi</option>
          <option value="John">John</option>
          <option value="Emily">Emily</option>
          <option value="David">David</option>
          <option value="Michael">Michael</option>
          <option value="Priya">Priya</option>
        </select>

        <select 
          name="status" 
          value={formData.status || "New"} 
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <select 
          name="priority" 
          value={formData.priority || "Medium"} 
          onChange={handleChange}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input
          type="number"
          name="estimatedDealValue"
          placeholder="Estimated Deal Value (LKR)"
          value={formData.estimatedDealValue || ""}
          onChange={handleChange}
          min="0"
        />
      </div>

      <button type="submit" className="primary-btn" disabled={isLoading}>
        {isLoading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}

export default LeadForm;