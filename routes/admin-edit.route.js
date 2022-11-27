const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

router.use(methodOverride("_method"));

require("../utils/db");
const Order = require("../model/order");
const Admin = require("../model/admin");

router.get("/:id", async (req, res) => {
  if (!req.session.admin) {
    res.redirect("/admin-login");
  } else {
    const order = await Order.findOne({ id: req.params.id });

    res.render("admin-edit-order-page", {
      title: "Edit Status Order",
      layout: "layouts/admin-nav-layout",
      sessionUser: req.session.admin,
      order,
    });
  }
});

router.put("/", async (req, res) => {
  if (!req.session.admin) {
    res.redirect("/admin-login");
  } else {
    await Order.updateMany(
      { id: req.body.id },
      {
        $set: {
          productReadyStatus: req.body.productReadyStatus,
          deliveredStatus: req.body.deliveredStatus,
        },
      }
    );
    res.redirect("/admin-home");
  }
});

module.exports = router;
