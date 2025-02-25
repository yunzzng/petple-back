const FuneralModel = require('../../schemas/openApi/seoul.schema');
const {
  formatSeoulFuneralData,
} = require('../../utils/openApi/fetchFuneralData');

const getSeoulFuneralData = async () => {
  try {
    const seoulData = await FuneralModel.find({}).lean();
    if (!seoulData || seoulData.length === 0) {
      throw new Error('서울 장례 데이터가 없습니다.');
    }

    const formattedData = await Promise.all(
      seoulData.map(async (item) => {
        try {
          return await formatSeoulFuneralData(item);
        } catch (error) {
          return null;
        }
      })
    );

    return formattedData.filter((data) => data !== null);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSeoulFuneralData };