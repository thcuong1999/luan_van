const express = require("express");
const Congcu = require("../models/congcuModel");
const Daily1 = require("../models/daily1Model");
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

    savedPhanphat.items.forEach(async (item) => {
      const congcu = await Congcu.findById(item.congcu);
      congcu.soluong = congcu.soluong - item.soluongphanphat;
      await congcu.save();
    });

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

// lay thong tin 1 phan phat based on daily1 (temp)
phanphatRouter.get("/daily1/:id", async (req, res) => {
  try {
    const phanphat = await Phanphat.find({
      "to.daily1": req.params.id,
    })
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
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xac nhan day du
phanphatRouter.put("/xacnhandaydu", async (req, res) => {
  const { phanphatId, items, receiveVaitro, receiveId } = req.body;
  try {
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = "daxn";
    phanphat.hoanthanh = true;
    const updatedPhanphat = await phanphat.save();

    // update congcu field cua daily1, daily2 collection
    if (receiveVaitro === "daily1") {
      const daily1 = await Daily1.findById(receiveId);
      daily1.items = items;
      await daily1.save();
    } else {
      //
    }

    res.send({ updatedPhanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = phanphatRouter;
