const Post = require('../../schemas/post/post.schema');

class PostService {
  async getPostById(postId) {
    try {
      const document = await Post.findById(postId).populate('creator');
      return document;
    } catch (error) {
      throw new Error(`[DB에러] PostService.getPostById`, { cause: error });
    }
  }

  async createPost(tags, images, description, userId) {
    try {
      await Post.create({ creator: userId, tags, images, description });
    } catch (error) {
      throw new Error(`[DB에러] PostService.createPost`, { cause: error });
    }
  }

  async updatePostById(id, post) {
    try {
      await Post.findByIdAndUpdate(id, post);
    } catch (error) {
      throw new Error(`[DB에러 PostService.updatePostById]`, { cause: error });
    }
  }

  async deletePostById(id) {
    try {
      await Post.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`[DB에러 PostService.updatePostById]`, { cause: error });
    }
  }
}

module.exports = new PostService();
