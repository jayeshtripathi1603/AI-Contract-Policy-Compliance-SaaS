const AWS = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = require("../config");

AWS.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY, region: "ap-south-1" });
const s3 = new AWS.S3();

exports.uploadBufferToS3 = async (buffer, name, type) => {
  const Key = `${Date.now()}_${name}`;
  const params = { Bucket: AWS_BUCKET_NAME, Key, Body: buffer, ContentType: type };
  const result = await s3.upload(params).promise();
  return result.Location;
};
