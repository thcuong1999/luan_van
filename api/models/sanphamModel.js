const mongoose = require("mongoose");

const sanphamSchema = new mongoose.Schema(
  {
    ma: {
      type: String,
    },
    ten: {
      type: String,
      required: true,
    },
    mota: {
      type: String,
    },
    giabanle: {
      type: Number,
    },
    giabanbuon: {
      type: Number,
    },
    hinhanh: {
      type: String,
    },
    thuoctinh: [],
    loai: {
      type: String,
    },
    nhanhieu: {
      type: String,
    },
    chophepban: {
      type: Boolean,
    },
    apdungthue: {
      type: Boolean,
    },
    cotheban: {
      type: Number,
    },
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

const Sanpham = mongoose.model("Sanpham", sanphamSchema);

module.exports = Sanpham;
