const mongoose = require("mongoose");

const khohangSchema = new mongoose.Schema(
  {
    sanpham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sanpham",
      required: true,
    },
    tonkho: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Khohang = mongoose.model("Khohang", khohangSchema);

module.exports = Khohang;
