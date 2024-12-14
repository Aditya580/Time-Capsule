const mongoose = require("mongoose");

exports.connect = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.cluter);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
