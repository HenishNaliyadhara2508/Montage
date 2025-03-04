import { generatePresignedPutUrl,generatePresignedGetUrl } from "../Utils/S3Utils.js"; // Import the function
import AWS from 'aws-sdk';

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (req, res) => {
  try {
    const { fileName, fileType } = req.body; // Expect fileName and fileType in the request body

    if (!fileName || !fileType) {
      return res
        .status(400)
        .json({ error: "File name or file type is missing" });
    }

    // Generate presigned PUT URL
    const { presignedUrl, key } = await generatePresignedPutUrl(fileName, fileType);

    res.status(200).json({
      message: "Presigned URL generated successfully",
      presignedUrl, // URL that the client can use to upload the file
      key,          // The key (path) where the file will be stored in S3
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Error generating presigned URL" });
  }
};


// controllers/uploadController.js 
export const getImageorFileUrl = async (req, res) => {
  const { key } = req.body; // This is the filename you want to retrieve

  try {
    // Generate the presigned URL using the helper function
    const  presignedUrl  = await generatePresignedGetUrl(key);

    // Return the presigned URL to the client
    res.status(200).json({ url: presignedUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: 'Error generating pre-signed URL' });
  }
};

