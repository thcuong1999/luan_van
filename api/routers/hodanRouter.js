const express = require("express");
const Hodan = require("../models/hodanModel");
const User = require("../models/userModel");
const hodanRouter = express.Router();
var bcrypt = require("bcryptjs");
const Langnghe = require("../models/langngheModel");

// them ho dan
hodanRouter.post("/them", async (req, res) => {
  const {
    daidien,
    taikhoan,
    matkhau,
    sdt,
    cmnd,
    namsinh,
    diachi,
    nghe,
    langngheId,
  } = req.body;
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
      nghe,
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

// search hodan
hodanRouter.get("/search", async (req, res) => {
  const { daidien, diachi, sdt } = req.query;
  const filterDaidien = daidien ? { daidien } : {};
  const filterDiachi = diachi
    ? { diachi: { $regex: diachi, $options: "i" } }
    : {};
  const filterSdt = sdt ? { sdt } : {};
  try {
    const hodan = await Hodan.findOne({
      ...filterDaidien,
      ...filterSdt,
      ...filterDiachi,
    });
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// chinh sua hodan
hodanRouter.put("/single/:id", async (req, res) => {
  const { daidien, taikhoan, matkhau, sdt, cmnd, namsinh, diachi, nghe } =
    req.body;
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
    hodan.nghe = nghe;
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

// lay 1 phan phat thuoc hodan
hodanRouter.get("/singlephanphat/:hodanId/:phanphatId", async (req, res) => {
  try {
    const { dsphanphat } = await Hodan.findById(req.params.hodanId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan congcu vattu",
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

// lay thong tin 1 ho dan based userId
hodanRouter.get("/singlehdbaseduser/:userId", async (req, res) => {
  try {
    const hodan = await Hodan.findOne({ user: req.params.userId });

    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//========================================

// lay ds phan phat CONG CU thuoc ho dan
hodanRouter.get("/dscongcuphanphat/:hodanId", async (req, res) => {
  try {
    let { dsphanphat } = await Hodan.findById(req.params.hodanId)
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
    dsphanphat = dsphanphat.filter(
      (item) => item.phanphat.phanphattype === "congcu"
    );
    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds phan phat VAT TU thuoc ho dan
hodanRouter.get("/dsvattuphanphat/:hodanId", async (req, res) => {
  try {
    let { dsphanphat } = await Hodan.findById(req.params.hodanId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan vattu",
            },
          },
        },
      });
    dsphanphat = dsphanphat.filter(
      (item) => item.phanphat.phanphattype === "vattu"
    );
    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach CONG CU thuoc ho dan
hodanRouter.get("/danhsachcongcu/:hodanId", async (req, res) => {
  try {
    let dscongcu = await Hodan.findById(req.params.hodanId)
      .select("items")
      .populate({
        path: "items",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      })
      .populate({
        path: "items",
        populate: {
          path: "congcu",
        },
      });

    if (!dscongcu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    dscongcu = dscongcu.items.filter((item) => item.congcu);
    res.send({ dscongcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach VAT TU thuoc ho dan
hodanRouter.get("/danhsachvattu/:hodanId", async (req, res) => {
  try {
    let dsvattu = await Hodan.findById(req.params.hodanId)
      .select("items")
      .populate({
        path: "items",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      })
      .populate({
        path: "items",
        populate: {
          path: "vattu",
        },
      });

    if (!dsvattu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    dsvattu = dsvattu.items.filter((item) => item.vattu);
    res.send({ dsvattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = hodanRouter;
