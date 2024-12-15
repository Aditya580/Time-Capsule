const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  title: String,
  letter: String,
  date: Date,

  createdBy: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  
});

const Letter = mongoose.model("Letter", letterSchema);
module.exports = Letter;




