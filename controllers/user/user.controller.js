const { createUser, findByEmail } = require('../../service/user/user.service');
const crypto = require('crypto');

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = crypto
    .createHash('sha512')
    .update(password)
    .digest('base64');

  try {
    const existingUser = await findByEmail(email);
    if (existingUser) {
      const error = new Error('이미 존재하는 이메일');
      error.status = 409;
      return next(error);
    }

    await createUser({ name: name, email: email, password: hashedPassword });

    res.status(201).json({ message: '회원가입 성공!' });
    console.log('회원가입 성공');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {};

module.exports = { signup };
