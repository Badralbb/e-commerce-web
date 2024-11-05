import express from "express";
import { getCategory } from "../controller/catController";

const categoryRouter = express.Router();

categoryRouter.get("/category", getCategory);
export { categoryRouter };
