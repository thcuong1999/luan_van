const express = require("express");
const tiendoRouter = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const Tiendo = require("../models/TiendoModel");
const upload = require("../middleware/imageUpload");

// Them tien do
tiendoRouter.post("/them", async (req, res) => {
  const { hodanId, tiendo } = req.body;
  try {
    const newTiendo = new Tiendo({
      hodan: hodanId,
      ...tiendo,
    });
    const savedTiendo = await newTiendo.save();

    res.send({ savedTiendo, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Chinh sua tien do
tiendoRouter.put("/chinhsua/:tiendoId", async (req, res) => {
  const { newTiendo } = req.body;
  try {
    const tiendo = await Tiendo.findById(req.params.tiendoId);
    tiendo.ten = newTiendo.ten;
    tiendo.noidung = newTiendo.noidung;
    tiendo.sanpham = newTiendo.sanpham;
    tiendo.dientich = newTiendo.dientich;
    tiendo.donvi = newTiendo.donvi;
    tiendo.thoigianbatdau = newTiendo.thoigianbatdau;
    tiendo.thoigianthuhoach = newTiendo.thoigianthuhoach;
    const updatedTiendo = await tiendo.save();

    res.send({ updatedTiendo, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Lay danh sach tien do thuoc hodanId
tiendoRouter.get("/dstiendo/:hodanId", async (req, res) => {
  try {
    let dstiendo = await Tiendo.find({}).sort({ createdAt: "desc" });
    dstiendo = dstiendo.filter(
      (item) => item.hodan.toString() === req.params.hodanId
    );

    res.send({ dstiendo, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// get single tiendo
tiendoRouter.get("/single/:tiendoId", async (req, res) => {
  try {
    const tiendo = await Tiendo.findById(req.params.tiendoId);

    res.send({ tiendo, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Them bao cao
tiendoRouter.put(
  "/thembaocao/:tiendoId",
  upload.single("hinhanh"),
  async (req, res) => {
    const { ten, noidung, thoigian } = req.body;
    try {
      const tiendo = await Tiendo.findById(req.params.tiendoId);
      tiendo.baocao = [
        {
          ten,
          noidung,
          hinhanh: req.file ? req.file.filename : "",
          thoigian,
        },
        ...tiendo.baocao,
      ];
      const savedBaocao = tiendo.save();

      res.send({ savedBaocao, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// lay danh sach bao cao thuoc 1 tiendoId
tiendoRouter.get("/dsbaocao/:tiendoId", async (req, res) => {
  try {
    const dsbaocao = await Tiendo.findById(req.params.tiendoId).select(
      "baocao"
    );

    res.send({ dsbaocao, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay 1 bao cao thuoc tiendoId
tiendoRouter.get("/singlebaocao/:tiendoId/:baocaoId", async (req, res) => {
  try {
    const tiendo = await Tiendo.findById(req.params.tiendoId).select("baocao");
    const baocao = tiendo.baocao.find(
      (item) => item._id.toString() === req.params.baocaoId
    );

    res.send({ baocao, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat 1 bao cao thuoc tiendoId
tiendoRouter.put(
  "/singlebaocao/:tiendoId/:baocaoId",
  upload.single("hinhanh"),
  async (req, res) => {
    const { ten, noidung } = req.body;
    try {
      const tiendo = await Tiendo.findById(req.params.tiendoId).select(
        "baocao"
      );
      tiendo.baocao = tiendo.baocao.map((item) =>
        item._id.toString() === req.params.baocaoId
          ? {
              _id: req.params.baocaoId,
              ten: ten,
              noidung: noidung,
              hinhanh: req.file ? req.file.filename : item.hinhanh,
              thoigian: item.thoigian,
            }
          : item
      );
      const updatedBaocao = await tiendo.save();

      res.send({ updatedBaocao, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

module.exports = tiendoRouter;
