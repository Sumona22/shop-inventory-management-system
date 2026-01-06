import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import { getBranchesByBusiness } from "../controllers/branchController";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("Admin"),
  getBranchesByBusiness
);

export default router;
