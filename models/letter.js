const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  subject: { type: String, required: true },    // Email subject
  message: { type: String, required: true },    // Email body
  scheduleDate: { type: Date, required: true }, // Date and time to send the email
  sent: { type: Boolean, default: false },      // Whether the email has been sent
  owner: {                                      // Reference to the user who scheduled the email
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Letter = mongoose.model("Letter", letterSchema);
module.exports = Letter;
