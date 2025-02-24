const mongoose = require('mongoose');
const {
  getCoordinates,
} = require('../../controllers/openApi/kakao.controller');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    userPet: [
      {
        type: ObjectId,
        required: false,
        ref: 'pets',
      },
    ],
    userType: {
      type: String,
      required: true,
      enum: ['local', 'google'],
      default: 'local',
    },
    address: {
      jibunAddress: { type: String, default: '' },
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
          required: true,
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('users', userSchema);
