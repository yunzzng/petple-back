const googleOauth = async (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth
  ?client_id=${process.env.GOOGLE_CLIENT_ID}
  &redirect_uri=${process.env.GOOGLE_CLIENT_CALLBACK_URL}
  &response_type=code
  &scope=email profile`;

  res.redirect(googleAuthURL);
};

const googleOauthCallback = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: '코드 없음' });
  }
};

module.exports = {
  googleOauth,
  googleOauthCallback,
};
