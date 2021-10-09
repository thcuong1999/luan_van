const express = require("express");
const giamsatvungRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Giamsatvung = require("../models/giamsatvungModel");

// them gsv
giamsatvungRouter.post("/them", async (req, res) => {
  const { ten, sdt, email, cmnd, diachi, taikhoan, matkhau } = req.body;
  try {
    // tao tk
    const newUser = new User({
      taikhoan,
      matkhau: bcrypt.hashSync(matkhau, 8),
      vaitro: "giamsatvung",
    });
    const savedUser = await newUser.save();
    // tao gsv
    const newGsv = new Giamsatvung({
      ten,
      sdt,
      email,
      cmnd,
      diachi,
      user: savedUser._id,
    });
    const savedGsv = await newGsv.save();
    res.send({ savedGsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat gsv
giamsatvungRouter.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, cmnd, diachi, taikhoan, matkhau } = req.body;
  try {
    const gsv = await Giamsatvung.findById(req.params.id);
    if (!gsv) {
      return res.send({
        message: "Không tìm thấy giám sát vùng nào",
        success: false,
      });
    }
    // update user passwd
    if (matkhau) {
      const user = await User.findOne({ taikhoan });
      (user.matkhau = bcrypt.hashSync(matkhau, 8)), await user.save();
    }
    // update gsv
    gsv.ten = ten;
    gsv.sdt = sdt;
    gsv.email = email;
    gsv.cmnd = cmnd;
    gsv.diachi = diachi;
    const updatedGsv = await gsv.save();
    res.send({ updatedGsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach gsv
giamsatvungRouter.get("/danhsach", async (req, res) => {
  try {
    const gsv = await Giamsatvung.find({}).populate("user");
    if (!gsv.length) {
      return res.send({
        message: "Không tìm thấy giám sát vùng nào",
        success: false,
      });
    }
    res.send({ gsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 gsv
giamsatvungRouter.get("/single/:id", async (req, res) => {
  try {
    const gsv = await Giamsatvung.findById(req.params.id).populate("user");
    if (!gsv) {
      return res.send({
        message: "Không tìm thấy giám sát vùng nào",
        success: false,
      });
    }
    res.send({ gsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 gsv based UserId
giamsatvungRouter.get("/baseduserid/:userId", async (req, res) => {
  try {
    const gsv = await Giamsatvung.findOne({ user: req.params.userId });
    res.send({ gsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu gsv
giamsatvungRouter.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const gsv = await Giamsatvung.findById(item).populate("user");
      if (gsv.user) {
        await User.findByIdAndDelete(gsv.user._id);
      }
      // xoa bophankd
      await Giamsatvung.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = giamsatvungRouter;
