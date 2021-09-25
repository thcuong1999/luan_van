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
        soluongphatphat: Number,
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
  },
  {
    timestamps: true,
  }
);

const Daily2 = mongoose.model("Daily2", daily2Schema);

module.exports = Daily2;
