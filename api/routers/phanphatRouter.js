const express = require("express");
const Bophankd = require("../models/bophankdModel");
const Congcu = require("../models/congcuModel");
const Daily1 = require("../models/daily1Model");
const Daily2 = require("../models/daily2Model");
const Phanphat = require("../models/phanphatModel");
const Hodan = require("../models/hodanModel");
const { getCurrentDatetime } = require("../utils");
const Vattu = require("../models/vattuModel");
const phanphatRouter = express.Router();

// them phat phat (cong cu)
phanphatRouter.post("/them", async (req, res) => {
  const { payload } = req.body;
  try {
    // Phanphat collection
    const newPhanphat = new Phanphat({
      ...payload,
      trangthai: {
        daily1: "choxn",
      },
      phanphattype: "congcu",
      ngaytao: getCurrentDatetime(),
    });
    const savedPhanphat = await newPhanphat.save();
    // nếu tạo phân phát thành công -> giảm số lượng công cụ đã phân phát đi
    if (savedPhanphat) {
      // Congcu collection
      for (const item of payload.items) {
        const congcu = await Congcu.findById(item.congcu);
        congcu.slsaukhipp = congcu.slsaukhipp - item.soluongphanphat;
        await congcu.save();
      }
      // Bophankd collection
      const bpkdId = payload.from.bophankd;
      const bpkd = await Bophankd.findById(bpkdId);
      bpkd.dsphanphat = [{ phanphat: savedPhanphat._id }, ...bpkd.dsphanphat];
      await bpkd.save();
      // Daily1 collection
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

// cap nhat 1 phat phat CONG CU
phanphatRouter.put("/single/:id", async (req, res) => {
  const { phanphatId, payload } = req.body;
  try {
    const phanphat = await Phanphat.findById(phanphatId);
    const payloadItemsArr = payload.items.map((x) => x.congcu);
    // update congcu reference
    for (const item of phanphat.items) {
      if (payloadItemsArr.includes(item.congcu.toString())) {
        let newSoluongpp = payload.items.find(
          (i) => i.congcu == item.congcu.toString()
        ).soluongphanphat;
        const ccu = await Congcu.findById(item.congcu.toString());
        ccu.slsaukhipp =
          ccu.slsaukhipp + item.soluongphanphat - parseInt(newSoluongpp);
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

// lay danh sach cong cu
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
    const phanphat = await Phanphat.findById(req.params.id).populate({
      path: "from to items",
      populate: {
        path: "bophankd daily1 daily2 hodan vattu congcu",
      },
    });

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

// nhap cong cu vao kho
phanphatRouter.put("/nhapkhocongcu", async (req, res) => {
  const { items, daily1Id, phanphatId, daily2Id } = req.body;
  try {
    if (daily1Id) {
      // cap nhat trang thai Phanphat coll
      const phanphat = await Phanphat.findById(phanphatId);
      phanphat.trangthai = { daily1: "daxn" };
      await phanphat.save();
      // nhap kho cho dai ly 1
      const daily1 = await Daily1.findById(daily1Id);
      daily1.items = [
        ...items.map((item) => ({
          ...item,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: false,
        })),
        ...daily1.items,
      ];
      daily1.dsphanphat = daily1.dsphanphat.map((item) =>
        item.phanphat.toString() === phanphatId
          ? { phanphat: phanphatId, daphanphatxuong: false, danhapkho: true }
          : item
      );
      await daily1.save();
    } else if (daily2Id) {
      // cap nhat trang thai Phanphat coll
      const phanphat = await Phanphat.findById(phanphatId);
      phanphat.trangthai = { daily1: "daxn", daily2: "daxn" };
      await phanphat.save();
      // nhap kho cho dai ly 2
      const daily2 = await Daily2.findById(daily2Id);
      daily2.items = [
        ...items.map((item) => ({
          ...item,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: false,
        })),
        ...daily2.items,
      ];
      daily2.dsphanphat = daily2.dsphanphat.map((item) =>
        item.phanphat.toString() === phanphatId
          ? { phanphat: phanphatId, daphanphatxuong: false, danhapkho: true }
          : item
      );
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily1 phanphat -> daily2
phanphatRouter.put("/daily1ppdaily2", async (req, res) => {
  const { phanphatId, daily2Id, daily1Id } = req.body;
  try {
    // update Phanphat coll
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = { daily1: "daxn", daily2: "choxn" };
    await phanphat.save();
    // update Daily2 coll
    const daily2 = await Daily2.findById(daily2Id);
    daily2.dsphanphat = [
      {
        phanphat: phanphatId,
        daphanphatxuong: false,
        danhapkho: false,
      },
      ...daily2.dsphanphat,
    ];
    await daily2.save();
    // update Daily1 coll
    const daily1 = await Daily1.findById(daily1Id);
    const danhapkho = daily1.dsphanphat.find(
      (item) => item.phanphat.toString() === phanphatId
    )?.danhapkho;
    if (!danhapkho) {
      // nếu chưa nhập kho => nhập kho cc
      daily1.items = [
        ...phanphat.items.map((item) => ({
          congcu: item.congcu,
          soluongphanphat: item.soluongphanphat,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: true,
          phanphat: phanphatId,
        })),
        ...daily1.items,
      ];
    } else {
      daily1.items = daily1.items.map((item) =>
        item.phanphat.toString() === phanphatId
          ? {
              congcu: item.congcu,
              soluongphanphat: item.soluongphanphat,
              ngaytiepnhan: item.ngaytiepnhan,
              daphanphat: true,
              phanphat: item.phanphat,
            }
          : item
      );
    }

    daily1.dsphanphat = daily1.dsphanphat.map((item) =>
      item.phanphat.toString() === phanphatId
        ? { phanphat: item.phanphat, daphanphatxuong: true, danhapkho: true }
        : item
    );
    await daily1.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily2 phanphat -> hodan
phanphatRouter.put("/daily2pphodan", async (req, res) => {
  const { phanphatId, hodanId, daily2Id } = req.body;
  try {
    // update Phanphat coll
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = { daily1: "daxn", daily2: "daxn", hodan: "choxn" };
    await phanphat.save();
    // them phan phat vao Hodan collection
    const hodan = await Hodan.findById(hodanId);
    hodan.dsphanphat = [
      {
        phanphat: phanphatId,
        daxacnhan: false,
      },
      ...hodan.dsphanphat,
    ];
    await hodan.save();
    // update Daily2 collection
    const daily2 = await Daily2.findById(daily2Id);
    const danhapkho = daily2.dsphanphat.find(
      (item) => item.phanphat.toString() === phanphatId
    )?.danhapkho;
    if (!danhapkho) {
      // nếu chưa nhập kho => nhập kho cc
      daily2.items = [
        ...phanphat.items.map((item) => ({
          congcu: item.congcu,
          soluongphanphat: item.soluongphanphat,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: true,
          phanphat: phanphatId,
        })),
        ...daily2.items,
      ];
    } else {
      daily2.items = daily2.items.map((item) =>
        item.phanphat.toString() === phanphatId
          ? {
              congcu: item.congcu,
              soluongphanphat: item.soluongphanphat,
              ngaytiepnhan: item.ngaytiepnhan,
              daphanphat: true,
              phanphat: item.phanphat,
            }
          : item
      );
    }

    daily2.dsphanphat = daily2.dsphanphat.map((item) =>
      item.phanphat.toString() === phanphatId
        ? { phanphat: item.phanphat, daphanphatxuong: true, danhapkho: true }
        : item
    );
    await daily2.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// hoan thanh phan phat (ho dan xac nhan)
phanphatRouter.put("/hoanthanhpp", async (req, res) => {
  const { phanphatId, hodanId, dsCongcu } = req.body;
  try {
    // Phanphat collection
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = { daily1: "daxn", daily2: "daxn", hodan: "daxn" };
    phanphat.hoanthanh = true;
    await phanphat.save();

    // Hodan collection
    const hodan = await Hodan.findById(hodanId);
    hodan.items = [
      ...dsCongcu.map((item) => ({
        congcu: item.congcu,
        soluongphanphat: item.soluongphanphat,
        ngaytiepnhan: getCurrentDatetime(),
        phanphat: phanphatId,
      })),
      ...hodan.items,
    ];
    hodan.dsphanphat = hodan.dsphanphat.map((item) =>
      item.phanphat.toString() === phanphatId
        ? { phanphat: phanphatId, daxacnhan: true }
        : item
    );
    await hodan.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// ==============================================================================================

// them phat phat (vattu)
phanphatRouter.post("/themppvattu", async (req, res) => {
  const { payload } = req.body;
  try {
    // Phanphat collection
    const newPhanphat = new Phanphat({
      ...payload,
      trangthai: {
        daily1: "choxn",
      },
      ngaytao: getCurrentDatetime(),
      phanphattype: "vattu",
    });
    const savedPhanphat = await newPhanphat.save();
    // nếu tạo phân phát thành công -> giảm số lượng vat tu đã phân phát đi
    if (savedPhanphat) {
      // Vattu collection
      for (const item of payload.items) {
        const vattu = await Vattu.findById(item.vattu);
        vattu.slsaukhipp = vattu.slsaukhipp - item.soluongphanphat;
        await vattu.save();
      }
      // Bophankd collection
      const bpkdId = payload.from.bophankd;
      const bpkd = await Bophankd.findById(bpkdId);
      bpkd.dsphanphat = [{ phanphat: savedPhanphat._id }, ...bpkd.dsphanphat];
      await bpkd.save();
      // Daily1 collection
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

// lay danh sach phan phat vat tu thuoc bophankdId
phanphatRouter.get("/dsvattuphanphat/:bophankdId", async (req, res) => {
  try {
    let { dsphanphat } = await Bophankd.findById(req.params.bophankdId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan vattu",
            },
          },
        },
      });
    dsphanphat = dsphanphat.filter(
      (item) => item.phanphat.phanphattype === "vattu"
    );

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat cong cu thuoc bophankdId
phanphatRouter.get("/dscongcuphanphat/:bophankdId", async (req, res) => {
  try {
    let { dsphanphat } = await Bophankd.findById(req.params.bophankdId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan congcu",
            },
          },
        },
      });
    dsphanphat = dsphanphat.filter(
      (item) => item.phanphat.phanphattype === "congcu"
    );

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat 1 phat phat VAT TU
phanphatRouter.put("/capnhatvattupp/:id", async (req, res) => {
  const { phanphatId, payload } = req.body;
  try {
    // Phanphat collection
    const phanphat = await Phanphat.findById(phanphatId);
    const payloadItemsArr = payload.items.map((x) => x.vattu);
    // Vattu collection
    for (const item of phanphat.items) {
      if (payloadItemsArr.includes(item.vattu.toString())) {
        let newSoluongpp = payload.items.find(
          (i) => i.vattu == item.vattu.toString()
        ).soluongphanphat;
        const vattu = await Vattu.findById(item.vattu.toString());
        vattu.slsaukhipp =
          vattu.slsaukhipp + item.soluongphanphat - parseInt(newSoluongpp);
        await vattu.save();
      } else {
        // not includes
        let oldSoluongpp = phanphat.items.find(
          (i) => i.vattu.toString() == item.vattu.toString()
        ).soluongphanphat;
        const vattu = await Vattu.findById(item.vattu.toString());
        vattu.slsaukhipp = vattu.slsaukhipp + oldSoluongpp;
        await vattu.save();
      }
    }
    // Phanphat collection
    phanphat.items = payload.items;
    phanphat.from = payload.from;
    phanphat.to = payload.to;
    const updatedPhanphat = await phanphat.save();

    res.send({ updatedPhanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// nhap VAT TU vao kho
phanphatRouter.put("/nhapkhovattu", async (req, res) => {
  const { items, daily1Id, phanphatId, daily2Id } = req.body;
  try {
    if (daily1Id) {
      // Phanphat collection
      const phanphat = await Phanphat.findById(phanphatId);
      phanphat.trangthai = { daily1: "daxn" };
      await phanphat.save();
      // Daily collection
      const daily1 = await Daily1.findById(daily1Id);
      daily1.items = [
        ...items.map((item) => ({
          ...item,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: false,
        })),
        ...daily1.items,
      ];
      daily1.dsphanphat = daily1.dsphanphat.map((item) =>
        item.phanphat.toString() === phanphatId
          ? { phanphat: phanphatId, daphanphatxuong: false, danhapkho: true }
          : item
      );
      await daily1.save();
    } else if (daily2Id) {
      // Phanphat collection
      const phanphat = await Phanphat.findById(phanphatId);
      phanphat.trangthai = { daily1: "daxn", daily2: "daxn" };
      await phanphat.save();
      // nhap kho cho dai ly 2
      const daily2 = await Daily2.findById(daily2Id);
      daily2.items = [
        ...items.map((item) => ({
          ...item,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: false,
        })),
        ...daily2.items,
      ];
      daily2.dsphanphat = daily2.dsphanphat.map((item) =>
        item.phanphat.toString() === phanphatId
          ? { phanphat: phanphatId, daphanphatxuong: false, danhapkho: true }
          : item
      );
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily1 phanphat VAT TU -> daily2
phanphatRouter.put("/daily1ppvattudaily2", async (req, res) => {
  const { phanphatId, daily2Id, daily1Id } = req.body;
  try {
    // update Phanphat collection
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = { daily1: "daxn", daily2: "choxn" };
    await phanphat.save();
    // update Daily2 collection
    const daily2 = await Daily2.findById(daily2Id);
    daily2.dsphanphat = [
      {
        phanphat: phanphatId,
        daphanphatxuong: false,
        danhapkho: false,
      },
      ...daily2.dsphanphat,
    ];
    await daily2.save();
    // update Daily1 collection
    const daily1 = await Daily1.findById(daily1Id);
    const danhapkho = daily1.dsphanphat.find(
      (item) => item.phanphat.toString() === phanphatId
    )?.danhapkho;
    if (!danhapkho) {
      // nếu chưa nhập kho => nhập kho congcu
      daily1.items = [
        ...phanphat.items.map((item) => ({
          vattu: item.vattu,
          soluongphanphat: item.soluongphanphat,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: true,
          phanphat: phanphatId,
        })),
        ...daily1.items,
      ];
    } else {
      daily1.items = daily1.items.map((item) =>
        item.phanphat.toString() === phanphatId
          ? {
              vattu: item.vattu,
              soluongphanphat: item.soluongphanphat,
              ngaytiepnhan: item.ngaytiepnhan,
              daphanphat: true,
              phanphat: item.phanphat,
            }
          : item
      );
    }

    daily1.dsphanphat = daily1.dsphanphat.map((item) =>
      item.phanphat.toString() === phanphatId
        ? { phanphat: item.phanphat, daphanphatxuong: true, danhapkho: true }
        : item
    );
    await daily1.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily2 phanphat VAT TU -> hodan
phanphatRouter.put("/daily2ppvattuhodan", async (req, res) => {
  const { phanphatId, hodanId, daily2Id } = req.body;
  try {
    // Phanphat collection
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = { daily1: "daxn", daily2: "daxn", hodan: "choxn" };
    await phanphat.save();
    // Hodan collection
    const hodan = await Hodan.findById(hodanId);
    hodan.dsphanphat = [
      {
        phanphat: phanphatId,
        daxacnhan: false,
      },
      ...hodan.dsphanphat,
    ];
    await hodan.save();
    // Daily2 collection
    const daily2 = await Daily2.findById(daily2Id);
    const danhapkho = daily2.dsphanphat.find(
      (item) => item.phanphat.toString() === phanphatId
    )?.danhapkho;
    if (!danhapkho) {
      // nếu chưa nhập kho => nhập kho cc
      daily2.items = [
        ...phanphat.items.map((item) => ({
          vattu: item.vattu,
          soluongphanphat: item.soluongphanphat,
          ngaytiepnhan: getCurrentDatetime(),
          daphanphat: true,
          phanphat: phanphatId,
        })),
        ...daily2.items,
      ];
    } else {
      daily2.items = daily2.items.map((item) =>
        item.phanphat.toString() === phanphatId
          ? {
              vattu: item.vattu,
              soluongphanphat: item.soluongphanphat,
              ngaytiepnhan: item.ngaytiepnhan,
              daphanphat: true,
              phanphat: item.phanphat,
            }
          : item
      );
    }

    daily2.dsphanphat = daily2.dsphanphat.map((item) =>
      item.phanphat.toString() === phanphatId
        ? { phanphat: item.phanphat, daphanphatxuong: true, danhapkho: true }
        : item
    );
    await daily2.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// hoan thanh phan phat (ho dan xac nhan) VAT TU
phanphatRouter.put("/hoanthanhvattupp", async (req, res) => {
  const { phanphatId, hodanId, dsVattu } = req.body;
  try {
    // Phanphat collection
    const phanphat = await Phanphat.findById(phanphatId);
    phanphat.trangthai = { daily1: "daxn", daily2: "daxn", hodan: "daxn" };
    phanphat.hoanthanh = true;
    await phanphat.save();

    // Hodan collection
    const hodan = await Hodan.findById(hodanId);
    hodan.items = [
      ...dsVattu.map((item) => ({
        vattu: item.vattu,
        soluongphanphat: item.soluongphanphat,
        ngaytiepnhan: getCurrentDatetime(),
        phanphat: phanphatId,
      })),
      ...hodan.items,
    ];
    hodan.dsphanphat = hodan.dsphanphat.map((item) =>
      item.phanphat.toString() === phanphatId
        ? { phanphat: phanphatId, daxacnhan: true }
        : item
    );
    await hodan.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = phanphatRouter;
