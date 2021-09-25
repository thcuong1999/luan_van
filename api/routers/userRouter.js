const express = require("express");
const adminRouter = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

// admin signin
adminRouter.post("/login", async (req, res) => {
  const { taikhoan, matkhau } = req.body;
  // check email
  const user = await User.findOne({ taikhoan });
  if (!user) {
    res
      .status(403)
      .send({ message: "Thông tin không chính xác", success: false });
  } else {
    // check password
    //const validPwd = bcrypt.compareSync(matkhau, user.matkhau); // false
    const token = generateToken(user);
    if (matkhau === user.matkhau) {
      // passwd matched, -> tìm thông tin user tương ứng với vaitro

      res.status(200).send({
        _id: user._id,
        taikhoan: user.taikhoan,
        vaitro: user.vaitro,
        token,
        success: true,
      });
    } else {
      res
        .status(403)
        .send({ message: "Thông tin không chính xác", success: false });
    }
  }

  // generate token to send
});

module.exports = adminRouter;
