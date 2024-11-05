import { Request, Response } from "express";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { UserSignInModel } from "../model/SignInModel";

export const createUserSignIn = async (req: Request, res: Response) => {
  const userSignIn = req.body;
  const isAuthenticated = true; // DB user fetch compare

  //   if(password.length >=8) {
  //     return res.sendStatus(401).json({message: "password 7 oos urt baih yoestoi"})
  //   }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPass = bcrypt.hashSync(userSignIn.password, salt);
  console.log({ hashedPass });

  const form = {
    email: userSignIn.email,
    password: hashedPass,
  };

  try {
    const user = await UserSignInModel.create(form);

    if (isAuthenticated) {
      const privateKey = "1234"; // .env file deeree nuuna
      const token = jwt.sign({ userSignIn: userSignIn.email }, privateKey, {
        expiresIn: "2h",
      });

      return res.send({ token });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.send("Error, to SignIn!");
  }
};
