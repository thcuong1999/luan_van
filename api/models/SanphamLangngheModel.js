const mongoose = require("mongoose");

const sanphamLangngheSchema = new mongoose.Schema(
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
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

const SanphamLangnghe = mongoose.model(
  "SanphamLangnghe",
  sanphamLangngheSchema
);

module.exports = SanphamLangnghe;
