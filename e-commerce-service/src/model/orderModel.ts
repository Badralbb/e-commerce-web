import { model, Schema } from "mongoose";

const schema = new Schema({
    _id: String,
    orderNumber: String,
    status: String,
    phoneNumber: String,
    deliveryDate: Date,
    amountPaid: Number,
    coupon: String,
    description: String,
    orderType: String,
    details: [String],
    createdAt: Date,
    updatedAt: Date,
});
export const OrderModel = model("orders", schema);