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
    ma,
    ten,
    mota,
    giabanle,
    giabanbuon,
    loai,
    nhanhieu,
    chophepban,
    apdungthue,
    cotheban,
    thuoctinh,
  } = req.body;
  const sanphammoi = new Sanpham({
    ma,
    ten,
    mota,
    giabanle,
    giabanbuon,
    hinhanh: req.file ? req.file.filename : "",
    loai,
    nhanhieu,
    chophepban,
    apdungthue,
    cotheban,
    thuoctinh: JSON.parse(thuoctinh),
    ngaytao: getCurrentDatetime(),
  });

  try {
    // tao sp moi
    let savedSanpham = await sanphammoi.save();

    // let savedKhohang;
    // // nếu req.body có field bophankdId
    // const bpkd = await Bophankd.findById(bophankdId);
    // if (bophankdId) {
    //   // cap nhat field: sanpham
    //   bpkd.sanpham = [savedSanpham._id, ...bpkd.sanpham];
    //   // nếu luuvaokho = true -> cap nhat field: khohang
    //   if (luuvaokho === "true") {
    //     // - neu field: khohang = null -> create new
    //     if (!bpkd.khohang) {
    //       const newKhohang = new Khohang({
    //         items: [
    //           {
    //             sanpham: savedSanpham._id,
    //             tonkho: savedSanpham.cotheban,
    //           },
    //         ],
    //       });
    //       savedKhohang = await newKhohang.save();
    //     } else {
    //       // - neu field: khohang da ton tai
    //       // + cap nhat item trong kho hang
    //       const existKhohang = await Khohang.findById(bpkd.khohang);
    //       existKhohang.items = [
    //         {
    //           sanpham: savedSanpham._id,
    //           tonkho: savedSanpham.cotheban,
    //         },
    //         ...existKhohang.items,
    //       ];
    //       // save
    //       await existKhohang.save();
    //     }

    //     // tien hanh cap nhap field: khohang
    //     if (savedKhohang) {
    //       bpkd.khohang = savedKhohang._id;
    //     }
    //   }
    //   await bpkd.save();
    // }

    res.send({ savedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach san pham
sanphamRouter.get("/danhsach", async (req, res) => {
  try {
    const sanpham = await Sanpham.find({}).sort({ createdAt: "desc" });
    if (!sanpham) {
      return res.send({ message: "Không tìm thấy sản phẩm", success: false });
    }

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach san pham Chua nam trong 1 bophankd cu the
sanphamRouter.get("/dsspchuacobopkd/:bophankdId", async (req, res) => {
  try {
    const { sanpham: bophankdSanpham } = await Bophankd.findById(
      req.params.bophankdId
    ).select("sanpham");
    let sanpham = await Sanpham.find({});
    sanpham = sanpham.filter(
      (item) => !bophankdSanpham.includes(item._id.toString())
    );

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 san pham
sanphamRouter.get("/single/:id", async (req, res) => {
  try {
    const sanpham = await Sanpham.findById(req.params.id);
    if (!sanpham) {
      return res.send({ message: "Không tìm thấy sản phẩm", success: false });
    }
    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// sua thong tin 1 sp
sanphamRouter.put("/single/:id", upload.single("hinhanh"), async (req, res) => {
  const {
    ma,
    ten,
    mota,
    giabanle,
    giabanbuon,
    loai,
    nhanhieu,
    chophepban,
    apdungthue,
    cotheban,
    thuoctinh,
  } = req.body;
  try {
    const sanpham = await Sanpham.findById(req.params.id);
    sanpham.ma = ma;
    sanpham.ten = ten;
    sanpham.mota = mota;
    sanpham.giabanle = giabanle;
    sanpham.giabanbuon = giabanbuon;
    sanpham.hinhanh = req.file ? req.file.filename : sanpham.hinhanh;
    sanpham.loai = loai;
    sanpham.nhanhieu = nhanhieu;
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

// Xoa nhieu san pham
sanphamRouter.put("/xoanhieusanpham", async (req, res) => {
  const { arrOfIds } = req.body;
  try {
    for (const item of arrOfIds) {
      await Sanpham.findByIdAndDelete(item);
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = sanphamRouter;
