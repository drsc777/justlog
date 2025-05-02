const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  goal: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  completions: {
    type: [String], // Array of dates in ISO format
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Habit', HabitSchema); 