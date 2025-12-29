import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createProductVariant,
  getProductVariants,
} from "../../controllers/product-controllers/productVariantController";

const router = express.Router();

/* Create Product Variant */
router.post(
  "/",
  protect,
  authorize("Admin"),
  createProductVariant
);

/* Get all variants */
router.get(
  "/",
  protect,
  authorize("Admin", "StoreManager"),
  getProductVariants
);

export default router;

