const mongoose = require("mongoose");

const phanphatSchema = new mongoose.Schema(
  {
    items: [
      {
        congcu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Congcu",
        },
        vattu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vattu",
        },
        soluongphanphat: Number,
      },
    ],
    from: {
      bophankd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bophankd",
      },
      // daily1, daily2 properties có thể bị thừa, sau này xóa sau
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
      daily1: {
        type: String,
        enum: ["choxn", "daxn"],
      },
      daily2: {
        type: String,
        enum: ["choxn", "daxn"],
      },
      hodan: {
        type: String,
        enum: ["choxn", "daxn"],
      },
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
    phanphattype: {
      type: String,
      enum: ["congcu", "vattu"],
    },
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

const Phanphat = mongoose.model("Phanphat", phanphatSchema);

module.exports = Phanphat;
