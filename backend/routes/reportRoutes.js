const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
const Sale = require("../models/Sale");

// GET reports summary
router.get("/", async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    const sales = await Sale.find();

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.json({
      totalCustomers,
      totalClasses,
      totalAttendance,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;