import { Schema, model } from "mongoose";

const schema = new Schema({
    email: String,
    password: String,
});

export const UserSignUpModel = model("userSignUp", schema);
