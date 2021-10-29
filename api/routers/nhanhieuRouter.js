const express = require("express");
const Nhanhieu = require("../models/nhanhieuModel");
const nhanhieuRouter = express.Router();
const { getCurrentDatetime } = require("../utils");

// them nhan hieu
nhanhieuRouter.post("/them", async (req, res) => {
  const { ma, ten, mota } = req.body;
  try {
    const newNhanhieu = new Nhanhieu({
      ma,
      ten,
      mota,
      ngaytao: getCurrentDatetime(),
    });
    const savedNhanhieu = await newNhanhieu.save();

    res.send({ savedNhanhieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach nhan hieu
nhanhieuRouter.get("/danhsach", async (req, res) => {
  try {
    const nhanhieu = await Nhanhieu.find({}).sort({ createdAt: "desc" });
    if (!nhanhieu.length) {
      return res.send({ message: "Không tìm thấy nhãn hiệu", success: false });
    }

    res.send({ nhanhieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 nhan hieu
nhanhieuRouter.get("/single/:id", async (req, res) => {
  try {
    const nhanhieu = await Nhanhieu.findById(req.params.id);
    if (!nhanhieu) {
      return res.send({ message: "Không tìm thấy nhãn hiệu", success: false });
    }

    res.send({ nhanhieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat 1 nhan hieu
nhanhieuRouter.put("/single/:id", async (req, res) => {
  const { ten, mota } = req.body;
  try {
    const nhanhieu = await Nhanhieu.findById(req.params.id);
    nhanhieu.ten = ten;
    nhanhieu.mota = mota;
    const updatedNhanhieu = await nhanhieu.save();

    res.send({ updatedNhanhieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu nhan hieu
nhanhieuRouter.put("/xoanhieunhanhieu", async (req, res) => {
  const { arrOfIds } = req.body;
  try {
    for (const item of arrOfIds) {
      await Nhanhieu.findByIdAndDelete(item);
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = nhanhieuRouter;
