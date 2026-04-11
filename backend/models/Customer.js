const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: String,
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  email: String,
  preferredContact: String,
  classBalance: { type: Number, default: 0 }
});

module.exports = mongoose.model("Customer", customerSchema);