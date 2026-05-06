const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sale", saleSchema);