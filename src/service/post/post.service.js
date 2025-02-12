const Post = require('../../schemas/post/post.schema');

class PostService {
  async createPost(tags, images, description, userId) {
    try {
      await Post.create({ creator: userId, tags, images, description });
    } catch (error) {
      throw new Error(`[DB에러] PostService.createPost`, { cause: error });
    }
  }
}

module.exports = new PostService();
