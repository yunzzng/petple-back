const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../../consts/app');
const AWS_S3 = require('../../config/awsS3.config');
const { createError } = require('../../utils/error');

const getPresignedUrl = async (req, res, next) => {
  const { fileName, fileType } = req.query;
  if (!fileName || !fileType) {
    return res
      .status(400)
      .json({ success: false, message: '파일이름과 타입이 필요합니다.' });
  }
  const params = {
    Bucket: config.aws.s3.bucketName,
    Key: `images/${fileName}`,
    ContentType: fileType,
  };
  try {
    const command = new PutObjectCommand(params);
    const presignedUrl = await getSignedUrl(AWS_S3, command, { expiresIn: 60 });
    return res.status(200).json({ isError: false, presignedUrl });
  } catch (error) {
    next(
      createError(
        500,
        `presignedUrl 생성하는 중 오류가 발생하였습니다. ${error.message}`,
      ),
    );
  }
};

module.exports = {
  getPresignedUrl,
};
