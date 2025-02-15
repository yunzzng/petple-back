const CommentService = require('../../service/comment/comment.service');
const postService = require('../../service/post/post.service');
const { createError } = require('../../utils/error');

class CommentController {
  async addComment(req, res, next) {
    const { _id: creator } = req.user;
    const { postId, description, hasParent } = req.body;
    if (
      !postId ||
      !description ||
      hasParent === null ||
      hasParent === undefined
    ) {
      return next(createError(400, '댓글 작성에 필요한 정보가 필요합니다.'));
    }
    try {
      const comment = await CommentService.addComment(
        creator,
        postId,
        description,
        hasParent,
      );
      await postService.updatePostById(postId, { comments: comment._id });
      return res.status(200).json({ success: true, comment });
    } catch (error) {
      next(error);
    }
  }

  async addReply(req, res, next) {
    const user = req.user;
    const { targetCommentId, description, tag } = req.body;
    try {
      await CommentService.addReply(targetCommentId, {
        _id: user._id,
        name: user.name,
        nickname: user.nickName,
        profileImage: user.profileImage,
        email: user.email,
        description,
        tag,
      });
      return res.status(200).json({ success: true, message: '답글 성공' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CommentController();
