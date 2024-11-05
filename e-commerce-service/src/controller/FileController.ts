import { Request, Response } from "express";
import { handleUpload } from "../configs/cloudinary";

const fileUploader = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send("no file uploaded");

  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    res.send(error);
  }
};
export { fileUploader };
