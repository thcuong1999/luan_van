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
    ngaysinh: {
      type: Date,
    },
    thanhvien: [
      {
        hoten: {
          type: String,
        },
        namsinh: {
          type: Date,
        },
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

const Hodan = mongoose.model("Hodan", hodanSchema);

module.exports = Hodan;
