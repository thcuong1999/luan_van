const express = require("express");
const sanphamLangngheRouter = express.Router();
const SanphamLangnghe = require("../models/SanphamLangngheModel");
const { getCurrentDatetime } = require("../utils");

// them sanpham langnghe
sanphamLangngheRouter.post("/them", async (req, res) => {
  const { ma, ten, mota } = req.body;
  try {
    const newSpLn = new SanphamLangnghe({
      ma,
      ten,
      mota,
      ngaytao: getCurrentDatetime(),
    });
    const savedSanphamLangnghe = await newSpLn.save();

    res.send({ savedSanphamLangnghe, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach sanpham langnghe
sanphamLangngheRouter.get("/danhsach", async (req, res) => {
  try {
    const sanpham = await SanphamLangnghe.find({}).sort({ createdAt: "desc" });
    if (!sanpham.length) {
      return res.send({ message: "Không tìm thấy sản phẩm", success: false });
    }

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu sanpham langnghe
sanphamLangngheRouter.put("/xoanhieusplangnghe", async (req, res) => {
  const { arrOfIds } = req.body;
  try {
    for (const item of arrOfIds) {
      await SanphamLangnghe.findByIdAndDelete(item);
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 sanpham langnghe
sanphamLangngheRouter.get("/single/:id", async (req, res) => {
  try {
    const sanpham = await SanphamLangnghe.findById(req.params.id);

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat 1 sanpham langnghe
sanphamLangngheRouter.put("/single/:id", async (req, res) => {
  const { ten, mota } = req.body;
  try {
    const sanpham = await SanphamLangnghe.findById(req.params.id);
    sanpham.ten = ten;
    sanpham.mota = mota;
    const updatedSanpham = await sanpham.save();

    res.send({ updatedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = sanphamLangngheRouter;
