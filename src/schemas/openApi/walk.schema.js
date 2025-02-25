const mongoose = require("mongoose");

const WalkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  petId: { type: String, required: true },
  startTime: { type: String, required: true },
  startLocation: { type: String, required: true },
  endTime: { type: String, required: true },
  endLocation: { type: String, required: true },
});

module.exports =  mongoose.model("Walk", WalkSchema);