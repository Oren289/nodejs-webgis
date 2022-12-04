const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

require("../utils/db");
const User = require("../model/user");
const Cart = require("../model/cart");
const Order = require("../model/order");

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const user = await User.findOne({ _id: req.session.userid });
    const cart = await Cart.findOne({ username: user.username });

    if (cart.products.length === 0) {
      res.redirect("/products");
    } else if (user.phone === undefined || user.address === undefined) {
      req.flash("msg", "Please complete your phone and address before continue to payment.");
      res.redirect("/myaccount");
    } else {
      try {
        const user = await User.findOne({ _id: req.session.userid });
        const cart = await Cart.findOne({ username: user.username });

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
  }
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ _id: req.session.userid });
  const cart = await Cart.findOne({ username: user.username });
  const newId = uuidv4();
  try {
    const query = {
      id: newId,
      username: user.username,
      products: cart.products,
      total: cart.products.length,
      userinfo: [],
      deliveryOption: req.body.deliveryOption,
      timestamp: new Date(),
      paymentMethod: req.body.payment_method,
      paymentStatus: "unpaid",
      productReadyStatus: false,
      deliveredStatus: false,
      grandTotal: cart.grandTotal,
    };

    await Order.insertMany(query);
    const order = await Order.findOne({ username: user.username, id: newId });

    console.log(order);

    await Order.updateOne(
      { username: user.username, id: order.id },
      {
        $push: {
          userinfo: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
          },
        },
      }
    );

    await Cart.updateOne(
      { username: user.username },
      {
        $set: {
          products: [],
          grandTotal: 0,
        },
      }
    );
    res.render("payment-success-page", {
      title: "Transfer Payment",
      layout: "layouts/main-nav-layout",
      paymentMethod: req.body.payment_method,
      sessionUser: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
