import express from 'express';
import { getImageorFileUrl, uploadFile } from "../Controllers/S3Controller.js"; // Import the controller

const s3Router = express.Router();

s3Router.get("/utils/file", getImageorFileUrl);
s3Router.post("/utils/upload", uploadFile);

export default s3Router;

