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
};

module.exports = config;
