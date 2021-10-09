const mongoose = require("mongoose");

const sanphamSchema = new mongoose.Schema(
  {
    sku: {
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
      enum: ["thucongmynghe", "nongsan", "nguyenlieu"],
    },
    nhanhieu: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    chophepban: {
      type: Boolean,
    },
    apdungthue: {
      type: Boolean,
    },
    cotheban: {
      // so luong co the ban
      type: Number,
    },
    // khohang: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Khohang",
    // },
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

const Sanpham = mongoose.model("Sanpham", sanphamSchema);

module.exports = Sanpham;
