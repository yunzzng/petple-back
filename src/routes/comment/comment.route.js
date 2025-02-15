const CommentController = require('../../controllers/comment/comment.controller');
const { token } = require('../../middleware/token.middleware');

const commentRoutes = require('express').Router();

commentRoutes.post('/', token, CommentController.addComment);
commentRoutes.post('/reply', token, CommentController.addReply);
commentRoutes.delete(
  '/:commentId/replies/:replyId',
  token,
  CommentController.deleteReply,
);
commentRoutes.patch(
  '/:commentId/replies/:replyId',
  token,
  CommentController.updateReply,
);

module.exports = commentRoutes;
