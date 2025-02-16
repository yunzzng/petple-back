const { getFuneralData } = require('../../controllers/openApi/funeral.controller');
const kakaoController = require('../../controllers/openApi/kakao.controller');
const { getMedicalData } = require('../../controllers/openApi/medical.controller');

const publicRoutes = require('express').Router();

// 공공데이터 API 라우트
publicRoutes.get("/funeral", getFuneralData); // /public/funeral
publicRoutes.get("/medical", getMedicalData); // /public/medical
publicRoutes.get("/kakao/coordinates", kakaoController.getCoordinates); // /public/kakao/coordinates - 주소를 좌표로 변환
publicRoutes.get("/kakao/map-script", kakaoController.getMapScriptUrl); // /public/kakao/map-script - 카카오 지도 스크립트 URL

module.exports = publicRoutes;