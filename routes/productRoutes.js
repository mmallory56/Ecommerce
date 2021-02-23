import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createNewProduct,
  UpdateProduct,
  createNewReview,
  getTopProducts,
} from "../controller/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

//@ desc Fetch all products
//@route get /api/products
//@access Public
router.route("/").get(getProducts).post(createNewProduct);
router.route("/topProducts").get(getTopProducts);
//@ desc Fetch a product
//@route get /api/products/:id
//@access Public
router.route("/:id/reviews").post(protect, createNewReview);
router.route("/:id").delete(protect, admin, deleteProduct);
router.route("/:id").get(getProductById).put(protect, admin, UpdateProduct);

export default router;
