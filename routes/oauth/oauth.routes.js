const express = require('express');
const {
  googleOauth,
  googleOauthCallback,
} = require('../../controllers/user/oauth.controller');

const router = express.Router();

router.get('/google', googleOauth);
router.get('/google/callback', googleOauthCallback);

module.exports = router;
