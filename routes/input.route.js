const express = require("express");
const router = express.Router();

require("../utils/db");
const Sekolah = require("../model/sekolah");

router.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.render("input-page", {
      title: "Input Data Sekolah",
      layout: "layouts/admin-nav-layout",
      sessionUser: req.session.user,
      activeInput: "active",
    });
  }
});

router.post("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const query = {
      nama_sekolah: req.body.nama_sekolah,
      jenis_sekolah: req.body.jenis_sekolah,
      alamat: req.body.alamat,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    await Sekolah.insertMany(query);

    req.flash("msg", "Data berhasil ditambahkan!");
    res.redirect("/table");
  }
});

module.exports = router;
