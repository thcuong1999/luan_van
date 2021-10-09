const express = require("express");
const Congcu = require("../models/congcuModel");
const Daily1 = require("../models/daily1Model");
const Phanphat = require("../models/phanphatModel");
const { getCurrentDatetime } = require("../utils");
const phanphatRouter = express.Router();

// them phat phat (cong cu)
phanphatRouter.post("/them", async (req, res) => {
  //
});

module.exports = phanphatRouter;
