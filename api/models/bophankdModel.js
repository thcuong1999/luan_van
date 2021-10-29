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
    vattu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vattu",
      },
    ],
    nguyenlieu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nguyenlieu",
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
    // khohang: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Khohang",
    // },
    dsphanphat: [
      {
        phanphat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Phanphat",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bophankd = mongoose.model("Bophankd", bophankdSchema);

module.exports = Bophankd;
