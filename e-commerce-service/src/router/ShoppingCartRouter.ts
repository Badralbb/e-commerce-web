import express from "express";
import {  } from "../controller/UserController";
import { createShoppingCart, deleteOneCart, getCart,  } from "../controller/ShoppingCartController";


export const cartRouter = express.Router();

cartRouter
  .post("/ShoppingCart", createShoppingCart)
  .get("/ShoppingCart", getCart)
  .delete("/deleteOneCart/:id", deleteOneCart)
