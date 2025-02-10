const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model('pet', petSchema);
