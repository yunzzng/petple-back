const axios = require("axios");
const config = require("../../consts/app");
const { createError } = require("../../utils/error");

class FuneralController {
  async getFuneralData(req, res, next) {
    try {
      const response = await axios.get(
        `${config.externalData.baseUrls.gyeonggi}/DoanmalfunrlPrmisnentrp`,
        {
          params: {
            KEY: config.externalData.apiKeys.gyeonggi,
            Type: "json",
            pIndex: 1,
          },
        }
      );

      const data = response.data?.DoanmalfunrlPrmisnentrp?.[1]?.row || [];
      
      const formattedData = data.map((item) => ({
        name: item.BIZPLC_NM ?? "이름 없음", // 이름
        lat: parseFloat(item.REFINE_WGS84_LAT) ?? null, // 위도
        lng: parseFloat(item.REFINE_WGS84_LOGT) ?? null, // 경도
        phone: item.TELNO ?? null, // 전화번호
        zipCode: item.REFINE_ZIP_CD ?? "", // 우편번호
        roadAddress: item.REFINE_ROADNM_ADDR ?? "", // 도로명 주소
        lotAddress: item.REFINE_LOTNO_ADDR ?? "", // 지번 주소
      }));

      return res.status(200).json({ success: true, funeralData: formattedData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FuneralController();