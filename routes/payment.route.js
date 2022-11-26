const express = require("express");
const router = express.Router();

const User = require("../model/user");
const Cart = require("../model/cart");

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    try {
      const user = await User.findOne({ _id: req.session.userid });
      const cart = await Cart.findOne({ username: user.username });

      console.log(user);

      res.render("payment-page", {
        title: "Payment",
        layout: "layouts/main-nav-layout",
        sessionUser: req.session.user,
        cart,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
