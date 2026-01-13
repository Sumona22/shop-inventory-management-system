import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import {
  createBranchProduct,
  getBranchProducts,
  getBranchProductsByBranch,
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

/* Get branch products by branchId (Store Manager stock screen) */
router.get(
  "/branch/:branchId",
  protect,
  authorize("Admin", "StoreManager", "StoreStaff","Cashier"),
  getBranchProductsByBranch
);


export default router;
