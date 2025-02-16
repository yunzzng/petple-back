const {
  createUser,
  findByEmail,
  createNickname,
  duplication,
} = require('../../service/user/user.service');
const crypto = require('crypto');
const { createToken, verifyToken } = require('../../consts/token');
const { createError } = require('../../utils/error');

class UserController {
  async signup(req, res, next) {
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
  }

  async login(req, res, next) {
    const { email } = req.body;

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

      res.cookie('loginStatus', 'true', {
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
        path: '/', //모든 경로에 쿠키포함
      });

      res.status(200).json({
        message: '로그인 성공',
        user: {
          id: user._id,
          email: user.email,
          nickName: user.nickName,
          userImage: user.profileImage,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('token');
      res.clearCookie('loginStatus');
      res.status(200).json({ message: '로그아웃 완료' });
      console.log('로그아웃 완료');
    } catch (error) {
      next(error);
    }
  }

  async getUserInfo(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
      const error = new Error('토큰없음, 유저 정보 불러오기 실패');
      error.status = 400;
      return next(error);
    }

    const decodedToken = await verifyToken(token);

    const email = decodedToken.email;

    const user = await findByEmail(email);
    console.log(user);
    if (!user) {
      throw createError(404, '유저 정보가 없습니다!');
    }

    res.status(200).json({
      message: '유저 정보 조회 성공',
      user: {
        id: user._id,
        email: user.email,
        nickName: user.nickName,
        image: user.profileImage,
      }, // 펫 정보 추가
    });
  }

  async nickNameConfirm(req, res, next) {
    const { nickName } = req.body;

    const confirm = await duplication(nickName);

    if (!confirm) {
      const error = new Error('이미 사용중인 닉네임 입니다.');
      error.status(409);
      return next(error);
    }
    return res.status(200).json({ message: '사용 가능한 닉네임 입니다.' });
  }
}

module.exports = new UserController();
