const mongoose = require("mongoose");

const khohangSchema = new mongoose.Schema(
  {
    items: [
      {
        sanpham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sanpham",
        },
        tonkho: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Khohang = mongoose.model("Khohang", khohangSchema);

module.exports = Khohang;
