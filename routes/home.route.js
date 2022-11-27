const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    layout: "layouts/main-nav-layout",
    sessionUser: req.session.user,
    activeHome: "active",
  });
  // res.render("index", {
  //   title: "Home Page",
  //   layout: "layouts/main-nav-layout",
  //   sessionUser: req.session.user,
  // });
});

module.exports = router;
