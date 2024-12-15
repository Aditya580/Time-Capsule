const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const letterSchema = new mongoose.Schema({
  tittle: String,
  letter: String,
  date: Number,
  time: Number,

  createdBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

letterSchema.plugin(plm);
const Letter = mongoose.model("letter", letterSchema);

module.exports = Letter;
