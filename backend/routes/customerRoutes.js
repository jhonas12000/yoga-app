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
    const errors = {};

    // Required fields
    if (!firstName || !firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName || !lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!address || !address.trim()) {
      errors.address = "Address is required";
    }
    if (!phone || !phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone.trim())) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Invalid email format";
    }

    // Return errors if any validation fails
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // Duplicate check
    const existing = await Customer.findOne({ firstName: firstName.trim(), lastName: lastName.trim() });
    if (existing) {
      return res.status(400).json({ message: "Customer with this name already exists" });
    }

    const customerId = await generateCustomerId();

    const customer = new Customer({
      customerId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
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
    const { firstName, lastName, address, phone, email, preferredContact } = req.body;

    // Validation
    const errors = {};

    // Required fields
    if (!firstName || !firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName || !lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!address || !address.trim()) {
      errors.address = "Address is required";
    }
    if (!phone || !phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone.trim())) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Invalid email format";
    }

    // Return errors if any validation fails
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const updates = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      preferredContact
    };

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