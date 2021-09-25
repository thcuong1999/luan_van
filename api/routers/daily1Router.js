const express = require("express");
const Daily1 = require("../models/daily1Model");
const User = require("../models/userModel");
const daily1Router = express.Router();
var bcrypt = require("bcryptjs");

// them dai ly
daily1Router.post("/them", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;

  try {
    // tao tai khoan de lay userId
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "daily1",
      });
      savedUser = await newUser.save();
    }

    // luu thong tin dai ly
    const newDaily1 = new Daily1({
      ten,
      sdt,
      email,
      diachi,
      user: savedUser ? savedUser._id : null,
    });
    const savedDaily1 = await newDaily1.save();
    res.send({ savedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua dai ly
daily1Router.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    const daily1 = await Daily1.findById(req.params.id);

    let savedUser;
    if (!daily1.user) {
      // daily1 chua co tk
      if (taikhoan && matkhau) {
        const newUser = new User({
          taikhoan,
          matkhau: bcrypt.hashSync(matkhau, 8),
          vaitro: "daily1",
        });
        savedUser = await newUser.save();
      }
    } else if (daily1.user) {
      // da co tk
      if (matkhau) {
        // update user collection
        const user = await User.findOne({ taikhoan });
        user.matkhau = bcrypt.hashSync(matkhau, 8);
        await user.save();
      }
    }

    daily1.ten = ten;
    daily1.sdt = sdt;
    daily1.email = email;
    daily1.diachi = diachi;
    daily1.user = savedUser ? savedUser._id : daily1.user;

    const updatedDaily1 = await daily1.save();
    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly
daily1Router.get("/danhsach", async (req, res) => {
  try {
    const daily1 = await Daily1.find({}).populate("user");
    if (!Daily1.length) {
      return res.send({ message: "Khong tim thay dai ly", success: false });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 dai ly
daily1Router.get("/single/:id", async (req, res) => {
  try {
    const daily1 = await Daily1.findById(req.params.id).populate("user");
    if (!daily1) {
      return res.send({ message: "Khong tim thay dai ly", success: false });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa dai ly
daily1Router.delete("/single/:id", async (req, res) => {
  try {
    const removedDaily1 = await Daily1.findByIdAndDelete(req.params.id); // return removed doc
    // delete user belong to this dai ly 1
    await User.findByIdAndDelete(removedDaily1.user);
    res.send({ removedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = daily1Router;
