const express = require('express');
const { signup } = require('../../controllers/user/user.controller');
const router = express.Router();

router.post('/signup', signup); // /api/user/signup

module.exports = router;
