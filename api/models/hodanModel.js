const mongoose = require("mongoose");

const hodanSchema = new mongoose.Schema(
  {
    daidien: {
      type: String,
    },
    diachi: {
      type: String,
    },
    sdt: {
      type: String,
    },
    cmnd: {
      type: String,
    },
    namsinh: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    langnghe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Langnghe",
    },
    daily2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily2",
    },
    items: [
      {
        congcu: { type: mongoose.Schema.Types.ObjectId, ref: "Congcu" },
        soluongphanphat: Number,
        ngaytiepnhan: String,
        daguitra: {
          type: Boolean,
          default: false,
        },
      },
    ],
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

const Hodan = mongoose.model("Hodan", hodanSchema);

module.exports = Hodan;
