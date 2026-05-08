const express = require("express");
const router = express.Router();
const Instructor = require("../models/Instructor");

// Generate Instructor ID
const generateInstructorId = async () => {
  const count = await Instructor.countDocuments();
  return "I" + String(count + 1).padStart(3, "0");
};

// 1️⃣ GET (fetch data)
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Instructor API
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, address, phone, email, preferredContact } = req.body;

    // Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Duplicate check
    const existing = await Instructor.findOne({ firstName, lastName });
    if (existing) {
      return res.status(400).json({ message: "Instructor already exists" });
    }

    const instructorId = await generateInstructorId();

    const instructor = new Instructor({
      instructorId,
      firstName,
      lastName,
      address,
      phone,
      email,
      preferredContact
    });

    await instructor.save();

    res.json({
      message: `Instructor added successfully. ID: ${instructorId}`,
      instructor
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get instructor by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update instructor
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json({ message: "Instructor updated successfully", instructor: updatedInstructor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete instructor
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Instructor.findByIdAndDelete(id);
    res.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;