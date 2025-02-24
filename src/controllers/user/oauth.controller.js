const { default: axios } = require('axios');
const { createError } = require('../../utils/error');
const users = require('../../schemas/user/user.schema');
const config = require('../../consts/app');
const {
  createNickname,
  createUser,
  findByEmail,
  createEmail,
} = require('../../service/user/user.service');
const { createToken } = require('../../consts/token');

class OauthController {
  async googleOauth(req, res) {
    const googleAuthURL = config.oauth.google;
    res.redirect(googleAuthURL);
  }

  async googleOauthCallback(req, res, next) {
    const { code } = req.query;

    if (!code) {
      throw createError(400, '인증코드 없음');
    }

    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code: code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_CLIENT_CALLBACK_URL,
          grant_type: 'authorization_code',
        },
      );

      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      const { email, name, picture } = userResponse.data;

      const user = await findByEmail(email);
      // 처음 로그인한 유저이면 새로 생성
      if (!user) {
        const nickName = await createNickname(name);

        const oauthUser = await createUser({
          name: name,
          email: email,
          nickName: nickName,
          profileImage: picture,
        });

        // await oauthUser.save();

        const token = createToken({
          email: oauthUser.email,
          id: oauthUser._id.toString(),
        });

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          path: '/',
        });

        res.cookie('loginStatus', 'true', {
          httpOnly: false,
          maxAge: 60 * 60 * 1000,
          path: '/', //모든 경로에 쿠키포함
        });

        return res.redirect(config.app.frontUrl);
      }

      // 로그인한 기록이 있는 유저이면 로그인
      const token = createToken({
        email: user.email,
        userId: user._id.toString(),
      });

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        path: '/',
      });

      res.cookie('loginStatus', 'true', {
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
        path: '/', //모든 경로에 쿠키포함
      });

      return res.redirect(config.app.frontUrl);
    } catch (error) {
      next(error);
    }
  }

  async kakaoOauth(req, res) {
    const kakaoAuthUrl = config.oauth.kakao;
    res.redirect(kakaoAuthUrl);
  }

  async kakaoOauthCallback(req, res, next) {
    const { code } = req.query;

    if (!code) {
      throw createError(400, '인증코드 없음');
    }

    try {
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_OAUTH_REST_API_KEY,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.KAKAO_OAUTH_REDIRECT_URI,
          code: code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      const { nickname, profile_image } = userResponse.data.properties;
      // const { email } = userResponse.data.kakao_account;
      const email = await createEmail();
      console.log('random email:', email);

      console.log(userResponse.data.properties);

      const user = await findByEmail(email);

      if (!user) {
        const newNickName = await createNickname(nickname);

        const oauthUser = await createUser({
          name: nickname,
          email: email,
          nickName: newNickName,
          profileImage: profile_image,
        });

        console.log('oauthUser', oauthUser);

        const token = createToken({
          email: oauthUser.email,
          id: oauthUser._id.toString(),
        });

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          path: '/',
        });

        res.cookie('loginStatus', 'true', {
          httpOnly: false,
          maxAge: 60 * 60 * 1000,
          path: '/',
        });

        return res.redirect(config.app.frontUrl);
      }

      // 로그인한 기록이 있는 유저이면 로그인
      const token = createToken({
        email: user.email,
        userId: user._id.toString(),
      });

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        path: '/',
      });

      res.cookie('loginStatus', 'true', {
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
        path: '/', //모든 경로에 쿠키포함
      });

      return res.redirect(config.app.frontUrl);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OauthController();
