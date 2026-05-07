const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const leadSchema = new mongoose.Schema(
  {
    leadName: String,
    companyName: String,
    email: String,
    phoneNumber: String,
    leadSource: String,
    assignedSalesperson: String,
    status: String,
    estimatedDealValue: Number,

    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);