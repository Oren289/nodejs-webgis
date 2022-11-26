const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: String,
  username: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  total: Number,
  deliveryOption: String,
  timestamp: Date,
  paymentMethod: String,
  paymentStatus: String,
  productReadyStatus: Boolean,
  deliveredStatus: Boolean,
});

const Order = new mongoose.model("order", orderSchema);

module.exports = Order;
