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

router.post("/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    try {
      const order = await Order.findOne({ id: req.params.id });
      console.log(order.paymentStatus);
      await Order.updateOne(
        { id: order.id },
        {
          $set: {
            paymentStatus: "requesting confirmation",
            accountNumber: req.body.accountNumber,
            accountName: req.body.accountName,
          },
        }
      );
      res.redirect("/orders");
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
