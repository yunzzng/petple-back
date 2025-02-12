const express = require('express');
const { signup, login } = require('../../controllers/user/user.controller');
const router = express.Router();

router.post('/signup', signup); // /api/user/signup
router.post('/login', login); // /api/user/login

module.exports = router;
