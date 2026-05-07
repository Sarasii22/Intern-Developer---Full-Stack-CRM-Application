const Lead = require("../models/Lead");

const getLeads = async (req, res) => {
  const leads = await Lead.find();

  res.json(leads);
};

const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);

  res.json(lead);
};

const updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(lead);
};

const deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);

  res.json({
    message: "Lead deleted",
  });
};

const getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  res.json(lead);
};

const addNote = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  lead.notes.push({
    content: req.body.content,
    createdBy: "Admin",
  });

  await lead.save();

  res.json(lead);
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
  addNote,
};