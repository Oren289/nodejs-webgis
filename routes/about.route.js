const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about-page", {
    title: "About Us",
    layout: "layouts/main-nav-layout",
    sessionUser: req.session.user,
    activeAbout: "active",
  });
});

module.exports = router;
