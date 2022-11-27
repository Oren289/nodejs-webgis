const express = require("express");
const router = express.Router();

require("../utils/db");
const Order = require("../model/order");
const Admin = require("../model/admin");

router.get("/", async (req, res) => {
  const orders = await Order.find();
  if (!req.session.admin) {
    res.redirect("/admin-login");
  } else {
    res.render("admin-home-page", {
      title: "My Account",
      layout: "layouts/admin-nav-layout",
      sessionUser: req.session.admin,
      orders,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin-login");
    }
  });
});

router.get("/:id", async (req, res) => {
  const order = await Order.findOne({ id: req.params.id });
  if (!req.session.admin) {
    res.redirect("/admin-login");
  } else {
    res.render("admin-order-detail-page", {
      title: "Order Detail",
      layout: "layouts/admin-nav-layout",
      sessionUser: req.session.admin,
      order,
    });
  }
});

router.get("/change-payment-status/:username", async (req, res) => {
  if (!req.session.admin) {
    res.redirect("admin-login");
  } else {
    const order = await Order.findOne({ username: req.params.username });
    await Order.updateOne(
      { username: order.username },
      {
        $set: {
          paymentStatus: "payment confirmed",
        },
      }
    );
    res.redirect("/admin-home/" + order.id);
  }
});

module.exports = router;
