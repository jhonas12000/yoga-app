const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// GET all attendance
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST attendance
router.post("/", async (req, res) => {
  try {
    const { customerId, classId } = req.body;

    if (!customerId || !classId) {
      return res.status(400).json({
        message: "Customer ID and Class ID are required"
      });
    }

    // Check duplicate (same customer + class)
    const existing = await Attendance.findOne({
      customerId,
      classId
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already recorded for this customer and class"
      });
    }

    const attendance = new Attendance({
      customerId,
      classId
    });

    await attendance.save();

    res.json({
      message: "Attendance recorded successfully",
      attendance
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Attendance.findByIdAndDelete(id);

    res.json({ message: "Attendance deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;