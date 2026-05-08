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

// Get customer by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update customer
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete customer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;