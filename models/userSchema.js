const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,

  letter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "letter",
    },
  ],
});

userSchema.plugin(plm);
const User = mongoose.model("user", userSchema);
module.exports = User;
