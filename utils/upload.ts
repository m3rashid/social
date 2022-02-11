import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

// making configurations for file upload
const s3 = new aws.S3({
  // configuration for the file upload
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const generateUploadUrl = async (): Promise<string> => {
  // generating random string for the file name
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  // setting params for the file upload
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Expires: 60,
  };
  // generating the url for the file upload and return it
  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  return uploadUrl;
};

export default generateUploadUrl;
