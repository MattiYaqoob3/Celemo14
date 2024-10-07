// S3 AWS SDK for JavaScript (v3)
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { rejects } = require("assert");
const { resolve } = require("path");

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const aws_upload = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { filename, file } = params;

      const buf = Buffer.from(file.replace(/^data:.+;base64,/, ""), "base64");

      const currentTime = new Date().getTime();
      const data = {
        Bucket: "text-1-mj-v2",
        Key: `${currentTime}_${filename}`,
        Body: buf,
        ContentEncoding: "base64",
        ACL: "public-read",
      };

      const command = new PutObjectCommand(data);
      const response = await s3Client.send(command);

      const url = `https://text-1-mj-v2.s3.eu-north-1.amazonaws.com/${currentTime}_${filename}`;
      resolve({ url });
      console.log(`File uploaded successfully, file URL: ${url}`);
    } catch (err) {
      console.log(`Error uploading file: ${err}`);
      reject(err);
    }
  });
};
