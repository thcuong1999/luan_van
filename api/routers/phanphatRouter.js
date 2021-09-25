const express = require("express");
const Phanphat = require("../models/phanphatModel");
const { getCurrentDatetime } = require("../utils");
const phanphatRouter = express.Router();

// them phan phat
phanphatRouter.post("/them", async (req, res) => {
  const { items, from, to } = req.body;
  try {
    const phanphatmoi = new Phanphat({
      items,
      from,
      to,
      thieu: [],
      ngaytao: getCurrentDatetime(),
    });
    const savedPhanphat = await phanphatmoi.save();
    res.send({ savedPhanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// danh sach phan phat
phanphatRouter.get("/danhsach", async (req, res) => {
  try {
    const dsphanphat = await Phanphat.find()
      .populate({
        path: "from",
        populate: { path: "bophankd", model: "Bophankd" },
      })
      .populate({
        path: "from",
        populate: { path: "daily1", model: "Daily1" },
      })
      .populate({
        path: "from",
        populate: { path: "daily2", model: "Daily2" },
      })
      .populate({
        path: "to",
        populate: { path: "daily1", model: "Daily1" },
      })
      .populate({
        path: "to",
        populate: { path: "daily2", model: "Daily2" },
      })
      .populate({
        path: "to",
        populate: { path: "hodan", model: "Hodan" },
      });

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 phan phat
phanphatRouter.get("/single/:id", async (req, res) => {
  try {
    const phanphat = await Phanphat.findById(req.params.id)
      .populate({
        path: "from",
        populate: { path: "bophankd", model: "Bophankd" },
      })
      .populate({
        path: "from",
        populate: { path: "daily1", model: "Daily1" },
      })
      .populate({
        path: "from",
        populate: { path: "daily2", model: "Daily2" },
      })
      .populate({
        path: "to",
        populate: { path: "daily1", model: "Daily1" },
      })
      .populate({
        path: "to",
        populate: { path: "daily2", model: "Daily2" },
      })
      .populate({
        path: "to",
        populate: { path: "hodan", model: "Hodan" },
      })
      .populate({
        path: "items",
        populate: { path: "congcu", model: "Congcu" },
      });
    if (!phanphat) {
      return res.send({ message: "Không tìm thấy record", success: false });
    }
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = phanphatRouter;
