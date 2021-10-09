const express = require("express");
const khohangRouter = express.Router();
const Khohang = require("../models/khohangModel");

// lay danh sach kho hang
khohangRouter.get("/danhsach", async (req, res) => {
  try {
    const spkhohang = await Khohang.find({})
      .populate({ path: "sanpham" })
      .sort({ createdAt: "desc" });
    if (spkhohang.length) {
      res.send({ spkhohang, success: true });
    } else {
      res.send({ message: "Khong co san pham nao trong kho", success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = khohangRouter;
