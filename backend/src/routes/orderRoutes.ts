import { Router } from "express";
import { createOrder } from "../controllers/orderController";
import { addSupplier } from "../controllers/supplierController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = Router();

/**
 * SUPPLIER ROUTES
 */
router.post(
  "/supplier/add",
  protect,
  authorize("Admin"),
  addSupplier
);

/**
 * ORDER ROUTES
 */
router.post(
  "/order/create",
  protect,
  authorize("Admin"),
  createOrder
);

export default router;
