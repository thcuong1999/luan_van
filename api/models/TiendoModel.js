const mongoose = require("mongoose");

const tiendoSchema = new mongoose.Schema(
  {
    hodan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hodan",
    },
    ten: String,
    noidung: String,
    sanpham: String,
    dientich: Number,
    donvi: String,
    thoigianbatdau: String,
    thoigianthuhoach: String,
    baocao: [
      {
        ten: String,
        noidung: String,
        hinhanh: String,
        thoigian: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tiendo = mongoose.model("Tiendo", tiendoSchema);

module.exports = Tiendo;
