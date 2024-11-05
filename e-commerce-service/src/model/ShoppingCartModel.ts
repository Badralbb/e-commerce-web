import { model, Schema } from "mongoose";

const schema = new Schema({
  orderNumber: String,
  productCount: Number,
  size: String,
  createAt: Date,
  updateAt: Date,
  price: Number,
  images: [String],
  productName: String,
});

export const ShoppingCart = model("shoppingCarts", schema);
