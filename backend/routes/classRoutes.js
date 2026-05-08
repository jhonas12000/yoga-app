const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

const generateClassId = async () => {
  const lastClass = await Class.findOne().sort({ classId: -1 });
  if (lastClass) {
    const lastId = parseInt(lastClass.classId.substring(1));
    return "C" + String(lastId + 1).padStart(3, "0");
  } else {
    return "C001";
  }
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

// Delete class
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get class by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const yogaClass = await Class.findById(id);
    if (!yogaClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(yogaClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update class
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedClass = await Class.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class updated successfully", class: updatedClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;