const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
  addNote,
} = require("../controllers/leadController");

router.get("/", protect, getLeads);

router.post("/", protect, createLead);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

router.get("/:id", protect, getLeadById);

router.post("/:id/notes", protect, addNote);

module.exports = router;