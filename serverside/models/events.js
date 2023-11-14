const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventLength: { type: String, required: true },
  eventTime: { type: String, required: true },
});
module.exports = mongoose.model("Event", eventSchema, "Events");
