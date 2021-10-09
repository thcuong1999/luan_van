const express = require("express");
const sanphamRouter = express.Router();
const Sanpham = require("../models/sanphamModel");
const Nhanhieu = require("../models/nhanhieuModel");
const Khohang = require("../models/khohangModel");
const upload = require("../middleware/imageUpload");
const { getCurrentDatetime } = require("../utils");
const Bophankd = require("../models/bophankdModel");

// them moi sp
sanphamRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
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
    bophankdId,
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
    ngaytao: getCurrentDatetime(),
  });

  try {
    // tao sp moi
    let savedSanpham = await sanphammoi.save();
    let savedKhohang;
    // nếu req.body có field bophankdId
    const bpkd = await Bophankd.findById(bophankdId);
    if (bophankdId) {
      // cap nhat field: sanpham
      bpkd.sanpham = [savedSanpham._id, ...bpkd.sanpham];
      // nếu luuvaokho = true -> cap nhat field: khohang
      if (luuvaokho === "true") {
        // - neu field: khohang = null -> create new
        if (!bpkd.khohang) {
          const newKhohang = new Khohang({
            items: [
              {
                sanpham: savedSanpham._id,
                tonkho: savedSanpham.cotheban,
              },
            ],
          });
          savedKhohang = await newKhohang.save();
        } else {
          // - neu field: khohang da ton tai
          // + cap nhat item trong kho hang
          const existKhohang = await Khohang.findById(bpkd.khohang);
          existKhohang.items = [
            {
              sanpham: savedSanpham._id,
              tonkho: savedSanpham.cotheban,
            },
            ...existKhohang.items,
          ];
          // save
          await existKhohang.save();
        }

        // tien hanh cap nhap field: khohang
        if (savedKhohang) {
          bpkd.khohang = savedKhohang._id;
        }
      }
      await bpkd.save();
    }

    res.send({ savedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach san pham
sanphamRouter.get("/danhsach", async (req, res) => {
  const sanpham = await Sanpham.find({})
    .populate("khohang")
    .sort({ createdAt: "desc" });
  res.send({ sanpham, success: true });
});

// lay thong tin 1 san pham
sanphamRouter.get("/single/:id", async (req, res) => {
  const sanpham = await Sanpham.findById(req.params.id);
  res.send({ sanpham, success: true });
});

// lay thong tin 1 san pham
sanphamRouter.get("/single/:id", async (req, res) => {
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
sanphamRouter.put("/single/:id", upload.single("hinhanh"), async (req, res) => {
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

    // nếu req.body có field bophankdId
    // if (bophankdId) {
    //   const bophankd = await Bophankd.findById(bophankdId);
    //   // neu bophankd co' kho hang`
    //   if (bophankd.khohang) {
    //     const kho = await Khohang.findById(bophankd.khohang);
    //   }
    // }

    res.send({ updatedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach loai
sanphamRouter.get("/loai", (req, res) => {
  const loai = ["thucongmynghe", "nongsan", "nguyenlieu"];
  res.send({ loai, success: true });
});

// them nhan hieu
sanphamRouter.post("/nhanhieu", async (req, res) => {
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
sanphamRouter.get("/nhanhieu", async (req, res) => {
  const nhanhieu = await Nhanhieu.find({});
  res.send({ nhanhieu, success: true });
});

module.exports = sanphamRouter;
