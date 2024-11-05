import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mngodb = process.env.MONGO_URL || "";

  console.log("mngodb", mngodb);

  try {
    await mongoose.connect(mngodb);
    console.log("MongoDB connnect");
  } catch (error) {
    console.error(error);
  }
  return;
};

export default connectDB;
