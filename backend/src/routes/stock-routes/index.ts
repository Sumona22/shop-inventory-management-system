import express from "express";
import itemRoutes from "./itemRoutes";
import branchStockRoutes from "./branchStockRoutes";
import branchProductRoutes from "./branchProductRoutes";
import batchRoutes from "./batchRoutes";

const router = express.Router();

router.use("/batches", batchRoutes);
router.use("/items", itemRoutes);
router.use("/stocks", branchStockRoutes);
router.use("/branch-products", branchProductRoutes);

export default router;
