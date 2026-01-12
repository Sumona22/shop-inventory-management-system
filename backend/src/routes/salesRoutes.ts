import express from "express";
import { createSale } from "../controllers/salesController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Cashier", "StoreManager", "Admin"),
  createSale
);

export default router;
