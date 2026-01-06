import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  addSupplierProduct,
  getSupplierCatalog,
  searchSuppliers,
} from "../controllers/supplierProductController";

const router = express.Router();

/* Add product to supplier */
router.post(
  "/",
  protect,
  authorize("Admin"),
  addSupplierProduct
);

/* Get all products supplied by a supplier */
router.get(
  "/supplier/:supplierId",
  protect,
  authorize("Admin"),
  getSupplierCatalog
);

/* Search suppliers by product / brand / category / sku */
router.get(
  "/search",
  protect,
  authorize("Admin"),
  searchSuppliers
);

export default router;
