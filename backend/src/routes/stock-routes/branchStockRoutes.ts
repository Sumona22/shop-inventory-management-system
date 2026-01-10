import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import { getBusinessTotalStock } from "../../controllers/stock-controllers/businessStockController";
import BranchStock from "../../models/stock-models/BranchStock";

const router = express.Router();

/* View branch stock (staff + cashier + manager) */
router.get(
  "/branch",
  protect,
  authorize("Admin", "StoreManager", "StoreStaff", "Cashier"),
  async (req: any, res) => {
    const stock = await BranchStock.find({
      Branch_ID: req.user.Branch_ID,
    }).populate("Product_Variant_ID");
    res.json(stock);
  }
);

/* View business stock (Admin only) */
router.get(
  "/business",
  protect,
  authorize("Admin"),
  getBusinessTotalStock
);

export default router;
