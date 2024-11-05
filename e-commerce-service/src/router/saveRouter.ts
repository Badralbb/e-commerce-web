import express from "express";
import {
  createSavedProducts,
  deleteSavedProduct,
  deleteSavedProducts,
  getOneSavedProduct,
  getSavedProducts,
  updateSavedProducts,
} from "../controller/save.Controller";
import { middleWare } from "../middleWare";

const saveRouter = express.Router();

saveRouter
  .get("/Save", getSavedProducts)
  .get("/Save/:id", getOneSavedProduct)
  .post("/Save", createSavedProducts)
  .put("/Save/:id", updateSavedProducts)
  .delete("/Save/:id", deleteSavedProducts)
  .delete("/saved/:id", deleteSavedProduct);

export { saveRouter };
