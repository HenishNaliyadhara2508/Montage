import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION, // AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // AWS access key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS secret access key
  },
});
