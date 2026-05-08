const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// GET all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST sale
router.post("/", async (req, res) => {
  try {
    const { customerId, amount } = req.body;

    if (!customerId || !amount) {
      return res.status(400).json({
        message: "Customer and amount are required"
      });
    }

    const sale = new Sale({
      customerId,
      amount
    });

    await sale.save();

    res.json({
      message: "Sale recorded successfully",
      sale
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Delete sale record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Sale.findByIdAndDelete(id);
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;