import express from "express"
import { getOrder } from "../controller/OrderController"
export const orderRouter = express.Router()
orderRouter.get("/order",getOrder)