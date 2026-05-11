const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  instructorId: {
    type: String,
    required: true,
    unique: true
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },

  address: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },

  preferredContact: {
    type: String,
    required: true,
    enum: ["Phone", "Email"]
  }
});

module.exports = mongoose.model("Instructor", instructorSchema);