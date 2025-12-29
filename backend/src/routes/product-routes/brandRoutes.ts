import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
} from "../../controllers/product-controllers/brandController";

const router = express.Router();

/* Create Brand */
router.post(
  "/",
  protect,
  authorize("Admin"),
  createBrand
);

/* Get all brands */
router.get(
  "/",
  protect,
  authorize("Admin", "StoreManager"),
  getBrands
);

/* Get brand by ID */
router.get(
  "/:brandId",
  protect,
  authorize("Admin", "StoreManager"),
  getBrandById
);

/* Update brand */
router.put(
  "/:brandId",
  protect,
  authorize("Admin"),
  updateBrand
);

export default router;
