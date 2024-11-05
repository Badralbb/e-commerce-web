import express from "express";
import Multer, { memoryStorage } from "multer";
import { fileUploader } from "../controller/FileController";

const uploadRouter = express.Router();

const storage = memoryStorage();
const multer = Multer({ storage });

uploadRouter.post("/upload", multer.single("image"), fileUploader);

export { uploadRouter };
