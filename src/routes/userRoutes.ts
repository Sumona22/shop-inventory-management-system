import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import { createBranch, createStoreManager, createStaffOrCashier, getUser } from "../controllers/userController";

const router = express.Router();

// Admin-only
router.post("/branch", protect, authorize("Admin"), createBranch);
router.post("/manager", protect, authorize("Admin"), createStoreManager);

// Store Manager-only
router.post("/staff-or-cashier", protect, authorize("StoreManager"), createStaffOrCashier);

// Shared protected
router.get("/:id", protect, getUser);

export default router;