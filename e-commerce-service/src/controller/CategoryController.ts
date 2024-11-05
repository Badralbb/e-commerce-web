import { Request, Response } from "express";
import { Product } from "../model/productModel";

export const createProduct = async (req: Request, res: Response) => {
  const products = req.body;
  products.createAt = new Date();
  console.log(req.body);
  try {
    const product = await Product.create(products);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.send("find error");
  }
};
export const getOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    res.send(product);
  } catch (error) {
    res.send("find error");
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const {
    lowprice,
    highprice,
    toDate = new Date(),
    fromDate = new Date(),
  } = req.query;
  const filt: {
    price?: { $gt: number; $lt: number };
    createAt?: { $gt: Date; $lt: Date };
  } = {};
  if (toDate !== new Date() && fromDate !== new Date()) {
    filt.createAt = {
      $gt: new Date(String(fromDate)),
      $lt: new Date(String(toDate)),
    };
  }

  if (lowprice && highprice) {
    filt.price = { $gt: Number(lowprice), $lt: Number(highprice) };
  }
  if (
    lowprice ||
    highprice ||
    (toDate !== "undefined" && fromDate !== "undefined")
  ) {
    const product = await Product.find(filt);
    return res.send(product);
  }
  try {
    const product = await Product.find();
    res.send(product);
  } catch (error) {
    res.send("find error");
  }
};
export const getFiltProducts = async (req: Request, res: Response) => {
  try {
    let { categoryType, lowprice, highprice, fromDate, toDate } = req.query;

    const filter: {
      categoryType?: string;
      price?: { $gt: number; $lt: number };
      // fromDate?: { $gt: string };
      // toDate?: { $lt: string };
      createAt?: { $gt: string; $lt: string };
    } = {};

    if (categoryType) {
      filter.categoryType = String(categoryType);
      console.log(categoryType);
    }

    if (Number(lowprice) != 0 && Number(highprice) != 0) {
      filter.price = { $gt: Number(lowprice), $lt: Number(highprice) };
    }

    // if (!fromDate && toDate) {
    //   filter.toDate = { $lt: String(toDate) };
    // }
    if (fromDate != "undefined" && toDate != "undefined") {
      filter.createAt = { $gt: String(fromDate), $lt: String(toDate) };
    }
    console.log(filter);

    const filtProduct = await Product.find(filter);
    console.log(filtProduct);
    res.send(filtProduct);
  } catch (err) {
    res.send(err);
  }
};
export const deleteProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete({ _id: id });
    res.send(product);
  } catch (error) {
    res.send("find error");
  }
};
export const updateProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    const product = await Product.updateOne({ _id: id }, updatedProduct);
    res.send(product);
  } catch (error) {
    res.send("find error");
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  const deleteItemsId = req.body.deleteList;
  console.log({ deleteItemsId });
  try {
    for (let i = 0; i < deleteItemsId.length; i++) {
      await Product.findByIdAndDelete({ _id: deleteItemsId[i] });
    }

    res.send("successfully delete");
  } catch (err) {
    res.send(404);
  }
};
