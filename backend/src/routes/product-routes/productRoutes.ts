import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../../controllers/product-controllers/productController";

const router = express.Router();

/* Create Product */
router.post(
  "/",
  protect,
  authorize("Admin"),
  createProduct
);

/* Get all products or Category-wise*/
router.get(
  "/",
  protect,
  authorize("Admin", "StoreManager"),
  getProducts
);

/* Update product */
router.put(
  "/:productId",
  protect,
  authorize("Admin"),
  updateProduct
);

export default router;
