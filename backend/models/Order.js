const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        name: String,
        price: Number,
      },
    ],

    userEmail: {
  type: String,
  required: true,
},

    totalPrice: Number,

    status: {
      type: String,
      default: "Pending",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);