import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createBatch,
  getBatchesByBranch,
  getBatchById,
  updateBatch,
} from "../../controllers/stock-controllers/batchController";

const router = express.Router();

/* Store Staff creates batch */
router.post(
  "/",
  protect,
  authorize("StoreStaff"),
  createBatch
);

/* Get all batches by Branch ID */
router.get(
  "/branch",
  protect,
  authorize("StoreStaff", "StoreManager", "Cashier"),
  getBatchesByBranch
);


/* Get batch by ID */
router.get(
  "/:batchId",
  protect,
  authorize("StoreStaff", "StoreManager", "Cashier"),
  getBatchById
);

/* Update batch (status, expiry) */
router.put(
  "/:batchId",
  protect,
  authorize("StoreStaff", "StoreManager"),
  updateBatch
);


export default router;
