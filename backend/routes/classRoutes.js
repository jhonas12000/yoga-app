const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

const generateClassId = async () => {
  const count = await Class.countDocuments();
  return "C" + String(count + 1).padStart(3, "0");
};

router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, instructorId, date, capacity } = req.body;

    if (!title || !instructorId || !date || !capacity) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const classId = await generateClassId();

    const newClass = new Class({
      classId,
      title,
      instructorId,
      date,
      capacity
    });

    await newClass.save();

    res.json({
      message: `Class added successfully. ID: ${classId}`,
      newClass
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;