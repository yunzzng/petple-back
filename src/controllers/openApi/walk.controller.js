const walkService = require("../../service/openApi/walk.service");
const { fetchWalkData } = require("../../utils/openApi/fetchWalkData");
const { createError } = require("../../utils/error");

class WalkController {
  async saveWalk(req, res, next) {
    try {
      const walkData = req.body;
      if (!walkData.userId || !walkData.petId) {
        return next(createError(400, "필수 데이터가 누락되었습니다."));
      }

      const savedWalk = await walkService.saveWalkData(walkData);
      return res.status(201).json({ success: true, walk: fetchWalkData(savedWalk) });
    } catch (error) {
      next(error);
    }
  }

  async getUserWalks(req, res, next) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return next(createError(400, "사용자 ID가 필요합니다."));
      }

      const userWalks = await walkService.getWalksByUser(userId);
      if (!userWalks.length) {
        return next(createError(404, "산책 기록을 찾을 수 없습니다."));
      }

      return res.status(200).json({ success: true, walks: userWalks.map(fetchWalkData) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WalkController();