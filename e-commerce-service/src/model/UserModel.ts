import { model, Schema } from "mongoose";

const schema = new Schema({
  userName: String,
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "Email Exist"],
  },
  phoneNumber: Number,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  address: String,
  zipCode: Number,
  cardId: String,
  savedProductId: String,
  createAt: Date,
  updateAt: Date,
  categoryType: String,
 
});
export const User = model("users", schema);
