const mongoose = require('mongoose');
const { String, ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    creator: {
      type: ObjectId,
      required: true,
    },
    post: {
      type: ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reply: {
      type: [ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;
