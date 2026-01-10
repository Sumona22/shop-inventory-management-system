import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
import {
  addSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplierController";

const router = express.Router();

/* Add supplier */
router.post(
  "/",
  protect,
  authorize("Admin"),
  addSupplier
);

/* Get suppliers */
router.get(
  "/",
  protect,
  authorize("Admin"),
  getSuppliers
);

/* Get supplier by ID */
router.get(
    "/:id",
    protect,
    authorize("Admin"),
    getSupplierById
);

/* Update supplier */
router.put(
    "/:id",
    protect,
    authorize("Admin"),
    updateSupplier);


export default router;
