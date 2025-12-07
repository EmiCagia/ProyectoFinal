import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { verifyToken, checkAdmin } from "../middlewares/authJWT.js";

const router = express.Router();

router.get("/products", verifyToken, getAllProducts);

router.get("/products/:id", verifyToken, getProductById);

router.post("/products/create", verifyToken, checkAdmin, createProduct);

router.delete("/products/:id", verifyToken, checkAdmin, deleteProduct);

export default router;
