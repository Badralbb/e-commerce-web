import express from "express";
import { loginUser } from "../controller/LoginController";
export const loginRouter = express.Router();

loginRouter.post("/login", loginUser);
