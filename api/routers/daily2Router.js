const express = require("express");
const Daily2 = require("../models/daily2Model");
const User = require("../models/userModel");
const daily2Router = express.Router();
var bcrypt = require("bcryptjs");

// them dai ly
daily2Router.post("/them", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau, daily1 } = req.body;

  try {
    // tao tai khoan de lay userId
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "daily2",
      });
      savedUser = await newUser.save();
    }

    // luu thong tin dai ly
    const newDaily2 = new Daily2({
      ten,
      sdt,
      email,
      diachi,
      daily1,
      user: savedUser ? savedUser._id : null,
    });
    const savedDaily2 = await newDaily2.save();
    res.send({ savedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua dai ly
daily2Router.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    const daily2 = await Daily2.findById(req.params.id);

    let savedUser;
    if (!daily2.user) {
      // daily2 chua co tk
      if (taikhoan && matkhau) {
        const newUser = new User({
          taikhoan,
          matkhau: bcrypt.hashSync(matkhau, 8),
          vaitro: "daily2",
        });
        savedUser = await newUser.save();
      }
    } else if (daily2.user) {
      // da co tk
      if (matkhau) {
        // update user collection
        const user = await User.findOne({ taikhoan });
        user.matkhau = bcrypt.hashSync(matkhau, 8);
        await user.save();
      }
    }

    daily2.ten = ten;
    daily2.sdt = sdt;
    daily2.email = email;
    daily2.diachi = diachi;
    daily2.user = savedUser ? savedUser._id : daily2.user;

    const updatedDaily2 = await daily2.save();
    res.send({ updatedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly
daily2Router.get("/danhsach", async (req, res) => {
  try {
    const daily2 = await Daily2.find({}).populate("user");
    if (!Daily2.length) {
      return res.send({ message: "Khong tim thay dai ly", success: false });
    }
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 dai ly
daily2Router.get("/single/:id", async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.id).populate("user");
    if (!daily2) {
      return res.send({ message: "Khong tim thay dai ly", success: false });
    }
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa dai ly
daily2Router.delete("/single/:id", async (req, res) => {
  try {
    const removedDaily2 = await Daily2.findByIdAndDelete(req.params.id);
    res.send({ removedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = daily2Router;
