import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createItem,
  getItemById,
  getItemsByBranch,
  updateItem,
} from "../../controllers/stock-controllers/itemController";

const router = express.Router();

/* ================= CREATE ITEM ================= */
/* Store Staff only */
router.post(
  "/",
  protect,
  authorize("StoreStaff"),
  createItem
);

/* ================= GET ITEMS (Branch) ================= */
/* StoreStaff, StoreManager, Cashier */
router.get(
  "/",
  protect,
  authorize("StoreStaff", "StoreManager", "Cashier"),
  getItemsByBranch
);

/* ================= GET ITEM BY ID ================= */
router.get(
  "/:id",
  protect,
  authorize("StoreStaff", "StoreManager", "Cashier"),
  getItemById
);

/* ================= UPDATE ITEM ================= */
/* StoreStaff, StoreManager */
router.put(
  "/:id",
  protect,
  authorize("StoreStaff", "StoreManager"),
  updateItem
);

export default router;
