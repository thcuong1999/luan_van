const express = require("express");
const Bophankd = require("../models/bophankdModel");
const Congcu = require("../models/congcuModel");
const Daily1 = require("../models/daily1Model");
const Phanphat = require("../models/phanphatModel");
const { getCurrentDatetime } = require("../utils");
const phanphatRouter = express.Router();

// them phat phat (cong cu)
phanphatRouter.post("/them", async (req, res) => {
  const { payload } = req.body;
  try {
    const newPhanphat = new Phanphat({
      ...payload,
      ngaytao: getCurrentDatetime(),
    });
    const savedPhanphat = await newPhanphat.save();
    // nếu tạo phân phát thành công -> giảm số lượng công cụ đã phân phát đi
    if (savedPhanphat) {
      // giam so luong cong cu
      for (const item of payload.items) {
        const congcu = await Congcu.findById(item.congcu);
        congcu.slsaukhipp = congcu.slsaukhipp - item.soluongphanphat;
        await congcu.save();
      }
      // update field dsphanphat của Bophankd collection
      const bpkdId = payload.from.bophankd;
      const bpkd = await Bophankd.findById(bpkdId);
      bpkd.dsphanphat = [{ phanphat: savedPhanphat._id }, ...bpkd.dsphanphat];
      await bpkd.save();
      // update field dsphanphat của Daily1 collection
      const dl1Id = payload.to.daily1;
      const dl1 = await Daily1.findById(dl1Id);
      dl1.dsphanphat = [
        { phanphat: savedPhanphat._id, daphanphatxuong: false },
        ...dl1.dsphanphat,
      ];
      await dl1.save();
    }
    res.send({ savedPhanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat 1 phat phat
phanphatRouter.put("/single/:id", async (req, res) => {
  const { phanphatId, payload } = req.body;
  try {
    const phanphat = await Phanphat.findById(phanphatId);
    const payloadItemsArr = payload.items.map((x) => x.congcu);
    // update congcu reference
    let arr = [];
    for (const item of phanphat.items) {
      if (payloadItemsArr.includes(item.congcu.toString())) {
        let newSoluongpp = payload.items.find(
          (i) => i.congcu == item.congcu.toString()
        ).soluongphanphat;
        const ccu = await Congcu.findById(item.congcu.toString());
        ccu.slsaukhipp = ccu.soluong - parseInt(newSoluongpp);
        await ccu.save();
      } else {
        // not includes
        let oldSoluongpp = phanphat.items.find(
          (i) => i.congcu.toString() == item.congcu.toString()
        ).soluongphanphat;
        const ccu = await Congcu.findById(item.congcu.toString());
        ccu.slsaukhipp = ccu.slsaukhipp + oldSoluongpp;
        await ccu.save();
      }
    }
    // update field: items, collection: Phanphat
    phanphat.items = payload.items;
    phanphat.from = payload.from;
    phanphat.to = payload.to;
    const updatedPhanphat = await phanphat.save();

    res.send({ updatedPhanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat
phanphatRouter.get("/danhsach", async (req, res) => {
  try {
    const phanphat = await Phanphat.find({})
      .populate("from.bophankd")
      .populate("from.daily1")
      .populate("from.daily2")
      .populate("to.daily1")
      .populate("to.daily2")
      .populate("to.hodan");

    if (!phanphat.length) {
      return res.send({
        message: "Không tìm thấy phân phát nào",
        success: false,
      });
    }
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 phan phat
phanphatRouter.get("/single/:id", async (req, res) => {
  try {
    const phanphat = await Phanphat.findById(req.params.id)
      .populate("items.congcu")
      .populate("from.bophankd")
      .populate("from.daily1")
      .populate("from.daily2")
      .populate("to.daily1")
      .populate("to.daily2")
      .populate("to.hodan");

    if (!phanphat) {
      return res.send({
        message: "Không tìm thấy phân phát nào",
        success: false,
      });
    }
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = phanphatRouter;
