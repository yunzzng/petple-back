const FuneralModel = require("../../schemas/openApi/seoul.schema");

const getSeoulFuneralData = async () => {
  return await FuneralModel.find({}).lean();
};

module.exports = { getSeoulFuneralData };