const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { body, validationResult, check } = require("express-validator");

require("./utils/db");
const User = require("./model/user");

router.post("/login", [check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters!")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("login-page", {
      title: "Login",
      layout: "layouts/main-layout",
      errors: errors.array(),
      prevData: req.body,
    });
  } else {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });

      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        req.session.user = user.name;
        res.redirect("/route/home");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("index", {
      title: "Home Page",
      layout: "layouts/main-layout",
      sessionUser: req.session.user,
    });
  } else {
    redirect("/route/login");
  }
});

module.exports = router;
