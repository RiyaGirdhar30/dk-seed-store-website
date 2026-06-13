const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create Order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          returnDocument: "after",
        }
      );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;