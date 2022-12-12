const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("../utils/db");
const Sekolah = require("../model/sekolah");

router.get("/", async (req, res) => {
  const sekolah = await Sekolah.find();
  res.render("index", {
    title: "Home Page",
    layout: "layouts/admin-nav-layout",
    sessionUser: req.session.user,
    activeHome: "active",
    sekolah,
  });
  // res.render("index", {
  //   title: "Home Page",
  //   layout: "layouts/main-nav-layout",
  //   sessionUser: req.session.user,
  // });
});
module.exports = router;
