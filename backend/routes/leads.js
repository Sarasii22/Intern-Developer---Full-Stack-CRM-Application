const express = require('express');
const Lead = require('../models/Lead');
const protect = require('../middleware/auth');
const router = express.Router();

router.use(protect); // Protect all lead routes

// Get all leads with filters
router.get('/', async (req, res) => {
  const { status, source, assignedTo, search } = req.query;
  let query = {};

  if (status) query.status = status;
  if (source) query.source = source;
  if (assignedTo) query.assignedTo = assignedTo;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 });
  res.json(leads);
});

// Create lead
router.post('/', async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.status(201).json(lead);
});

// Get single lead
router.get('/:id', async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
});

// Update lead
router.put('/:id', async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
  res.json(lead);
});

// Delete lead
router.delete('/:id', async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lead deleted' });
});

// Add note
router.post('/:id/notes', async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  lead.notes.push({ ...req.body, createdBy: 'Admin' }); // You can get real user later
  await lead.save();
  res.json(lead);
});

module.exports = router;