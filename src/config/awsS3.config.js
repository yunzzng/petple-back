const { S3Client } = require('@aws-sdk/client-s3');
const config = require('../consts/app');

const AWS_S3 = new S3Client({
  region: config.aws.region,
  credential: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

module.exports = AWS_S3;
