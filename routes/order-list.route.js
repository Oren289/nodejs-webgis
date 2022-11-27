const express = require("express");
const router = express.Router();

require("../utils/db");
const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const user = await User.findOne({ _id: req.session.userid });
    const orders = await Order.find({ username: user.username });

    res.render("order-list-page", {
      title: "My Orders",
      layout: "layouts/main-nav-layout",
      sessionUser: req.session.user,
      orders,
    });
  }
});

module.exports = router;
