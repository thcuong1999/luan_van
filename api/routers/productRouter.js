const express = require("express");
const productRouter = express.Router();
const Sanpham = require("../models/sanphamModel");
const Nhanhieu = require("../models/nhanhieuModel");
const Khohang = require("../models/khohangModel");
const upload = require("../middleware/imageUpload");

// them moi sp
productRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const {
    sku,
    ten,
    mota,
    giabanle,
    giabanbuon,
    loai,
    nhanhieu,
    tags,
    chophepban,
    apdungthue,
    cotheban,
    thuoctinh,
    luuvaokho,
  } = req.body;
  const sanphammoi = new Sanpham({
    sku,
    ten,
    mota,
    giabanle,
    giabanbuon,
    hinhanh: req.file ? req.file.filename : "",
    loai,
    nhanhieu,
    tags,
    chophepban,
    apdungthue,
    cotheban,
    thuoctinh: JSON.parse(thuoctinh),
  });

  try {
    let savedSanpham = await sanphammoi.save();
    // luu vao kho
    let savedKho;
    if (luuvaokho === "true") {
      let sanphamkho = new Khohang({
        sanpham: savedSanpham._id,
        tonkho: savedSanpham.cotheban,
      });
      savedKho = await sanphamkho.save();
      // cap nhat savedSanpham
      savedSanpham.khohang = savedKho._id;
      await savedSanpham.save();
    }
    res.send({ savedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach san pham
productRouter.get("/danhsach", async (req, res) => {
  const sanpham = await Sanpham.find({}).populate("khohang");
  res.send({ sanpham, success: true });
});

// lay thong tin 1 san pham
productRouter.get("/single/:id", async (req, res) => {
  try {
    const sanpham = await Sanpham.findById(req.params.id).populate("khohang");
    if (!sanpham) {
      return res.send({ message: "Khong tim thay san pham", success: false });
    }
    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua thong tin 1 sp
productRouter.put("/single/:id", upload.single("hinhanh"), async (req, res) => {
  const {
    sku,
    ten,
    mota,
    giabanle,
    giabanbuon,
    hinhanh,
    loai,
    nhanhieu,
    tags,
    chophepban,
    apdungthue,
    cotheban,
    thuoctinh,
  } = req.body;
  try {
    const sanpham = await Sanpham.findById(req.params.id);
    sanpham.ten = ten;
    sanpham.sku = sku;
    sanpham.mota = mota;
    sanpham.giabanle = giabanle;
    sanpham.giabanbuon = giabanbuon;
    sanpham.hinhanh = req.file ? req.file.filename : sanpham.hinhanh;
    sanpham.loai = loai;
    sanpham.nhanhieu = nhanhieu;
    sanpham.tags = tags;
    sanpham.chophepban = chophepban;
    sanpham.apdungthue = apdungthue;
    sanpham.cotheban = cotheban;
    sanpham.thuoctinh = JSON.parse(thuoctinh);

    const updatedSanpham = await sanpham.save();
    res.send({ updatedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 san pham
productRouter.delete("/single/:id", async (req, res) => {
  try {
    const sanpham = await Sanpham.findByIdAndDelete(req.params.id);
    if (sanpham) {
      return res.send({ message: "Xoa san pham thanh cong", success: true });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach loai
productRouter.get("/loai", (req, res) => {
  const loai = ["thucongmynghe", "nongsan", "nguyenlieu"];
  res.send({ loai, success: true });
});

// them nhan hieu
productRouter.post("/nhanhieu", async (req, res) => {
  const { tennhanhieu } = req.body;
  const newNhanhieu = new Nhanhieu({ tennhanhieu });
  try {
    const savedNhanhieu = await newNhanhieu.save();
    res.send({ savedNhanhieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach nhan hieu
productRouter.get("/nhanhieu", async (req, res) => {
  const nhanhieu = await Nhanhieu.find({});
  res.send({ nhanhieu, success: true });
});

module.exports = productRouter;
