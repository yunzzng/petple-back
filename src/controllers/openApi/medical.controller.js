const axios = require('axios');
const config = require('../../consts/app');
const { createError } = require('../../utils/error');
const kakaoController = require('./kakao.controller');

class MedicalController {
  async getMedicalData(req, res, next) {
    try {
      const { region, type } = req.query;

      if (!region || !type) {
        throw createError(400, '지역과 종류(type)가 필요합니다.');
      }

      const apiUrls = {
        경기: {
          hospital: `${config.externalData.baseUrls.gyeonggi}/Animalhosptl?Type=json&KEY=${config.externalData.apiKeys.gyeonggi}`,
          pharmacy: `${config.externalData.baseUrls.gyeonggi}/AnimalPharmacy?Type=json&KEY=${config.externalData.apiKeys.gyeonggi}`,
        },
        서울: {
          hospital: `${config.externalData.baseUrls.seoul}/${config.externalData.apiKeys.seoul}/json/LOCALDATA_020301/1/100`,
          pharmacy: `${config.externalData.baseUrls.seoul}/${config.externalData.apiKeys.seoul}/json/LOCALDATA_020302/1/100`,
        },
      };

      if (!apiUrls[region] || !apiUrls[region][type]) {
        throw createError(400, '유효한 지역 또는 유형이 아닙니다.');
      }

      const apiUrl = apiUrls[region][type];
      const response = await axios.get(apiUrl);

      const rawData =
        region === '경기'
          ? type === 'hospital'
            ? response.data?.Animalhosptl?.[1]?.row || []
            : response.data?.AnimalPharmacy?.[1]?.row || []
          : type === 'hospital'
          ? response.data?.LOCALDATA_020301?.row || []
          : response.data?.LOCALDATA_020302?.row || [];

      if (!rawData.length) {
        return res.status(200).json({ success: true, medicalData: [] });
      }

      // 중복 제거 (set 객체 생성)
      const seen = new Set();

      const formattedData = await Promise.all(
        rawData.map(async (item) => {
          const address = item.RDNWHLADDR || item.SITEWHLADDR || '';
          const coordinates =
            region === '서울'
              ? await kakaoController.getCoordinates(address).catch(() => {
                  return { lat: null, lng: null };
                })
              : {
                  lat: parseFloat(item.REFINE_WGS84_LAT || item.Y) || null,
                  lng: parseFloat(item.REFINE_WGS84_LOGT || item.X) || null,
                };

          const formattedItem = {
            name: item.BPLCNM || item.BIZPLC_NM || '이름 없음',
            lat: coordinates.lat,
            lng: coordinates.lng,
            businessState: item.BSN_STATE_NM || item.TRDSTATENM || '',
            phone: item.TELNO || item.SITETEL || null,
            roadAddress: item.REFINE_ROADNM_ADDR || item.RDNWHLADDR || '',
            lotAddress: item.REFINE_LOTNO_ADDR || item.SITEWHLADDR || '',
          };

          // 중복 제거 (이름 + 도로명 주소 기준)
          const uniqueKey = `${formattedItem.name}-${formattedItem.roadAddress}`;
          if (!seen.has(uniqueKey)) {
            seen.add(uniqueKey);
            return formattedItem;
          }

          return null;
        })
      );

      return res.status(200).json({
        success: true,
        medicalData: formattedData.filter((item) => item !== null),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MedicalController();