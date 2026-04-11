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

module.exports = router;