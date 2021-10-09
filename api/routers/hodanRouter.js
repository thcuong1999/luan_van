const express = require("express");
const Hodan = require("../models/hodanModel");
const User = require("../models/userModel");
const hodanRouter = express.Router();
var bcrypt = require("bcryptjs");
const Langnghe = require("../models/langngheModel");

// them ho dan
hodanRouter.post("/them", async (req, res) => {
  const { daidien, taikhoan, matkhau, sdt, cmnd, namsinh, diachi, langngheId } =
    req.body;
  try {
    // create new user
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "hodan",
      });
      savedUser = await newUser.save();
    }
    // create hodan
    const hodan = new Hodan({
      daidien,
      sdt,
      cmnd,
      namsinh,
      user: savedUser ? savedUser._id : null,
      diachi,
      langnghe: langngheId,
    });
    const savedHodan = await hodan.save();
    // update Langnghe collection, field: hodan
    const langnghe = await Langnghe.findById(langngheId);
    langnghe.hodan = [savedHodan._id, ...langnghe.hodan];
    await langnghe.save();

    res.send({ savedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds ho dan
hodanRouter.get("/danhsach", async (req, res) => {
  try {
    const hodan = await Hodan.find({}).populate("user").populate("langnghe");
    if (!hodan.length) {
      return res.send({
        message: "Không tìm thấy hộ dân nào",
        success: false,
      });
    }
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds ho dan thuoc langngheId
hodanRouter.get("/danhsach/:langngheId", async (req, res) => {
  try {
    const hodan = await Hodan.find({ langnghe: req.params.langngheId })
      .populate("user")
      .populate("langnghe");
    if (!hodan.length) {
      return res.send({
        message: "Không tìm thấy hộ dân nào",
        success: false,
      });
    }
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds ho dan co' daily 2 la null
hodanRouter.get("/dsdaily2null", async (req, res) => {
  try {
    const hd = await Hodan.find({}).populate("user").populate("langnghe");
    const hodan = hd.filter((item) => !item.daily2);
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// chinh sua hodan
hodanRouter.put("/single/:id", async (req, res) => {
  const { daidien, taikhoan, matkhau, sdt, cmnd, namsinh, diachi } = req.body;
  try {
    const hodan = await Hodan.findById(req.params.id).populate("user");
    let updatedHodan;
    let savedUser;
    // if 2 fields: taikhoan, matkhau not null
    if (taikhoan && matkhau) {
      // user not found -> create one
      if (!hodan.user) {
        // create user
        const newUser = new User({
          taikhoan,
          matkhau: bcrypt.hashSync(matkhau, 8),
          vaitro: "hodan",
        });
        savedUser = await newUser.save();
      } else {
        // update user password
        const user = await User.findById(daily1.user._id);
        user.matkhau = bcrypt.hashSync(matkhau, 8);
        await user.save();
      }
    }
    hodan.daidien = daidien;
    hodan.sdt = sdt;
    hodan.cmnd = cmnd;
    hodan.namsinh = namsinh;
    hodan.diachi = diachi;
    hodan.user = savedUser ? savedUser._id : hodan.user;
    updatedHodan = await hodan.save();

    res.send({ updatedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 ho dan
hodanRouter.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const hodan = await Hodan.findById(req.params.id).populate("user");
    if (hodan.user) {
      const removedUser = await User.findByIdAndDelete(hodan.user._id);
    }
    // xoa hodan
    const removedHodan = await Hodan.findByIdAndDelete(req.params.id);
    res.send({ removedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` ho dan
hodanRouter.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const hodan = await Hodan.findById(item).populate("user");
      if (hodan.user) {
        await User.findByIdAndDelete(hodan.user._id);
      }
      // xoa hodan
      await Hodan.findByIdAndDelete(item);
      // update Langnghe collection, field: hodan
      const langnghe = await Langnghe.findById(hodan.langnghe);
      langnghe.hodan = langnghe.hodan.filter((ite) => ite != item);
      await langnghe.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 ho dan
hodanRouter.get("/single/:id", async (req, res) => {
  try {
    const hodan = await Hodan.findById(req.params.id)
      .populate("user")
      .populate("langnghe");
    if (!hodan) {
      return res.send({
        message: "Không tìm thấy hộ dân nào",
        success: false,
      });
    }
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = hodanRouter;
