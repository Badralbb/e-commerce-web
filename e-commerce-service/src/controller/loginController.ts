import { Request, Response } from "express";
import { User } from "../model/UserModel";

import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESSTOKEN_SECRET || "";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).send("user does not exist");

    if (!user.password) return;
    const isEqual = await bcrypt.compare(String(password), user.password);
    if (isEqual) {
      const accessToken = jwt.sign(
        { userId: user._id, email },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      return res.status(201).send({
        accessToken,
      });
    }
    res.status(404).send("Password is incorrect");
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};
