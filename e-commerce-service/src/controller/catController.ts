import { Request, Response } from "express";
import { Product } from "../model/productModel";

export const getCategory = async (req: Request, res: Response) => {
  const { categoryType, size } = req.query;
  const filt: { categoryType?: string; size?: string } = {};
  if (categoryType) {
    filt.categoryType = String(categoryType);
  }
  if (size) {
    filt.size = String(size);
  }
  try {
    const Category = await Product.find(filt);
    console.log(Category);
    res.send(Category);
  } catch (err) {
    res.send(err);
  }
};
