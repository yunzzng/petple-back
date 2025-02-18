const axios = require("axios");
const config = require("../../consts/app");
const kakaoController = require("./kakao.controller");

class PlaceController {
  async getTravelData(req, res, next) {
    try {
      const { category, page, numOfRows } = req.query;

      if (!category) {
        throw createError(400).json({ success: false, message: "카테고리를 선택해주세요." });
      }

      const apiKey = config.externalData.apiKeys.place;
      const apiUrl = `${config.externalData.baseUrls.place}?serviceKey=${apiKey}&numOfRows=${numOfRows}&pageNo=${page}&MobileOS=ETC&MobileApp=Petple&listYN=Y&arrange=A&contentTypeId=${category}&_type=json`;

      const response = await axios.get(apiUrl);
      const rawData = response.data?.response?.body?.items?.item || [];

      if (!rawData.length) {
        return res.status(200).json({ success: true, places: [] });
      }

      const formattedData = rawData.map((item) => ({
        id: item.contentid,
        title: item.title,
        imageUrl: item.firstimage ?? null,
        address: item.addr1 ?? "정보 없음",
        lat: item.mapy ? Number(item.mapy) : null,
        lng: item.mapx ? Number(item.mapx) : null,
        tel: item.tel ?? "정보 없음",
      }));

      return res.status(200).json({ success: true, places: formattedData });
    } catch (error) {
      next(error);
    }
  }

  async getTravelDetail(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw createError(400).json({ success: false, message: "유효한 장소 ID가 필요합니다." });
      }

      const apiKey = config.externalData.apiKeys.place;
      const apiUrl = `${config.externalData.baseUrls.placeDetail}?serviceKey=${apiKey}&contentId=${id}&MobileOS=ETC&MobileApp=Petple&_type=json`;

      const response = await axios.get(apiUrl);
      let item = response.data?.response?.body?.items?.item;

      if (!item) {
        throw createError(404).json({ success: false, message: "장소 정보를 찾을 수 없습니다." });
      }

      item = Array.isArray(item) ? item[0] : item;

      const lat = item.mapy && !isNaN(item.mapy) ? Number(item.mapy) : null;
      const lng = item.mapx && !isNaN(item.mapx) ? Number(item.mapx) : null;

      if (!lat || !lng) {
        const placesResponse = await axios.get(`${config.externalData.baseUrls.place}`, {
          params: { numOfRows: 1, pageNo: 1, contentTypeId: item.contentid },
        });
        const placeItem = placesResponse.data?.response?.body?.items?.item?.[0];

        if (placeItem) {
          lat = lat || Number(placeItem.mapy);
          lng = lng || Number(placeItem.mapx);
        }
      }

      const formattedData = {
        additionalInfo: {
          acmpyNeedMtr: item.acmpyNeedMtr ?? "정보 없음",
          relaAcdntRiskMtr: item.relaAcdntRiskMtr ?? "정보 없음",
          acmpyTypeCd: item.acmpyTypeCd ?? "정보 없음",
          relaPosesFclty: item.relaPosesFclty ?? "정보 없음",
          relaFrnshPrdlst: item.relaFrnshPrdlst ?? "정보 없음",
          etcAcmpyInfo: item.etcAcmpyInfo ?? "정보 없음",
          relaPurcPrdlst: item.relaPurcPrdlst ?? "정보 없음",
          acmpyPsblCpm: item.acmpyPsblCpm ?? "정보 없음",
          relaRntlPrdlst: item.relaRntlPrdlst ?? "정보 없음",
        },
      };

      return res.status(200).json({ success: true, place: formattedData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlaceController();
