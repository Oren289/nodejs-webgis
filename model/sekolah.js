const mongoose = require("mongoose");

const sekolahSchema = new mongoose.Schema({
  nama_sekolah: {
    type: String,
    required: true,
  },
  jenis_sekolah: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Sekolah = mongoose.model("sekolah", sekolahSchema);

module.exports = Sekolah;
