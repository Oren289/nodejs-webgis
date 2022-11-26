const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  products: [
    {
      id: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
  grandTotal: {
    type: Number,
  },
});

const Cart = new mongoose.model("cart", cartSchema);

module.exports = Cart;
