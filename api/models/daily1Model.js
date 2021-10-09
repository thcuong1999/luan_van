const mongoose = require("mongoose");

const daily1Schema = new mongoose.Schema(
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
    daily2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bophankd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bophankd",
    },
    items: [
      {
        congcu: { type: mongoose.Schema.Types.ObjectId, ref: "Congcu" },
        soluongphanphat: Number,
        ngaytiepnhan: String,
        daphanphat: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Daily1 = mongoose.model("Daily1", daily1Schema);

module.exports = Daily1;
