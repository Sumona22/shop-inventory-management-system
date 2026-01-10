import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import { createBatch } from "../../controllers/stock-controllers/batchController";

const router = express.Router();

/* Store Staff adds batch */
router.post(
  "/",
  protect,
  authorize("StoreStaff"),
  createBatch
);

export default router;
