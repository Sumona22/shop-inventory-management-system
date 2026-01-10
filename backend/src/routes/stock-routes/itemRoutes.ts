import express from "express";
import { protect, authorize } from "../../middleware/authMiddleware";
import { createItem } from "../../controllers/stock-controllers/itemController";

const router = express.Router();

/* Store Staff adds item */
router.post(
  "/",
  protect,
  authorize("StoreStaff"),
  createItem
);

export default router;
