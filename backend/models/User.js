const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobilePrefix: { type: String },
  mobileNumber: { type: String },
  password: { type: String, required: true },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
