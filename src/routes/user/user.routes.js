const UserController = require('../../controllers/user/user.controller');
const userRoutes = require('express').Router();

userRoutes.post('/signup', UserController.signup); // /api/user/signup
userRoutes.post('/login', UserController.login); // /api/user/login
userRoutes.post('/logout', UserController.logout); // /api/user/logout
userRoutes.get('/info', UserController.getUserInfo); // /api/user/info
userRoutes.post('/nickname/check', UserController.nickNameConfirm); // /api/user/nickname/check
userRoutes.post('/info/update', UserController.updateUserInfo); // /api/user/info/update

module.exports = userRoutes;
