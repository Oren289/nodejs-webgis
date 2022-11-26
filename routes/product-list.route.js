const express = require("express");
const router = express.Router();

require("../utils/db");
const User = require("../model/user");
const Product = require("../model/product");

router.get("/", async (req, res) => {
  // const string = "A banana cake is a cake prepared using banana as a primary ingredient and typical cake ingredients. It can be prepared in various manners, including as a layer cake, as muffins and as cupcakes.";
  // const query = {
  //   product_name: "Nastar",
  //   description: "A banana cake is a cake prepared using banana as a primary ingredient and typical cake ingredients. It can be prepared in various manners, including as a layer cake, as muffins and as cupcakes.",
  //   short_description: string.substring(0, 50) + "...",
  //   price: "70.000",
  //   category: "kue kering",
  //   lifespan: 180,
  //   ingredients: ["banana", "egg", "tapioca", "sugar"],
  //   image: "bolupisang.jpg",
  // };

  // await Product.insertMany(query);

  const products = await Product.find();

  res.render("product-list-page", {
    title: "Products",
    layout: "layouts/main-nav-layout",
    activeProduct: "active",
    sessionUser: req.session.user,
    products,
  });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  const recommendation = await Product.find({ category: product.category });
  if (!product) {
    res.redirect("/products");
  } else {
    res.render("product-detail-page", {
      title: "Product Detail",
      layout: "layouts/main-nav-layout",
      activeProduct: "active",
      sessionUser: req.session.user,
      product,
      recommendation,
    });
  }
});

module.exports = router;
