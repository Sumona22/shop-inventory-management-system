import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../controllers/product-controllers/categoryController";

const router = express.Router();

/* Create Category */
router.post(
  "/",
  protect,
  authorize("Admin"),
  createCategory
);

/* Get all categories */
router.get(
  "/",
  protect,
  authorize("Admin", "StoreManager"),
  getCategories
);

/* Get category by ID */
router.get(
  "/:categoryId",
  protect,
  authorize("Admin", "StoreManager", "StoreStaff", "Cashier"),
  getCategoryById
);

/* Update category */
router.put(
  "/:categoryId",
  protect,
  authorize("Admin"),
  updateCategory
);

export default router;
