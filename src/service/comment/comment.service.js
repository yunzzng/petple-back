const Comment = require('../../schemas/comment/comment.schema');

class CommentService {
  async addComment(creator, post, description, hasParent) {
    try {
      const document = await Comment.create({
        creator,
        post,
        description,
        hasParent,
      });
      return document;
    } catch (error) {
      throw new Error(`[DB에러] CommentService.addComment`, { cause: error });
    }
  }

  async addReply(
    commentId,
    { _id: creatorId, name, nickname, profileImage, email, description, tag },
  ) {
    try {
      const document = await Comment.findByIdAndUpdate(commentId, {
        $addToSet: {
          replies: {
            creatorId,
            name,
            nickname,
            profileImage,
            email,
            description,
            tag,
          },
        },
      });
      return document;
    } catch (error) {
      throw new Error(`[DB에러] CommentService.addReply`, { cause: error });
    }
  }

  async deleteReply(commentId, replyId) {
    try {
      await Comment.findByIdAndUpdate(commentId, {
        $pull: { replies: { _id: replyId } },
      });
    } catch (error) {
      throw new Error('[DB에러] CommentService.deleteReply', { cause: error });
    }
  }
}

module.exports = new CommentService();
