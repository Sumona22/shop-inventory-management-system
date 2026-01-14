import { Response } from "express";
import mongoose from "mongoose";

import Batch, { Batch_Status } from "../models/stock-models/Batch";
import SaleItem from "../models/SaleItem";
import ProductVariant from "../models/product-models/ProductVariant";
import BranchProduct from "../models/stock-models/BranchProduct";

/**
 * POST /api/forecast/stockout
 * Forecast days until stockout for a product variant (branch-level)
 */
export const forecastStockout = async (req: any, res: Response) => {
  try {
    /* ===============================
       0️⃣ AUTH & INPUT VALIDATION
    =============================== */
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { ProductVariant_ID } = req.body;
    const { Business_ID, Branch_ID } = req.user;

    if (!ProductVariant_ID) {
      return res.status(400).json({
        success: false,
        message: "ProductVariant_ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(ProductVariant_ID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ProductVariant_ID",
      });
    }

    /* ===============================
       1️⃣ FIND BRANCH PRODUCT
       (VERY IMPORTANT)
    =============================== */
    const branchProduct = await BranchProduct.findOne({
      Business_ID,
      Branch_ID,
      Product_Variant_ID: ProductVariant_ID,
      Is_Active: true,
    });

    if (!branchProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not enabled for this branch",
      });
    }

    /* ===============================
       2️⃣ CURRENT STOCK (CORRECT)
       ONLY THIS PRODUCT
    =============================== */
    const stockAgg = await Batch.aggregate([
      {
        $match: {
          Business_ID: new mongoose.Types.ObjectId(Business_ID),
          Branch_ID: new mongoose.Types.ObjectId(Branch_ID),
          Branch_Product_ID: branchProduct._id,
          Batch_Status: Batch_Status.ACTIVE,
          Quantity: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$Quantity" },
        },
      },
    ]);

    const Current_Stock = stockAgg[0]?.totalStock || 0;

    /* ===============================
       3️⃣ SALES (LAST 30 DAYS)
    =============================== */
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const salesAgg = await SaleItem.aggregate([
      {
        $match: {
          Business_ID: new mongoose.Types.ObjectId(Business_ID),
          Branch_ID: new mongoose.Types.ObjectId(Branch_ID),
          ProductVariant_ID: new mongoose.Types.ObjectId(ProductVariant_ID),
          Created_At: { $gte: fromDate },
        },
      },
      {
        $group: {
          _id: null,
          totalSold: { $sum: "$Quantity" },
        },
      },
    ]);

    const Total_Sold_Last_30_Days = salesAgg[0]?.totalSold || 0;

    /* ===============================
       4️⃣ FORECAST LOGIC
    =============================== */
    const Average_Daily_Sales = Total_Sold_Last_30_Days / 30;

    let Days_Until_Stockout: number | null = null;
    let Forecast_Status = "No Sales Data";

    if (Average_Daily_Sales > 0) {
      Days_Until_Stockout = Math.floor(
        Current_Stock / Average_Daily_Sales
      );

      if (Days_Until_Stockout <= 7) Forecast_Status = "Critical";
      else if (Days_Until_Stockout <= 15) Forecast_Status = "Warning";
      else Forecast_Status = "Healthy";
    }

    /* ===============================
       5️⃣ PRODUCT INFO
    =============================== */
    const variant = await ProductVariant.findById(ProductVariant_ID);

    return res.json({
      success: true,
      ProductVariant_ID,
      SKU: variant?.SKU,
      Current_Stock,
      Total_Sold_Last_30_Days,
      Average_Daily_Sales: Number(Average_Daily_Sales.toFixed(2)),
      Days_Until_Stockout,
      Forecast_Status,
    });
  } catch (err: any) {
    console.error("FORECAST ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
