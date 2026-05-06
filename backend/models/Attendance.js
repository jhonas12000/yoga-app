const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },
  classId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);