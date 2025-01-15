const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  GuestID: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  ArrivalStatus: { type: Boolean, default: false },
  TimeOfArrival: { type: Date, default: null },
});

module.exports = mongoose.model("Guest", GuestSchema);
