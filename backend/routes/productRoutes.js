const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/addsample", async (req, res) => {
  try {
    const product = await Product.create({
      name: "Bajra Seeds",
      price: 500,
      category: "Grains",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500",
      rating: 4.8,
      stock: "In Stock",
      discount: "10% OFF",
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/addwheat", async (req, res) => {
  try {
    const product = await Product.create({
      name: "Wheat Seeds",
      price: 700,
      category: "Grains",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500",
      rating: 4.9,
      stock: "In Stock",
      discount: "15% OFF",
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument:"after",
        }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;