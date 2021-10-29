const mongoose = require("mongoose");

const nhanhieuSPSchema = new mongoose.Schema(
  {
    ma: {
      type: String,
    },
    ten: {
      type: String,
      required: true,
    },
    mota: {
      type: String,
    },
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

const Nhanhieu = mongoose.model("Nhanhieu", nhanhieuSPSchema);

module.exports = Nhanhieu;
