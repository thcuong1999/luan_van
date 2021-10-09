const express = require("express");
const Daily1 = require("../models/daily1Model");
const User = require("../models/userModel");
const daily1Router = express.Router();
var bcrypt = require("bcryptjs");
const Daily2 = require("../models/daily2Model");

// them dai ly
daily1Router.post("/them", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    // create new user
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "daily1",
      });
      savedUser = await newUser.save();
    }
    // create daily 1
    const daily1 = new Daily1({
      ten,
      sdt,
      email,
      diachi,
      user: savedUser ? savedUser._id : null,
    });
    const savedDaily1 = await daily1.save();
    res.send({ savedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// chinh sua dai ly
daily1Router.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    const daily1 = await Daily1.findById(req.params.id).populate("user");
    let updatedDaily1;
    let savedUser;
    // if 2 fields: taikhoan, matkhau not null
    if (taikhoan && matkhau) {
      // user not found -> create one
      if (!daily1.user) {
        // create user
        const newUser = new User({
          taikhoan,
          matkhau: bcrypt.hashSync(matkhau, 8),
          vaitro: "daily1",
        });
        savedUser = await newUser.save();
      } else {
        // update user password
        const user = await User.findById(daily1.user._id);
        user.matkhau = bcrypt.hashSync(matkhau, 8);
        await user.save();
      }
    }
    daily1.ten = ten;
    daily1.sdt = sdt;
    daily1.email = email;
    daily1.diachi = diachi;
    daily1.user = savedUser ? savedUser._id : daily1.user;
    updatedDaily1 = await daily1.save();

    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly 1
daily1Router.get("/danhsach", async (req, res) => {
  try {
    const daily1 = await Daily1.find({}).populate("user");
    if (!daily1.length) {
      return res.send({
        message: "Không tìm thấy đại lý 1 nào",
        success: false,
      });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds daily 1 chưa có bộ phận kinh doanh
daily1Router.get("/dsdaily1bpkdnull", async (req, res) => {
  try {
    const dl1 = await Daily1.find({}).populate("user");
    if (!dl1.length) {
      return res.send({
        message: "Không tìm thấy đại lý 1 nào",
        success: false,
      });
    }
    const daily1 = dl1.filter((item) => !item.bophankd);
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
      return res.send({
        message: "Không tìm thấy đại lý 1 nào",
        success: false,
      });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 dai ly 1
daily1Router.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const daily1 = await Daily1.findById(req.params.id).populate("user");
    if (daily1.user) {
      const removedUser = await User.findByIdAndDelete(daily1.user._id);
    }
    // xoa bophankd
    const removedDaily1 = await Daily1.findByIdAndDelete(req.params.id);
    res.send({ removedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 1
daily1Router.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const daily1 = await Daily1.findById(item).populate("user");
      if (daily1.user) {
        await User.findByIdAndDelete(daily1.user._id);
      }
      // xoa bophankd
      await Daily1.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// get single daily1 based userId
daily1Router.get("/user/:id", async (req, res) => {
  try {
    const daily1 = await Daily1.findOne({ user: req.params.id });
    if (!daily1) {
      return res.send({ message: "Không tìm thấy đại lý", success: false });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily1 them daily2
daily1Router.put("/themdaily2", async (req, res) => {
  const { daily1Id, daily2Arr } = req.body;
  try {
    // update Daily1 collection, field: daily2
    const daily1 = await Daily1.findById(daily1Id);
    daily1.daily2 = [...daily2Arr, ...daily1.daily2];
    // update Daily2 collection, field: daily1
    for (const item of daily2Arr) {
      const daily2 = await Daily2.findById(item);
      daily2.daily1 = daily1Id;
      await daily2.save();
    }
    const updatedDaily1 = await daily1.save();
    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach daily 2 thuoc daily 1
daily1Router.get("/dsdaily2/:daily1Id", async (req, res) => {
  try {
    const daily2 = await Daily1.findById(req.params.daily1Id)
      .select("daily2")
      .populate({
        path: "daily2",
        populate: {
          path: "user",
          model: "User",
        },
      });

    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 2 thuoc daily1Id
daily1Router.put("/xoanhieudaily2", async (req, res) => {
  const { daily1Id, arrayOfId } = req.body;
  // console.log(req.body);
  try {
    const daily1 = await Daily1.findById(daily1Id);
    for (const item of arrayOfId) {
      // update filed daily2[], collection: Daily1
      daily1.daily2 = daily1.daily2.filter((_item) => _item != item);
      await daily1.save();
      // update field daily1, collection: Daily2
      const dl2 = await Daily2.findById(item);
      dl2.daily1 = null;
      await dl2.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//==================================

// lay danh sach cong cu thuoc daily 1
daily1Router.get("/danhsachcongcu/:daily1Id", async (req, res) => {
  try {
    const congcu = await Daily1.findById(req.params.daily1Id)
      .select("items")
      .populate({
        path: "items",
        populate: {
          path: "congcu",
          model: "Congcu",
        },
      })
      .sort({ createdAt: "desc" });

    if (!congcu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    res.send(congcu);
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = daily1Router;
