const users = require('../../schemas/user/user.schema');

const createUser = async (userData) => {
  console.log(userData);
  try {
    const newUser = await users.create(userData);
    return newUser;
  } catch (error) {
    throw Error('유저생성 실패' + error.message);
  }
};

const findByEmail = async (userEmail) => {
  const user = await users.findOne({ email: userEmail });
  return user;
};

const createNickname = async (userName) => {
  const emotion = [
    '행복한',
    '즐거운',
    '기쁜',
    '신나는',
    '고마운',
    '상냥한',
    '포근한',
    '친숙한',
    '쾌활한',
    '뿌듯한',
    '귀여운',
    '멋진',
    '설레는',
  ];

  const randomEmotion = emotion[Math.floor(Math.random() * emotion.length)];
  const randomNum = Math.floor(Math.random() * 9000 + 1);

  return `${randomEmotion}${userName}${randomNum}`;
};

module.exports = {
  createUser,
  findByEmail,
  createNickname,
};
