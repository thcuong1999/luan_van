const express = require("express");
const congcuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Bophankd = require("../models/bophankdModel");
const Congcu = require("../models/congcuModel");
const { getCurrentDatetime } = require("../utils");

// them cong cu
congcuRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, mota, thuoctinh, congdung, soluong, bophankdId } = req.body;
  const newCongcu = new Congcu({
    ten,
    mota,
    thuoctinh: JSON.parse(thuoctinh),
    hinhanh: req.file ? req.file.filename : "",
    congdung,
    soluong,
    ngaytao: getCurrentDatetime(),
  });
  try {
    const savedCongcu = await newCongcu.save();

    // neu req.body co field: bophankdId
    if (bophankdId) {
      const bophankd = await Bophankd.findById(bophankdId);
      bophankd.congcu = [savedCongcu._id, ...bophankd.congcu];
      await bophankd.save();
    }

    res.send({ savedCongcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua cong cu
congcuRouter.put("/single/:id", upload.single("hinhanh"), async (req, res) => {
  const { ten, mota, thuoctinh, congdung, soluong } = req.body;
  try {
    const congcu = await Congcu.findById(req.params.id);
    congcu.ten = ten;
    congcu.mota = mota;
    congcu.thuoctinh = JSON.parse(thuoctinh);
    congcu.hinhanh = req.file ? req.file.filename : congcu.hinhanh;
    congcu.congdung = congdung;
    congcu.soluong = soluong;

    const updatedCongcu = await congcu.save();
    res.send({ updatedCongcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach cong cu
congcuRouter.get("/danhsach", async (req, res) => {
  const congcu = await Congcu.find({}).sort({ createdAt: "desc" });
  if (!congcu.length) {
    return res.send({ message: "Không tìm thấy công cụ", success: false });
  }
  res.send({ congcu, success: true });
});

// lay thong tin 1 cong cu
congcuRouter.get("/single/:id", async (req, res) => {
  try {
    const congcu = await Congcu.findById(req.params.id);
    if (congcu) {
      res.send({ congcu, success: true });
    } else {
      res.send({ message: "Không tìm thấy công cụ", success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = congcuRouter;
