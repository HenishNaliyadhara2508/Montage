import { S3Client, PutObjectCommand ,GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/s3Client.js"; // Ensuret is correctly set up

// Function to generat
export const generatePresignedPutUrl = async (fileName, fileType) => {
  try {
    const key = `uploads/${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      ContentType: fileType, 
    });
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return { presignedUrl ,key};
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Error generating presigned URL");
  }
};

export const generatePresignedGetUrl = async (fileKey) => {
  try {
    const key = `uploads/${fileKey}`
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return presignedUrl ;
  } catch (error) {
    console.error("Error generating presigned GET URL:", error);
    throw new Error("Error generating presigned GET URL");
  }
};
