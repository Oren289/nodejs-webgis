const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  lifespan: {
    type: Number,
  },
  ingredients: {
    type: Array,
    default: [],
  },
  image: {
    type: String,
  },
});

const Product = new mongoose.model("product", productSchema);

module.exports = Product;
