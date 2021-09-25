const express = require("express");
const congcuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Congcu = require("../models/congcuModel");

// them cong cu
congcuRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, mota, thuoctinh, congdung, soluong } = req.body;
  const newCongcu = new Congcu({
    ten,
    mota,
    thuoctinh: JSON.parse(thuoctinh),
    hinhanh: req.file ? req.file.filename : "",
    congdung,
    soluong,
  });
  try {
    const savedCongcu = await newCongcu.save();
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
  const congcu = await Congcu.find({});
  res.send({ congcu, success: true });
});

// lay thong tin 1 cong cu
congcuRouter.get("/single/:id", async (req, res) => {
  try {
    const congcu = await Congcu.findById(req.params.id);
    if (congcu) {
      res.send({ congcu, success: true });
    } else {
      res.send({ message: "Khong tim thay cong cu", success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 cong cu
congcuRouter.delete("/single/:id", async (req, res) => {
  try {
    const congcu = await Congcu.findByIdAndDelete(req.params.id);
    if (congcu) {
      return res.send({ message: "Xoa cong cu thanh cong", success: true });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = congcuRouter;
