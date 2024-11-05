import express from "express";
import { createPayment, getPayment, updatePayment } from "../controller/PaymentController";

export const paymentRouter = express.Router();

paymentRouter
  .post("/buy", createPayment)
  .put("/updatePayment/:id", updatePayment)
  .get("/getPayments", getPayment);
