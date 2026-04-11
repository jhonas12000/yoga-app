const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Generate Customer ID
const generateCustomerId = async () => {
  const count = await Customer.countDocuments();
  return "C" + String(count + 1).padStart(3, "0");
};

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Customer API
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, address, phone, email, preferredContact } = req.body;

    // Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Duplicate check
    const existing = await Customer.findOne({ firstName, lastName });
    if (existing) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const customerId = await generateCustomerId();

    const customer = new Customer({
      customerId,
      firstName,
      lastName,
      address,
      phone,
      email,
      preferredContact,
      classBalance: 0
    });

    await customer.save();

    res.json({
      message: `Customer added successfully. ID: ${customerId}`,
      customer
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;