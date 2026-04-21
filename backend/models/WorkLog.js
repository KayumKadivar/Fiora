const mongoose = require('mongoose');

const workLogSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, enum: ['Good', 'Medium', 'Bad'], required: true },
  remarks: { type: String },
  nextFollowUpDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('WorkLog', workLogSchema);
