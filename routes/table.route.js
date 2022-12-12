const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

require("../utils/db");
const Sekolah = require("../model/sekolah");
const User = require("../model/user");

router.use(methodOverride("_method"));

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const sekolah = await Sekolah.find();

    res.render("table", {
      title: "Data Sekolah",
      layout: "layouts/admin-nav-layout",
      sessionUser: req.session.user,
      activeTable: "active",
      msg: req.flash("msg"),
      sekolah,
    });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const sekolah = await Sekolah.findOne({ _id: req.params.id });

    res.render("table-detail", {
      title: "Detail Sekolah",
      layout: "layouts/admin-nav-layout",
      sessionUser: req.session.user,
      activeTable: "active",
      sekolah,
    });
  }
});

router.put("/", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    await Sekolah.updateOne(
      { _id: req.body.id },
      {
        $set: {
          nama_sekolah: req.body.nama_sekolah,
          jenis_sekolah: req.body.jenis_sekolah,
          alamat: req.body.alamat,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      }
    );
    req.flash("msg", "Data successfully updated!");
    res.redirect("/table");
  }
});

router.get("/delete/:id", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    await Sekolah.deleteOne({ _id: req.params.id });
    req.flash("msg", "Data successfully deleted!");
    res.redirect("/table");
  }
});

module.exports = router;
