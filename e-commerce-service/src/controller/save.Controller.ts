import { SavedModel } from "../model/saveModel";
import { Request, Response } from "express";

const getSavedProducts = async (req: Request, res: Response) => {
  try {
    const savedProducts = await SavedModel.find();
    res.send(savedProducts);
  } catch (error) {
    res.status(400).json({ errorMessage: "Aldaa garlaa" });
  }
};
const getOneSavedProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const savedProduct = await SavedModel.findOne({ ProductId: id });
    res.status(200).send(savedProduct);
  } catch (error) {
    res.status(400).json({ errorMessage: "Aldaa garlaa" });
  }
};
const createSavedProducts = async (req: Request, res: Response) => {
  const save = req.body;
  console.log(save);
  try {
    const savedProduct = await SavedModel.create(save);

    res.send(savedProduct);
  } catch (error) {
    res.status(400).json({ errorMessage: "Aldaa garlaa" });
  }
};

const updateSavedProducts = async (req: Request, res: Response) => {
  const { name, amount } = req.body;
  const { id } = req.params;
  try {
    const savedProduct = await SavedModel.findByIdAndUpdate(id, {
      name,
      amount,
    });
    res.send({ mesage: "amjilttai update hiilee" });
  } catch (error) {
    res.status(400).json({ errorMessage: "Aldaa garlaa" });
  }
};

const deleteSavedProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await SavedModel.deleteOne({ _id: id });
    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ errorMessage: "Cannot create user!" });
  }
};

const deleteSavedProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    await SavedModel.deleteOne({ ProductId: id });
    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ errorMessage: "Cannot create user!" });
  }
};

export {
  getSavedProducts,
  createSavedProducts,
  updateSavedProducts,
  deleteSavedProducts,
  getOneSavedProduct,
  deleteSavedProduct,
};
