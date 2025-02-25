const mongoose = require("mongoose");

const WalkSchema = new Schema<WalkData>(
  {
    startTime: { type: Date, required: true },
    startLocation: { type: String, required: true },
    endTime: { type: Date },
    endLocation: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Walk", WalkSchema);

// 사용자 이름, 사진, 강아지 사진 추가