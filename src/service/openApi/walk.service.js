const WalkModel = require('../../schemas/openApi/walk.schema');

class WalkService {
  async saveWalkData(walkData) {
    try {
      const walkRecord = new WalkModel(walkData);
      return await walkRecord.save();
    } catch (error) {
      throw new Error('산책 데이터를 저장하는 중 오류 발생: ' + error.message);
    }
  }

  async getWalksByUser(userId) {
    try {
      return await WalkModel.find({ userId }).lean();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WalkService();
