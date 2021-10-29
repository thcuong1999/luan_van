const express = require("express");
const vattuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Bophankd = require("../models/bophankdModel");
const Vattu = require("../models/vattuModel");
const { getCurrentDatetime } = require("../utils");

// them vat tu
vattuRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, mota, thuoctinh, congdung, soluong, soluongloi, bophankdId } =
    req.body;
  let obj = {
    ten,
    mota,
    thuoctinh: JSON.parse(thuoctinh),
    hinhanh: req.file ? req.file.filename : "",
    congdung,
    slsaukhipp: soluong,
  };

  if (soluong) {
    obj.soluong = soluong;
    obj.ngaytao = getCurrentDatetime();
  } else if (soluongloi) {
    obj.soluongloi = soluongloi;
    obj.ngaybaoloi = getCurrentDatetime();
  }

  const newVattu = new Vattu(obj);
  try {
    const savedVattu = await newVattu.save();

    // neu req.body co field: bophankdId
    if (bophankdId) {
      const bophankd = await Bophankd.findById(bophankdId);
      bophankd.vattu = [savedVattu._id, ...bophankd.vattu];
      await bophankd.save();
    }

    res.send({ savedVattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua vat tu
vattuRouter.put("/single/:id", upload.single("hinhanh"), async (req, res) => {
  const { ten, mota, thuoctinh, congdung, soluong } = req.body;
  try {
    const vattu = await Vattu.findById(req.params.id);
    vattu.ten = ten;
    vattu.mota = mota;
    vattu.thuoctinh = JSON.parse(thuoctinh);
    vattu.hinhanh = req.file ? req.file.filename : vattu.hinhanh;
    vattu.congdung = congdung;
    vattu.soluong = soluong;

    const updatedVattu = await vattu.save();
    res.send({ updatedVattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach vat tu
vattuRouter.get("/danhsach", async (req, res) => {
  const vattu = await Vattu.find({}).sort({ createdAt: "desc" });
  if (!vattu.length) {
    return res.send({ message: "Không tìm thấy công cụ", success: false });
  }
  res.send({ vattu, success: true });
});

// lay thong tin 1 vat tu
vattuRouter.get("/single/:id", async (req, res) => {
  try {
    const vattu = await Vattu.findById(req.params.id);
    if (vattu) {
      res.send({ vattu, success: true });
    } else {
      res.send({ message: "Không tìm thấy công cụ", success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// them vattu hu loi
vattuRouter.put("/themvattuhuloi", async (req, res) => {
  const { dsvattuLoi } = req.body;
  try {
    for (const item of dsvattuLoi) {
      const vattu = await Vattu.findById(item.vattu);
      vattu.soluongloi = item.soluongloi;
      vattu.ngaybaoloi = getCurrentDatetime();
      await vattu.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = vattuRouter;
