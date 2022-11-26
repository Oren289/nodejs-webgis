const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

const User = require("../model/user");
const Cart = require("../model/cart");
const Order = require("../model/order");

router.use(methodOverride("_method"));

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const user = await User.findOne({ _id: req.session.userid });
    const carts = await Cart.findOne({ username: user.username });

    res.render("cart-page", {
      title: "My Cart",
      layout: "layouts/main-nav-layout",
      sessionUser: req.session.user,
      carts,
    });
  }
});

router.post("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    try {
      const user = await User.findOne({ _id: req.session.userid });
      const checkDuplicate = await Cart.findOne({ username: user.username, "products.id": req.body.product_id });

      console.log(req.session.userid);
      if (checkDuplicate) {
        const query = {
          $inc: {
            "products.$.quantity": req.body.quantity,
            grandTotal: parseInt(req.body.price) * parseInt(req.body.quantity),
          },
        };
        await Cart.updateOne({ username: user.username, "products.id": req.body.product_id }, query);
      } else {
        console.log(checkDuplicate);
        const query = {
          $push: {
            products: {
              id: req.body.product_id,
              name: req.body.name,
              price: req.body.price,
              image: req.body.image,
              quantity: req.body.quantity,
            },
          },
        };
        await Cart.updateMany({ username: user.username }, query);
        await Cart.updateMany(
          { username: user.username },
          {
            $inc: {
              grandTotal: parseInt(req.body.price) * parseInt(req.body.quantity),
            },
          }
        );
      }

      const carts = await Cart.findOne({ username: user.username });
      console.log(carts);
      res.render("cart-page", {
        title: "My Cart",
        layout: "layouts/main-nav-layout",
        sessionUser: req.session.user,
        carts,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/delete", async (req, res) => {
  const user = await User.findOne({ _id: req.session.userid });
  try {
    await Cart.updateMany({ username: user.username }, { $pull: { products: { id: req.body.product_id } } });
    await Cart.updateOne(
      { username: user.username },
      {
        $inc: {
          grandTotal: -(parseInt(req.body.price) * parseInt(req.body.quantity)),
        },
      }
    );
    console.log(user.username);
    console.log(req.body.product_id);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
