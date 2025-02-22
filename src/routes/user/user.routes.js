const UserController = require('../../controllers/user/user.controller');
const userRoutes = require('express').Router();
const { token } = require('../../middleware/token.middleware');

userRoutes.post('/signup', UserController.signup); // /api/user/signup
userRoutes.post('/login', UserController.login); // /api/user/login
userRoutes.post('/logout', UserController.logout); // /api/user/logout
userRoutes.get('/info', UserController.getUserInfo); // /api/user/info
userRoutes.post('/nickname/check', token, UserController.nickNameConfirm); // /api/user/nickname/check
userRoutes.post('/info/update', token, UserController.updateUserInfo); // /api/user/info/update
userRoutes.post('/pet/create', token, UserController.createPetInfo); // /api/user/pet/create
userRoutes.post('/pet/update', token, UserController.updatePetInfo); // /api/user/pet/update
userRoutes.post('/pet/delete', token, UserController.deletePetInfo); // /api/user/pet/delete
userRoutes.get('/posts/get', UserController.getUserPosts); // /api/user/posts/get

module.exports = userRoutes;
