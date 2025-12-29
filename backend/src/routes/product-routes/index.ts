import express from "express";

import categoryRoutes from "./categoryRoutes";
import brandRoutes from "./brandRoutes";
import productRoutes from "./productRoutes";
import productVariantRoutes from "./productVariantRoutes";

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/variants", productVariantRoutes);

export default router;
