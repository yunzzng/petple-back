const FuneralModel = require("../../schemas/openApi/seoul.schema");
const { formatSeoulFuneralData } = require("../../utils/openApi/formatFuneralData");

const getSeoulFuneralData = async () => {
  const seoulData = await FuneralModel.find({}).lean();
  return await Promise.all(seoulData.map((item) => formatSeoulFuneralData(item)));
};

module.exports = { getSeoulFuneralData };