const mongoose = require("mongoose");

const phanphatSchema = new mongoose.Schema(
  {
    items: [
      {
        congcu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Congcu",
        },
        soluongphanphat: Number,
      },
    ],
    from: {
      bophankd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bophankd",
      },
      daily1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily1",
      },
      daily2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
    },
    to: {
      daily1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily1",
      },
      daily2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
      hodan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hodan",
      },
    },
    trangthai: {
      type: String,
      enum: ["choxn", "daxn"],
      default: "choxn",
    },
    baocao: {
      type: String,
      enum: ["daydu", "thieu"],
    },
    thieu: [
      {
        congcu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Congcu",
        },
        soluongphanphat: Number,
        soluongthieu: Number,
      },
    ],
    hoanthanh: {
      type: Boolean,
      default: false,
    },
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

const Phanphat = mongoose.model("Phanphat", phanphatSchema);

module.exports = Phanphat;
