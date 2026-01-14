import { Router } from "express";
import { forecastStockout } from "../controllers/forecastController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * Forecast stockout
 */
router.post("/stockout", protect, forecastStockout);

export default router;
