const express = require("express");
const nguyenlieuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Bophankd = require("../models/bophankdModel");
const Nguyenlieu = require("../models/nguyenlieuModel");
const { getCurrentDatetime } = require("../utils");

// them nguyen lieu
nguyenlieuRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, mota, thuoctinh, sanluong, donvitinh, bophankdId } = req.body;
  const newNguyenlieu = new Nguyenlieu({
    ten,
    mota,
    thuoctinh: JSON.parse(thuoctinh),
    hinhanh: req.file ? req.file.filename : "",
    sanluong,
    donvitinh,
    // slsaukhipp: soluong,
    ngaytao: getCurrentDatetime(),
  });
  try {
    const savedNguyenlieu = await newNguyenlieu.save();

    // neu req.body co field: bophankdId
    if (bophankdId) {
      const bophankd = await Bophankd.findById(bophankdId);
      bophankd.nguyenlieu = [savedNguyenlieu._id, ...bophankd.nguyenlieu];
      await bophankd.save();
    }

    res.send({ savedNguyenlieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua nguyen lieu
nguyenlieuRouter.put(
  "/single/:id",
  upload.single("hinhanh"),
  async (req, res) => {
    const { ten, mota, thuoctinh, sanluong, donvitinh } = req.body;
    try {
      const nguyenlieu = await Nguyenlieu.findById(req.params.id);
      nguyenlieu.ten = ten;
      nguyenlieu.mota = mota;
      nguyenlieu.thuoctinh = JSON.parse(thuoctinh);
      nguyenlieu.hinhanh = req.file ? req.file.filename : nguyenlieu.hinhanh;
      nguyenlieu.sanluong = sanluong;
      nguyenlieu.donvitinh = donvitinh;

      const updatedNguyenlieu = await nguyenlieu.save();
      res.send({ updatedNguyenlieu, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// lay danh sach nguyen lieu
nguyenlieuRouter.get("/danhsach", async (req, res) => {
  const nguyenlieu = await Nguyenlieu.find({}).sort({ createdAt: "desc" });
  if (!nguyenlieu.length) {
    return res.send({ message: "Không tìm thấy nguyên liệu", success: false });
  }
  res.send({ nguyenlieu, success: true });
});

// lay thong tin 1 nguyen lieu
nguyenlieuRouter.get("/single/:id", async (req, res) => {
  try {
    const nguyenlieu = await Nguyenlieu.findById(req.params.id);
    if (nguyenlieu) {
      res.send({ nguyenlieu, success: true });
    } else {
      res.send({ message: "Không tìm thấy nguyên liệu", success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = nguyenlieuRouter;
