const express = require("express");
const bophankdRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Bophankd = require("../models/bophankdModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Daily1 = require("../models/daily1Model");

// them bo phan kd
bophankdRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    // create new user
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "bophankd",
      });
      savedUser = await newUser.save();
    }
    // create bophankd
    const bpkd = new Bophankd({
      ten,
      sdt,
      email,
      diachi,
      user: savedUser ? savedUser._id : null,
    });
    const savedBophankd = await bpkd.save();
    res.send({ savedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// danh sach bophankd
bophankdRouter.get("/danhsach", async (req, res) => {
  try {
    const bophankd = await Bophankd.find({}).populate("user");
    if (!bophankd.length) {
      return res.send({
        message: "Không tìm thấy bộ phận kinh doanh nào",
        success: false,
      });
    }
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 bophankd
bophankdRouter.get("/single/:id", async (req, res) => {
  try {
    const bophankd = await Bophankd.findById(req.params.id).populate("user");
    if (!bophankd) {
      return res.send({
        message: "Không tìm thấy bộ phận kinh doanh nào",
        success: false,
      });
    }
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 bophankd
bophankdRouter.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const bophankd = await Bophankd.findById(req.params.id).populate("user");
    if (bophankd.user) {
      const removedUser = await User.findByIdAndDelete(bophankd.user._id);
    }
    // xoa bophankd
    const removedBophankd = await Bophankd.findByIdAndDelete(req.params.id);
    res.send({ removedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` bo phan kd
bophankdRouter.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const bophankd = await Bophankd.findById(item).populate("user");
      if (bophankd.user) {
        await User.findByIdAndDelete(bophankd.user._id);
      }
      // xoa bophankd
      await Bophankd.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// chinh sua thong tin 1 bpkd
bophankdRouter.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau } = req.body;
  try {
    const bophankd = await Bophankd.findById(req.params.id).populate("user");
    let updatedBophankd;
    let savedUser;
    // if 2 fields: taikhoan, matkhau not null
    if (taikhoan && matkhau) {
      // user not found -> create one
      if (!bophankd.user) {
        // create user
        const newUser = new User({
          taikhoan,
          matkhau: bcrypt.hashSync(matkhau, 8),
          vaitro: "bophankd",
        });
        savedUser = await newUser.save();
      } else {
        // update user password
        const user = await User.findById(bophankd.user._id);
        user.matkhau = bcrypt.hashSync(matkhau, 8);
        await user.save();
      }
    }
    bophankd.ten = ten;
    bophankd.sdt = sdt;
    bophankd.email = email;
    bophankd.diachi = diachi;
    bophankd.user = savedUser ? savedUser._id : bophankd.user;
    updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin bpkd based on userID
bophankdRouter.get("/baseduserid/:userId", async (req, res) => {
  try {
    const bophankd = await Bophankd.findOne({ user: req.params.userId });
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach sanpham thuoc bophankdId
bophankdRouter.get("/dssanpham/:bophankdId", async (req, res) => {
  try {
    const { sanpham } = await Bophankd.findById(req.params.bophankdId)
      .select("sanpham")
      .populate("sanpham");

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach cong cu hu loi
bophankdRouter.get("/dscongcuhuloi/:bophankdId", async (req, res) => {
  try {
    let { congcu } = await Bophankd.findById(req.params.bophankdId)
      .select("congcu")
      .populate("congcu");
    congcu = congcu.filter((item) => item.soluongloi);

    res.send({ congcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach congcu thuoc bophankdId
bophankdRouter.get("/dscongcu/:bophankdId", async (req, res) => {
  try {
    let { congcu } = await Bophankd.findById(req.params.bophankdId)
      .select("congcu")
      .populate("congcu");
    congcu = congcu.filter((item) => item.soluong);

    res.send({ congcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach vattu thuoc bophankdId
bophankdRouter.get("/dsvattu/:bophankdId", async (req, res) => {
  try {
    let { vattu } = await Bophankd.findById(req.params.bophankdId)
      .select("vattu")
      .populate("vattu");
    vattu = vattu.filter((item) => item.soluong);

    res.send({ vattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach vat tu hu loi
bophankdRouter.get("/dsvattuhuloi/:bophankdId", async (req, res) => {
  try {
    let { vattu } = await Bophankd.findById(req.params.bophankdId)
      .select("vattu")
      .populate("vattu");
    vattu = vattu.filter((item) => item.soluongloi);

    res.send({ vattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach nguyenlieu thuoc bophankdId
bophankdRouter.get("/dsnguyenlieu/:bophankdId", async (req, res) => {
  try {
    const { nguyenlieu } = await Bophankd.findById(req.params.bophankdId)
      .select("nguyenlieu")
      .populate("nguyenlieu");
    res.send({ nguyenlieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach sp trong khohang
bophankdRouter.get("/dsspkhohang/:bophankdId", async (req, res) => {
  try {
    const sanpham = await Bophankd.findById(req.params.bophankdId)
      .select("khohang")
      .populate({
        path: "khohang",
        populate: {
          path: "items",
          populate: {
            path: "sanpham",
            model: "Sanpham",
          },
        },
      });
    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach daily 1 thuoc bophankdId
bophankdRouter.get("/dsdaily1/:bophankdId", async (req, res) => {
  try {
    const daily1 = await Bophankd.findById(req.params.bophankdId)
      .select("daily1")
      .populate({
        path: "daily1",
        populate: {
          path: "user",
          model: "User",
        },
      });

    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat cua bophankd
bophankdRouter.get("/dsphanphat/:bophankdId", async (req, res) => {
  try {
    const { dsphanphat } = await Bophankd.findById(req.params.bophankdId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
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

// xoa 1 sp thuoc bophankd
bophankdRouter.put("/xoasanpham", async (req, res) => {
  const { bophankdId, sanphamId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.sanpham = bophankd.sanpham.filter((item) => item != sanphamId);
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` sp thuoc bophankd
bophankdRouter.put("/xoanhieusp", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.sanpham = bophankd.sanpham.filter(
        (_item) => _item.toString() != item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` cong cu thuoc bophankd
bophankdRouter.put("/xoanhieucc", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.congcu = bophankd.congcu.filter((_item) => _item != item);
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` nglieu thuoc bophankd
bophankdRouter.put("/xoanhieunglieu", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.nguyenlieu = bophankd.nguyenlieu.filter(
        (_item) => _item.toString() !== item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` vat tu thuoc bophankd
bophankdRouter.put("/xoanhieuvattu", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.vattu = bophankd.vattu.filter(
        (_item) => _item.toString() !== item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 1 thuoc bophankd
bophankdRouter.put("/xoanhieudaily1", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      // update filed daily1[], collection: Bophankd
      bophankd.daily1 = bophankd.daily1.filter((_item) => _item != item);
      await bophankd.save();
      // update field bophankd, collection: Daily1
      const dl1 = await Daily1.findById(item);
      dl1.bophankd = null;
      await dl1.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 congcu thuoc bophankd
bophankdRouter.put("/xoacongcu", async (req, res) => {
  const { bophankdId, congcuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.congcu = bophankd.congcu.filter((item) => item != congcuId);
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 nglieu thuoc bophankd
bophankdRouter.put("/xoa1nguyenlieu", async (req, res) => {
  const { bophankdId, nguyenlieuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.nguyenlieu = bophankd.nguyenlieu.filter(
      (item) => item.toString() !== nguyenlieuId
    );
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 vattu thuoc bophankd
bophankdRouter.put("/xoa1vattu", async (req, res) => {
  const { bophankdId, vattuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.vattu = bophankd.vattu.filter(
      (item) => item.toString() !== vattuId
    );
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankd them daily 1
bophankdRouter.put("/themdaily1", async (req, res) => {
  const { bophankdId, daily1Arr } = req.body;
  try {
    // update Bophankd collection, field: daily1
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.daily1 = [...daily1Arr, ...bophankd.daily1];
    // update Daily1 collection, field: bophankd
    for (const item of daily1Arr) {
      const daily1 = await Daily1.findById(item);
      daily1.bophankd = bophankdId;
      await daily1.save();
    }
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankd them san pham
bophankdRouter.put("/themsanpham", async (req, res) => {
  const { bophankdId, sanphamArr } = req.body;
  try {
    // Bophankd collection
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.sanpham = [...sanphamArr, ...bophankd.sanpham];

    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = bophankdRouter;
