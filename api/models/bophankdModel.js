const mongoose = require("mongoose");

const bophankdSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Bophankd = mongoose.model("Bophankd", bophankdSchema);

module.exports = Bophankd;
