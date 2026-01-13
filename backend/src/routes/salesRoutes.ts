import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  createSale,
  getSalesReport,
  getSalesAnalytics,
} from "../controllers/salesController";

const router = express.Router();

/* Cashier creates sale */
router.post(
  "/",
  protect,
  authorize("Cashier"),
  createSale
);

/* Admin / Store Manager sales table */
router.get(
  "/report",
  protect,
  authorize("Admin", "StoreManager"),
  getSalesReport
);

/* Admin / Store Manager analytics (charts) */
router.get(
  "/analytics",
  protect,
  authorize("Admin", "StoreManager"),
  getSalesAnalytics
);

export default router;
