const express = require("express");
const Daily2 = require("../models/daily2Model");
const User = require("../models/userModel");
const daily2Router = express.Router();
var bcrypt = require("bcryptjs");
const Daily1 = require("../models/daily1Model");
const Hodan = require("../models/hodanModel");

// them dai ly 2
daily2Router.post("/them", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    // create new user
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "daily2",
      });
      savedUser = await newUser.save();
    }
    // create daily 1
    const daily2 = new Daily2({
      ten,
      sdt,
      email,
      diachi,
      user: savedUser ? savedUser._id : null,
    });
    const savedDaily2 = await daily2.save();
    res.send({ savedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// chinh sua dai ly 2
daily2Router.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    const daily2 = await Daily2.findById(req.params.id).populate("user");
    let updatedDaily2;
    let savedUser;
    // if 2 fields: taikhoan, matkhau not null
    if (taikhoan && matkhau) {
      // user not found -> create one
      if (!daily2.user) {
        // create user
        const newUser = new User({
          taikhoan,
          matkhau: bcrypt.hashSync(matkhau, 8),
          vaitro: "daily2",
        });
        savedUser = await newUser.save();
      } else {
        // update user password
        const user = await User.findById(daily2.user._id);
        user.matkhau = bcrypt.hashSync(matkhau, 8);
        await user.save();
      }
    }
    daily2.ten = ten;
    daily2.sdt = sdt;
    daily2.email = email;
    daily2.diachi = diachi;
    daily2.user = savedUser ? savedUser._id : daily2.user;
    updatedDaily2 = await daily2.save();

    res.send({ updatedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly 2
daily2Router.get("/danhsach", async (req, res) => {
  try {
    const daily2 = await Daily2.find({}).populate("user");
    if (!daily2.length) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach ho dan thuoc dai ly 2
daily2Router.get("/dshodan/:daily2Id", async (req, res) => {
  try {
    const { hodan } = await Daily2.findById(req.params.daily2Id)
      .select("hodan")
      .populate({
        path: "hodan",
        populate: {
          path: "langnghe",
        },
      });
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 dai ly
daily2Router.get("/single/:id", async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.id).populate("user");
    if (!daily2) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 dai ly 2
daily2Router.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const daily2 = await Daily2.findById(req.params.id).populate("user");
    if (daily2.user) {
      const removedUser = await User.findByIdAndDelete(daily2.user._id);
    }
    // xoa bophankd
    const removedDaily2 = await Daily2.findByIdAndDelete(req.params.id);
    res.send({ removedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 2
daily2Router.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const daily2 = await Daily2.findById(item).populate("user");
      if (daily2.user) {
        await User.findByIdAndDelete(daily2.user._id);
      }
      // xoa bophankd
      await Daily2.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` hodan thuoc dai ly 2
daily2Router.put("/xoanhieuhodan", async (req, res) => {
  const { daily2Id, arrayOfId } = req.body;
  // console.log(req.body);
  try {
    const daily2 = await Daily2.findById(daily2Id);
    for (const item of arrayOfId) {
      // update filed hodan, collection: Daily2
      daily2.hodan = daily2.hodan.filter((_item) => _item != item);
      await daily2.save();
      // update field daily2, collection: Hodan
      const hodan = await Hodan.findById(item);
      hodan.daily2 = null;
      await hodan.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly 2 + daily1 null
daily2Router.get("/dsdly2dly1null", async (req, res) => {
  try {
    const dl2 = await Daily2.find({}).populate("user");
    if (!dl2.length) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }
    const daily2 = dl2.filter((item) => !item.daily1);
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily 2 them ho dan
daily2Router.put("/themhodan", async (req, res) => {
  const { daily2Id, arrayOfId } = req.body;
  try {
    const daily2 = await Daily2.findById(daily2Id);
    for (const item of arrayOfId) {
      // update Daily2 collection, field: hodan
      daily2.hodan = [item, ...daily2.hodan];
      await daily2.save();
      // update Hodan collection, field: daily2
      const hodan = await Hodan.findById(item);
      hodan.daily2 = daily2Id;
      await hodan.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat thuoc dly2
daily2Router.get("/dsphanphat/:daily2Id", async (req, res) => {
  try {
    const { dsphanphat } = await Daily2.findById(req.params.daily2Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      });

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay 1 phan phat thuoc dly2
daily2Router.get("/singlephanphat/:daily2Id/:phanphatId", async (req, res) => {
  try {
    const { dsphanphat } = await Daily2.findById(req.params.daily2Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan congcu",
            },
          },
        },
      });
    const phanphat = dsphanphat.find(
      (item) => item.phanphat._id.toString() === req.params.phanphatId
    );
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// ===========================================

// them dai ly 2 vao ds daily2 cua daily1
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

    // update daily1: daily2[] field
    const dl1 = await Daily1.findById(daily1);
    dl1.daily2 = [savedDaily2._id, ...dl1.daily2];
    await dl1.save();

    res.send({ savedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// get single daily2 based userId
daily2Router.get("/user/:id", async (req, res) => {
  try {
    const daily2 = await Daily2.findOne({ user: req.params.id });
    if (!daily2) {
      return res.send({ message: "Không tìm thấy đại lý", success: false });
    }
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach cong cu thuoc daily 2
daily2Router.get("/danhsachcongcu/:daily2Id", async (req, res) => {
  try {
    const congcu = await Daily2.findById(req.params.daily2Id)
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

module.exports = daily2Router;
