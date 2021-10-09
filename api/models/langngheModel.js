const mongoose = require("mongoose");

const langngheSchema = new mongoose.Schema({
  ten: String,
  tinh: String,
  huyen: String,
  sanphamchinh: {
    type: String,
    enum: ["thucongmynghe", "nongsan", "nguyenlieu"],
  },
  giamsatvung: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Giamsatvung",
  },
  hodan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hodan",
    },
  ],
});

const Langnghe = mongoose.model("Langnghe", langngheSchema);

module.exports = Langnghe;
