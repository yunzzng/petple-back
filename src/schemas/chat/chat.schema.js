const mongoose = require('mongoose');
const { String, ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  from: {
    type: ObjectId,
    required: true,
  },
  to: {
    type: ObjectId,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  paticipants: {
    type: [ObjectId],
    required: true,
  },
  roomId: {
    type: String,
    requried: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
});

const Chat = mongoose.model('chats', chatSchema);
module.exports = Chat;
