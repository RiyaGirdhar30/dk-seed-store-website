const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");

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

// Dashboard Stats
router.get("/dashboard", async (req, res) => {
  try {

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        status: "Pending",
      });

      const shippedOrders =
  await Order.countDocuments({
    status: "Shipped",
  });

const deliveredOrders =
  await Order.countDocuments({
    status: "Delivered",
  });

    const orders =
      await Order.find();

    const totalRevenue =
      orders.reduce(
        (sum, order) =>
          sum + order.totalPrice,
        0
      );

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;