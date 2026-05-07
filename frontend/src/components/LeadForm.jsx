import '../styles/LeadForm.css';

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
        
        <div className="form-group">
          <label>Lead Name</label>
          <input
            type="text"
            name="leadName"
            placeholder="Enter lead name"
            value={formData.leadName || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={formData.companyName || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@company.com"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="0771234567"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            required
            pattern="[0-9+\s-]{8,15}"
            title="Please enter a valid phone number"
          />
        </div>

        <div className="form-group">
          <label>Lead Source</label>
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
        </div>

        <div className="form-group">
          <label>Assigned Salesperson</label>
          <select 
            name="assignedSalesperson" 
            value={formData.assignedSalesperson || "Unassigned"} 
            onChange={handleChange}
          >
            <option value="Unassigned">Unassigned</option>
            <option value="John">John</option>
            <option value="Emily">Emily</option>
            <option value="David">David</option>
            <option value="Michael">Michael</option>
            <option value="Priya">Priya</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
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
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select 
            name="priority" 
            value={formData.priority || "Medium"} 
            onChange={handleChange}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estimated Deal Value (LKR)</label>
          <input
            type="number"
            name="estimatedDealValue"
            placeholder="0"
            value={formData.estimatedDealValue || ""}
            onChange={handleChange}
            min="0"
          />
        </div>

      </div>

      <button type="submit" className="primary-btn" disabled={isLoading}>
        {isLoading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}

export default LeadForm;