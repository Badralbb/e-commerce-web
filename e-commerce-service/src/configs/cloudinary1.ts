import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// galt-iin cloudinary tai holbolt hiisen bgaa ni

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARYNAME,
    api_key: process.env.CLOUDINARYKEY,
    api_secret: process.env.CLOUDINARYSECRETKEY,
  });
} catch (error) {
  console.log(error);
}

export const handleUpload = async (file: string) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};
// cloudinary ruu file ilgeej baigaa function
