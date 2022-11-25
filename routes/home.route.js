const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("index", {
      title: "Home Page",
      layout: "layouts/main-nav-layout",
      sessionUser: req.session.user.split(" ")[0],
      activeHome: "active",
    });
  } else {
    res.redirect("/login");
  }
  // res.render("index", {
  //   title: "Home Page",
  //   layout: "layouts/main-nav-layout",
  //   sessionUser: req.session.user,
  // });
});

module.exports = router;
