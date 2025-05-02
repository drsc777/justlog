const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  points: {
    type: Number,
    default: 0
  },
  badges: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema); 