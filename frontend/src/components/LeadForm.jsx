function LeadForm({ formData, handleChange, handleSubmit, buttonText }) {
  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <input
        type="text"
        name="leadName"
        placeholder="Lead Name"
        value={formData.leadName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />

      <input
        type="text"
        name="leadSource"
        placeholder="Lead Source"
        value={formData.leadSource}
        onChange={handleChange}
      />

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
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <input
        type="number"
        name="estimatedDealValue"
        placeholder="Deal Value"
        value={formData.estimatedDealValue}
        onChange={handleChange}
      />

      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default LeadForm;