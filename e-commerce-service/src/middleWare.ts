import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

export const middleWare = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies;
  const isVeried = jwt.verify(cookie.token, ACCESS_TOKEN_SECRET);
  if (isVeried) return next();
  res.status(401).send({ success: false, message: "Unauthenticated user" });
};
