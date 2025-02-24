const OauthController = require('../../controllers/user/oauth.controller');
const oauthRoutes = require('express').Router();

oauthRoutes.get('/google', OauthController.googleOauth);
oauthRoutes.get('/google/callback', OauthController.googleOauthCallback);
oauthRoutes.get('/kakao', OauthController.kakaoOauth);
oauthRoutes.get('/kakao/callback', OauthController.kakaoOauthCallback);

module.exports = oauthRoutes;
