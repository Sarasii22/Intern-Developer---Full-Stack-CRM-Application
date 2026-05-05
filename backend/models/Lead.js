const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  source: { type: String, enum: ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event', 'Other'] },
  assignedTo: String,
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
    default: 'New' 
  },
  dealValue: Number,
  notes: [noteSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);