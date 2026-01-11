import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import { getBranchesByBusiness } from "../controllers/branchController";
import { createBranchWithStoreManager } from "../controllers/userController";

const router = express.Router();

router.post(
  "/branch-with-manager",
  protect,
  authorize("Admin"),
  createBranchWithStoreManager// Controller function to create branch with manager goes here
); 

router.get(
  "/",
  protect,
  authorize("Admin"),
  getBranchesByBusiness
);

export default router;
