import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  createBranchWithStoreManager,
  createStaffOrCashier,
} from "../controllers/userController";

const router = express.Router();

//  Admin: Create branch + store manager
router.post(
  "/branch-with-manager",
  protect,
  authorize("Admin"),
  createBranchWithStoreManager
);

// Store Manager: Create store staff or cashier
router.post(
  "/staff-or-cashier",
  protect,
  authorize("StoreManager"),
  createStaffOrCashier
);

export default router;
