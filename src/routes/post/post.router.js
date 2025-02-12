const PostController = require('../../controllers/post/post.controller');
const postsRoutes = require('express').Router();

postsRoutes.post('/', PostController.addPost);

module.exports = postsRoutes;
