const mongoose = require("mongoose");

const daily2Schema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
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
    hodan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hodan",
      },
    ],
    items: [
      {
        congcu: { type: mongoose.Schema.Types.ObjectId, ref: "Congcu" },
        vattu: { type: mongoose.Schema.Types.ObjectId, ref: "Vattu" },
        soluongphanphat: Number,
        ngaytiepnhan: String,
        daphanphat: {
          type: Boolean,
          default: false,
        },
        phanphat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Phanphat",
        },
      },
    ],
    daily1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily1",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dsphanphat: [
      {
        phanphat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Phanphat",
        },
        daphanphatxuong: {
          type: Boolean,
          default: false,
        },
        danhapkho: {
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

const Daily2 = mongoose.model("Daily2", daily2Schema);

module.exports = Daily2;
