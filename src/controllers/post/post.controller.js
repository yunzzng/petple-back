const PostService = require('../../service/post/post.service');

class PostController {
  async addPost(req, res, next) {
    const userId = '67ac7df46fa39327495f1515';
    const { tags, images, description } = req.body;
    try {
      await PostService.createPost(tags, images, description, userId);
      return res
        .status(201)
        .json({ success: true, message: '게시글 작성에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
