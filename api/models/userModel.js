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
  vaitro2: {
    type: String,
    enum: ["giamsatvung", "daily1", "daily2", "hodan"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
