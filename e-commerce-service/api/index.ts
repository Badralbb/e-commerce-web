// src/index.ts

import express from "express";
import connectDB from "../src/configs/database";
import cors from "cors";
import {
  createProduct,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../src/controller/CategoryController";
import { productsRouter } from "../src/router/productsRouter";
import { saveRouter } from "../src/router/saveRouter";
import { userRouter } from "../src/router/UserRouter";
import { uploadRouter } from "../src/router/uploadRouter";
import { cartRouter } from "../src/router/ShoppingCartRouter";

import { createUserSignUp } from "../src/controller/SignUpController";
import { createUserSignIn } from "../src/controller/SignInController";

import { paymentRouter } from "../src/router/PaymentRouter";
import { orderRouter } from "../src/router/orderRouter";

import { loginRouter } from "../src/router/loginRouter";

import { categoryRouter } from "../src/router/categoryRouter";
import { reviewRouter } from "../src/router/reviewRouther";

import { login } from "../src/controller/dashboardLoginController";

const app = express();
const port = 4000;
connectDB();
app.use(cors());
app.use(express.json());

// products CRUD done
app.use(productsRouter);

app.use(uploadRouter);

app.use(userRouter);
app.use(saveRouter);
app.use(paymentRouter);
app.use(orderRouter);

app.use(cartRouter);

//login service

app.use(loginRouter);

app.post("/SignUp", createUserSignUp);

app.post("/signin", createUserSignIn);

app.post("/login", login);

app.use(categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(cartRouter);

app.use(reviewRouter);
