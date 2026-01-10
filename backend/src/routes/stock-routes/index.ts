import express from "express";
import batchRoutes from "./batchRoutes";
import itemRoutes from "./itemRoutes";
import branchStockRoutes from "./branchStockRoutes";

const router = express.Router();

router.use("/batches", batchRoutes);
router.use("/items", itemRoutes);
router.use("/stocks", branchStockRoutes);

export default router;
