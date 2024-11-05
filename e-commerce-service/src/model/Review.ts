import { model, Schema } from "mongoose";

const schema = new Schema({
    productId: { type: String, required: true },
    userId: { type: String},
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const reviewModel = model("Reviews", schema);
