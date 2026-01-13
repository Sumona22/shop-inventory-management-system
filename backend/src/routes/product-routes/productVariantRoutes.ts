import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createProductVariant,
  getProductVariantById,
  getProductVariants,
  updateProductVariant,
} from "../../controllers/product-controllers/productVariantController";

const router = express.Router();

/* Create Product Variant */
router.post(
  "/",
  protect,
  authorize("Admin"),
  createProductVariant
);

/* Get all variants or by Brand ID or Product ID*/
router.get(
  "/",
  protect,
  authorize("Admin", "StoreManager"),
  getProductVariants
);

/* Get variant by ID */

router.get("/:variantId", protect, getProductVariantById);

/* Update product variant */
router.put(
  "/:variantId",
  protect,
  authorize("Admin"),
  updateProductVariant
);


export default router;

