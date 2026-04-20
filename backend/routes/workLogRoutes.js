const express = require('express');
const router = express.Router();
const WorkLog = require('../models/WorkLog');

// Submit a new work log
router.post('/', async (req, res) => {
  try {
    const newLog = new WorkLog(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all work logs
router.get('/', async (req, res) => {
  try {
    const logs = await WorkLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
