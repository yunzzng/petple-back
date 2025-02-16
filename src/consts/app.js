require('dotenv').config();

const config = {
  app: {
    port: 8080,
    frontUrl: process.env.FRONT_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3: {
      bucketName: process.env.BUCKET_NAME,
    },
  },
  kakao: {
    apiUrl: process.env.KAKAO_OPEN_API_URL,
    apiKey: process.env.KAKAO_OPEN_API_KEY,
    restApiUrl: process.env.KAKAO_OPEN_REST_API_URL,
    restApiKey: process.env.KAKAO_OPEN_REST_API_KEY,
  },
  externalData: { 
    baseUrls: {
      gyeonggi: process.env.BASE_URL_GYEONGGI,
      seoul: process.env.BASE_URL_SEOUL,
    },
    apiKeys: {
      gyeonggi: process.env.OPEN_GYEONGGI_API_KEY,
      seoul: process.env.OPEN_SEOUL_API_KEY,
    },
  },
};

module.exports = config;
