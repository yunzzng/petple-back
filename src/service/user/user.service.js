const User = require('../../../schemas/user/user.schema');

const createUser = async (userData) => {
  console.log(userData);
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw Error('유저생성 실패' + error.message);
  }
};

const findByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  return user;
};

module.exports = {
  createUser,
  findByEmail,
};
