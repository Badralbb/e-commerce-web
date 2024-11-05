import express from "express";
import {  } from "../controller/UserController";
import { createReview, getReviews,  } from "../controller/ReviewController";

export const reviewRouter = express.Router();

reviewRouter
  .get("/reviews/:productId", getReviews )
  .post("/reviews", createReview)