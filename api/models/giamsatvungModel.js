const mongoose = require("mongoose");

const giamsatvungSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    sdt: String,
    email: String,
    cmnd: String,
    diachi: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Giamsatvung = mongoose.model("Giamsatvung", giamsatvungSchema);

module.exports = Giamsatvung;
