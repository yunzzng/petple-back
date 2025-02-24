const users = require('../../schemas/user/user.schema');
const pets = require('../../schemas/pet/pet.schema');
const { createError } = require('../../utils/error');
const posts = require('../../schemas/post/post.schema');

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

const createUser = async (userData) => {
  try {
    const newUser = await users.create(userData);
    return newUser.toObject();
  } catch (error) {
    throw Error('유저생성 실패' + error.message);
  }
};

const createPet = async (petData) => {
  try {
    const newPet = await pets.create(petData);
    return newPet;
  } catch (error) {
    throw Error('유저펫 생성 실패' + error.message);
  }
};

const findByEmail = (userEmail) => {
  const user = users.findOne({ email: userEmail });
  return user;
};

const findById = async (userId) => {
  const user = await users.findOne({ _id: userId });
  return user;
};

const createNickname = async (userName) => {
  const randomEmotion = emotion[Math.floor(Math.random() * emotion.length)];
  const randomNum = Math.floor(Math.random() * 9000 + 1);

  const randomNickname = `${randomEmotion}${userName}${randomNum}`;

  const checkNickname = await duplication(randomNickname);

  if (checkNickname) {
    return randomNickname;
  }
  return await createNickname(userName);
};

const duplication = async (userNickName) => {
  const nickName = await users.findOne({ nickName: userNickName });

  if (nickName) {
    return false;
  }
  return true;
};

const createEmail = async () => {
  const randomString = Math.random().toString(36).slice(2);

  const randomEmail = `kakao_${randomString}@elice.com`;

  const existingEmail = await users.findOne({ email: randomEmail });
  if (!existingEmail) {
    return randomEmail;
  }

  return await createEmail();
};

const findUsersByLocation = async (lng, lat) => {
  try {
    const documents = await users
      .find({
        'address.location': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: 3000,
          },
        },
      })
      .populate('userPet')
      .lean();
    return documents;
  } catch (error) {
    throw createError(500, '[DB에러 UserSerice.findByUsersByLocation]');
  }
};

const userPost = async (userId) => {
  try {
    const userPosts = await posts.find({ creator: userId });
    if (userPosts) {
      return userPosts;
    }
    return [];
  } catch (error) {
    throw Error(error.message);
  }
};

const likePost = async (userId) => {
  try {
    const likesPost = await posts.find({ likes: userId });
    if (likesPost) {
      return likesPost;
    }
    return [];
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  createUser,
  findByEmail,
  createNickname,
  duplication,
  findById,
  createPet,
  findUsersByLocation,
  userPost,
  likePost,
  createEmail,
};
