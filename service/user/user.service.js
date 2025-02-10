const user = require('../../schemas/user/user.schema');

const createUser = async (userData) => {
  try {
    const newUser = await user.create(userData);
    return newUser;
  } catch (error) {
    throw Error('유저생성 실패', error);
  }
};

module.exports = {
  createUser,
};
