import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createBatch,
  getBatchesByBranch,
  getBatchById,
  updateBatch,
} from "../../controllers/stock-controllers/batchController";

const router = express.Router();

/* ================= CREATE BATCH ================= */
/* Store Staff only */
router.post(
  "/",
  protect,
  authorize("StoreStaff"),
  createBatch
);

/* ================= GET BATCHES FOR BRANCH ================= */
/* StoreStaff, StoreManager, Cashier */
router.get(
  "/branch",
  protect,
  authorize("StoreStaff", "StoreManager", "Cashier"),
  getBatchesByBranch
);

/* ================= GET BATCH BY ID ================= */
router.get(
  "/:batchId",
  protect,
  authorize("StoreStaff", "StoreManager", "Cashier"),
  getBatchById
);

/* ================= UPDATE BATCH ================= */
/* StoreStaff, StoreManager */
router.put(
  "/:batchId",
  protect,
  authorize("StoreStaff", "StoreManager"),
  updateBatch
);

export default router;
