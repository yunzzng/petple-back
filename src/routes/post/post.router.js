const PostController = require('../../controllers/post/post.controller');
const { token } = require('../../middleware/token.middleware');
const postsRoutes = require('express').Router();

postsRoutes.post('/', token, PostController.addPost);

module.exports = postsRoutes;
