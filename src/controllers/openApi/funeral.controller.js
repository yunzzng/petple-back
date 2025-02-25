const axios = require('axios');
const config = require('../../consts/app');
const {
  getSeoulFuneralData,
} = require('../../service/openApi/funeral.service');
const { formatGyeonggiFuneralData } = require('../../utils/openApi/fetchFuneralData');


const apiUrls = {
  경기: `${config.externalData.baseUrls.gyeonggi}/DoanmalfunrlPrmisnentrp`,
};

class FuneralController {
  async getFuneralData(req, res, next) {
    try {
      const { region } = req.query;

      const rawData =
      region === "경기"
        ? await axios
            .get(apiUrls[region], {
              params: {
                KEY: config.externalData.apiKeys.gyeonggi,
                Type: 'json',
                pIndex: 1,
              },
            })
            .then((res) => {
              const dataArray = res.data?.DoanmalfunrlPrmisnentrp || [];
              const rowData = dataArray.find((item) => item.row)?.row || [];
    
              return rowData;
            })
        : await getSeoulFuneralData();

      return res.status(200).json({
        success: true,
        funeralData: region === "경기" ? rawData.map(formatGyeonggiFuneralData) : rawData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FuneralController();
