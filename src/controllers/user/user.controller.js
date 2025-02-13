const {
  createUser,
  findByEmail,
  createNickname,
} = require('../../service/user/user.service');
const crypto = require('crypto');
const { createToken } = require('../../consts/token');

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = crypto
    .createHash('sha512')
    .update(password)
    .digest('base64');

  try {
    const existingUser = await findByEmail(email);

    const randomNickname = await createNickname(name);

    if (existingUser) {
      const error = new Error('이미 존재하는 이메일');
      error.status = 409;
      return next(error);
    }

    await createUser({
      name: name,
      email: email,
      password: hashedPassword,
      nickName: randomNickname,
    });

    res.status(201).json({ message: '회원가입 성공!' });
    console.log('회원가입 성공');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmail(email);
    if (!user) {
      const error = new Error('가입된 회원 정보가 없습니다.');
      error.status = 404;
      return next(error);
    }

    const token = createToken({ email: user.email, userId: user._id });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      path: '/', //모든 경로에 쿠키포함
    });

    res.status(200).json({
      message: '로그인 성공',
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
