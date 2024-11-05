import mongoose, { model, Schema} from "mongoose";

import { User } from "./UserModel";

const schema = new Schema({
  orderNumber: String,
  paymentStatus: String, 
  paymentType: String, 
  createAt: Date, 
  updateAt: Date, 
  paymentAmount: Number,
  userId:{type: mongoose.Schema.Types.ObjectId,ref:User}
});

export const Payment = model("payment", schema);