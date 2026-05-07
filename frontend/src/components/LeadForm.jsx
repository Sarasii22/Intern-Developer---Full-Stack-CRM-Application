function LeadForm({
  formData,
  handleChange,
  handleSubmit,
  buttonText,
}) {
  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <div className="form-grid">
        <input
          type="text"
          name="leadName"
          placeholder="Lead Name"
          value={formData.leadName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <select
          name="leadSource"
          value={formData.leadSource}
          onChange={handleChange}
        >
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Email">Cold Email</option>
          <option value="Facebook">Facebook</option>
          <option value="Event">Event</option>
        </select>

        <input
          type="text"
          name="assignedSalesperson"
          placeholder="Assigned Salesperson"
          value={formData.assignedSalesperson}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">
            Proposal Sent
          </option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input
          type="number"
          name="estimatedDealValue"
          placeholder="Estimated Deal Value"
          value={formData.estimatedDealValue}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="primary-btn">
        {buttonText}
      </button>
    </form>
  );
}

export default LeadForm;