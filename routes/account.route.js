const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const moment = require("moment");
const bcrypt = require("bcrypt");

require("../utils/db");
const User = require("../model/user");

router.use(methodOverride("_method"));

router.get("/", async (req, res) => {
  if (req.session.user) {
    const user = await User.findOne({ _id: req.session.userid });
    res.render("account-page", {
      title: "My Account",
      layout: "layouts/main-nav-layout",
      sessionUser: req.session.user.split(" ")[0],
      user,
      msg: req.flash("msg"),
      errors: [],
    });
  } else {
    res.redirect("/login");
  }
});

router.put(
  "/",
  [
    check("email", "Email is invalid!").isEmail(),
    body("email").custom(async (value, { req }) => {
      const duplikat = await User.findOne({ email: value });
      if (value !== req.body.oldemail && duplikat) {
        throw new Error("Email is already used!");
      }
      return true;
    }),
    check("dateofbirth", "Please enter the correct date format!").isDate(),
    check("phone", "Invalid phone number!").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const user = await User.findOne({ _id: req.session.userid });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body.dateofbirth);
      res.render("account-page", {
        title: "My Account",
        layout: "layouts/main-nav-layout",
        sessionUser: req.session.user.split(" ")[0],
        user,
        oldemail: req.body.oldemail,
        msg: "",
        errors: errors.array(),
      });
      console.log(errors);
    } else {
      try {
        await User.updateOne(
          { _id: req.session.userid },
          {
            $set: {
              nama: req.body.name,
              email: req.body.email,
              dateofbirth: req.body.dateofbirth,
              phone: req.body.phone,
            },
          }
        );
        req.flash("msg", "Account successfully updated!");
        res.redirect("/myaccount");
      } catch (error) {
        console.log(error);
      }
    }
  }
);

router.put("/edit-address", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.session.userid },
      {
        $set: {
          address: req.body.address,
        },
      }
    );
    req.flash("msg", "Address successfully updated!");
    res.redirect("/myaccount");
  } catch (error) {
    console.log(error);
  }
});

router.put(
  "/change-password",
  [
    check("password", "Password must be at least 8 characters long!").isLength({ min: 8 }),
    body("confirm-password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password doesn't match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const user = await User.findOne({ _id: req.session.userid });

      res.render("account-page", {
        title: "My Account",
        layout: "layouts/main-nav-layout",
        sessionUser: req.session.user.split(" ")[0],
        user,
        msg: "",
        errors: errors.array(),
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.updateOne(
          { _id: req.session.userid },
          {
            $set: {
              password: hashedPassword,
            },
          }
        );
        req.flash("msg", "Password successfully updated!");
        res.redirect("/myaccount");
      } catch (error) {
        console.log(error);
      }
    }
  }
);

module.exports = router;
