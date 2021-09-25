const express = require("express");
const bophankdRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Bophankd = require("../models/bophankdModel");

// them bo phan kd
bophankdRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, sdt, email, diachi, user } = req.body;
  const newBophankd = new Bophankd({ ten, sdt, email, diachi, user });
  try {
    const savedBophankd = await newBophankd.save();
    res.send({ savedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin bpkd based on userID
bophankdRouter.get(
  "/user/:userId",
  upload.single("hinhanh"),
  async (req, res) => {
    try {
      const bophankd = await Bophankd.findOne({ user: req.params.userId });
      res.send({ bophankd, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

module.exports = bophankdRouter;
