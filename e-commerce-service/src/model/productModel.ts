import { model, Schema } from "mongoose";

const schema = new Schema({
  productName: String,
  color: [String],
  size: [String],
  price: Number,
  productId: Number,
  categoryId: String,
  qty: Number,
  thumbnails: String,
  images: [String],
  coupon: String,
  salePercent: Number,
  description: String,
  viewCount: Number,
  createAt: Date,
  updateAt: Date,
  categoryType: String,
  productTag: String,
});
export const Product = model("product", schema);
