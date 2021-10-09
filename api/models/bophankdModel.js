const mongoose = require("mongoose");

const bophankdSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
    },
    sdt: {
      type: String,
    },
    email: {
      type: String,
    },
    diachi: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    congcu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Congcu",
      },
    ],
    sanpham: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sanpham",
      },
    ],
    daily1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily1",
      },
    ],
    khohang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Khohang",
    },
  },
  {
    timestamps: true,
  }
);

const Bophankd = mongoose.model("Bophankd", bophankdSchema);

module.exports = Bophankd;
