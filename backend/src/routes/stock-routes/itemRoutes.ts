import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import { createItem, getItemById, getItemsByBranch, updateItem } from "../../controllers/stock-controllers/itemController";

const router = express.Router();

/* Store Staff adds item */
router.post(
  "/",
  protect,
  authorize("StoreStaff"),
  createItem
);

/*Get Items of a specific Branch */

router.get(
  "/",
  protect,
  authorize("StoreStaff", "Manager", "Admin"),
  getItemsByBranch
);

/* Get Item by ID */

router.get(
  "/:id",
  protect,
  authorize("StoreStaff", "Manager", "Admin"),
  getItemById
);

/* Update Items */

router.put(
  "/:id",
  protect,
  authorize("StoreStaff", "Manager"),
  updateItem
);

export default router;
