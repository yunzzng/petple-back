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

const updateUser = async (userEmail, userData) => {
  try {
    const update = await users.findOneAndUpdate(
      { email: userEmail },
      userData,
      {
        new: true,
      },
    );
    return update;
  } catch (error) {
    throw Error('유저 정보 업데이트 실패' + error.message);
  }
};

const createPet = async (petData) => {
  try {
    const newPet = await pets.create(petData);
    return newPet.toObject();
  } catch (error) {
    throw Error('유저펫 생성 실패' + error.message);
  }
};

const updatePet = async (petId, petData) => {
  try {
    const update = await pets.findOneAndUpdate({ _id: petId }, petData, {
      new: true,
    });
    return update.toObject();
  } catch (error) {
    throw Error('유저 펫 정보 업데이트 실패' + error.message);
  }
};

const findByEmail = (userEmail) => {
  const user = users.findOne({ email: userEmail });
  return user;
};

const findById = (userId) => {
  const user = users.findOne({ _id: userId });
  return user;
};

const findByKakaoId = (kakaoId) => {
  const user = users.findOne({ kakaoId: kakaoId });
  return user;
};

const createNickname = async (userName) => {
  try {
    const randomEmotion = emotion[Math.floor(Math.random() * emotion.length)];
    const randomNum = Math.floor(Math.random() * 9000 + 1);

    const randomNickname = `${randomEmotion}${userName}${randomNum}`;

    const checkNickname = await duplication(randomNickname);

    if (checkNickname) {
      return randomNickname;
    }
    return await createNickname(userName);
  } catch (error) {
    throw Error('랜덤닉네임 생성 실패' + error.message);
  }
};

const duplication = async (userNickName) => {
  const nickName = await users.findOne({ nickName: userNickName }).lean();

  if (nickName) {
    return false;
  }
  return true;
};

const createEmail = async () => {
  try {
    const randomString = Math.random().toString(36).slice(2);

    const randomEmail = `${randomString}@elice.com`;

    const existingEmail = await users.findOne({ email: randomEmail }).lean();

    if (!existingEmail) {
      return randomEmail;
    }

    return await createEmail();
  } catch (error) {
    throw Error(400, '랜덤 이메일 생성 실패');
  }
};

const findUsersByLocation = async (lng, lat) => {
  try {
    const documents = await users
      .find(
        {
          'address.location': {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [lng, lat],
              },
              $maxDistance: 3000,
            },
          },
        },
        '-userType -createdAt -updatedAt -__v',
      )
      .populate('userPet', '-_id -__v')
      .lean();
    return documents;
  } catch (error) {
    throw createError(500, '[DB에러 UserSerice.findByUsersByLocation]');
  }
};

const userPost = async (userId, page, pageSize) => {
  try {
    const skipPosts = (page - 1) * pageSize;
    const userPosts = await posts
      .find({ creator: userId })
      .skip(skipPosts)
      .limit(pageSize)
      .lean();

    const totalPosts = await posts.countDocuments({ creator: userId });
    const totalPages = Math.ceil(totalPosts / pageSize);

    return { posts: userPosts, totalPages };
  } catch (error) {
    throw Error(error.message);
  }
};

const likePost = async (userId, page, pageSize) => {
  try {
    const skipPosts = (page - 1) * pageSize;
    const likesPost = await posts
      .find({ likes: userId })
      .skip(skipPosts)
      .limit(pageSize)
      .lean();

    const totalPosts = await posts.countDocuments({ likes: userId });
    const totalPages = Math.ceil(totalPosts / pageSize);

    return { posts: likesPost, totalPages };
  } catch (error) {
    throw Error(error.message);
  }
};

const findUserByNickname = async (nickName) => {
  try {
    const document = await users
      .findOne({ nickName }, 'userPet nickName name profileImage')
      .populate('userPet', '-__v -_id')
      .lean();
    return document;
  } catch (error) {
    throw createError(500, '[DB에러 UserSerice.findUserByNickname]');
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
  findUserByNickname,
  createEmail,
  findByKakaoId,
  updatePet,
  updateUser,
};
