const mongoose = require("mongoose");

const nhanhieuSPSchema = new mongoose.Schema({
  tennhanhieu: {
    type: String,
    required: true,
    unique: true,
  },
});

const Nhanhieu = mongoose.model("Nhanhieu", nhanhieuSPSchema);

module.exports = Nhanhieu;
