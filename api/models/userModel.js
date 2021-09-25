const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // ten: String,
  // sdt: String,
  // email: String,
  taikhoan: {
    type: String,
    required: true,
  },
  matkhau: {
    type: String,
    required: true,
  },
  vaitro: {
    type: String,
    enum: ["admin", "bophankd", "giamsatvung", "daily1", "daily2", "hodan"],
  },
  daily1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Daily1",
  },
  daily2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Daily2",
  },
  // hodan: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Hodan",
  // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
