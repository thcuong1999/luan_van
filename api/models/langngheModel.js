const mongoose = require("mongoose");

const langngheSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
  },
});

const Langnghe = mongoose.model("Langnghe", langngheSchema);

module.exports = Langnghe;
