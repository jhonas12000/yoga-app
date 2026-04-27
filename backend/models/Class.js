const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  instructorId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Class", classSchema);