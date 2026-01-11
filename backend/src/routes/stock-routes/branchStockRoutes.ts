import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  getBranchStock,
  getBranchProductStock,
  updateBranchStock,
} from "../../controllers/stock-controllers/branchStockController";

const router = express.Router();

/* Get all branch stock */
router.get("/:branchId", protect, authorize("Admin", "StoreManager", "StoreStaff", "Cashier"), getBranchStock);

/* Get stock of a specific branch product */
router.get("/:branchId/product/:branchProductId", protect, authorize("Admin", "StoreManager", "StoreStaff", "Cashier"), getBranchProductStock);

/* Update stock quantity */
router.put("/:branchId/product/:branchProductId", protect, authorize("Admin", "StoreManager"), updateBranchStock);

export default router;
