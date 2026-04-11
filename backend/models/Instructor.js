const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  instructorId: String,
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  email: String,
  preferredContact: String
});

module.exports = mongoose.model("Instructor", instructorSchema);