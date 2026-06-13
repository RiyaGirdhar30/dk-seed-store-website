const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes =
  require("./routes/productRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

dotenv.config();

connectDB();

const app = express();

const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("DK Seed Store Backend Running 🚀");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});