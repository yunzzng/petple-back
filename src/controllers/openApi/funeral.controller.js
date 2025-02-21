const axios = require('axios');
const config = require('../../consts/app');
const {
  getSeoulFuneralData,
} = require('../../service/openApi/funeral.service');
const {
  formatGyeonggiFuneralData,
} = require('../../utils/openApi/formatFuneralData');

const apiUrls = {
  경기: `${config.externalData.baseUrls.gyeonggi}/DoanmalfunrlPrmisnentrp`,
};

class FuneralController {
  async getFuneralData(req, res, next) {
    try {
      const { region } = req.query;

      if (region === '서울') {
        const seoulFuneralData = await getSeoulFuneralData();
        console.log('서울 데이터: ', seoulFuneralData);
        return res.status(200).json({ success: true, seoulFuneralData });
      }

      const response = await axios.get(apiUrls[region], {
        params: {
          KEY: config.externalData.apiKeys.gyeonggi,
          Type: 'json',
          pIndex: 1,
        },
      });

      const rawData = response.data?.DoanmalfunrlPrmisnentrp?.[1]?.row || [];

      return res.status(200).json({
        success: true,
        funeralData: rawData.map(formatGyeonggiFuneralData),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FuneralController();
