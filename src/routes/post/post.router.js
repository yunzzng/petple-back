const PostController = require('../../controllers/post/post.controller');
const { token } = require('../../middleware/token.middleware');
const postsRoutes = require('express').Router();

postsRoutes.get('/:id', PostController.getPost);
postsRoutes.post('/', token, PostController.addPost);
postsRoutes.put('/:id', token, PostController.updatePost);
postsRoutes.delete('/:id', token, PostController.deletePost);

module.exports = postsRoutes;
