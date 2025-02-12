const jwt = require('jsonwebtoken');
const { verifyToken } = require('../consts/token');
const { findByEmail } = require('../service/user/user.service');

const token = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      const error = new Error('토큰이 존재하지 않습니다.');
      error.status = 401;
      return next(error);
    }

    const decodedToken = await verifyToken(token);
    console.log(decodedToken);

    const email = decodedToken.email;

    const user = await findByEmail(email);
    if (!user) {
      const error = new Error('유저가 존재하지 않습니다.');
      error.status = 404;
      return next(error);
    }

    req.user = user;
    console.log('user인증 성공', user);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: '토큰이 만료되었습니다.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '토큰이 조작되었습니다.' });
    }

    return next(error);
  }
};

module.exports = { token };
