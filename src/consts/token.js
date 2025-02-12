const jwt = require('jsonwebtoken');
const config = require('./app');

const createToken = ({ email, userId }) => {
  return jwt.sign({ email, userId }, config.jwt.secret, { expiresIn: '1h' });
};

module.exports = { createToken };
