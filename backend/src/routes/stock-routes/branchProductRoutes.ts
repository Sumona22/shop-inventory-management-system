import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createBranchProduct,
  getBranchProducts,
  updateBranchProduct,
} from "../../controllers/stock-controllers/branchProductController";

const router = express.Router();

/* Enable product for branch */
router.post(
  "/",
  protect,
  authorize("StoreManager"),
  createBranchProduct
);

/* Get branch products */
router.get(
  "/",
  protect,
  authorize("Admin", "StoreManager", "StoreStaff","Cashier"),
  getBranchProducts
);

/* Update branch product */
router.put(
  "/:branchProductId",
  protect,
  authorize("StoreManager"),
  updateBranchProduct
);

export default router;
