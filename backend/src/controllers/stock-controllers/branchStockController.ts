import { Request, Response } from "express";
import BranchStock from "../../models/stock-models/BranchStock";

/* Fetch all branch stock for a branch */
export const getBranchStock = async (req: any, res: Response) => {
  try {
    const { branchId } = req.params;

    const stock = await BranchStock.find({
      Business_ID: req.user.Business_ID,
      Branch_ID: branchId,
    }).populate({
      path: "Branch_Product_ID",
      populate: {
        path: "Product_Variant_ID Product_ID",
      },
    });

    res.status(200).json(stock);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch branch stock",
      error: err.message,
    });
  }
};

/* Fetch stock for a specific branch product */
export const getBranchProductStock = async (req: any, res: Response) => {
  try {
    const { branchId, branchProductId } = req.params;

    const stock = await BranchStock.findOne({
      Business_ID: req.user.Business_ID,
      Branch_ID: branchId,
      Branch_Product_ID: branchProductId,
    }).populate({
      path: "Branch_Product_ID",
      populate: {
        path: "Product_Variant_ID Product_ID",
      },
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json(stock);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch branch product stock",
      error: err.message,
    });
  }
};

/* Update branch stock quantity */
export const updateBranchStock = async (req: any, res: Response) => {
  try {
    const { branchId, branchProductId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ message: "Quantity is required" });
    }

    const stock = await BranchStock.findOne({
      Business_ID: req.user.Business_ID,
      Branch_ID: branchId,
      Branch_Product_ID: branchProductId,
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    stock.Quantity = quantity;

    await stock.save();

    res.status(200).json({
      message: "Branch stock updated successfully",
      Branch_Stock_ID: stock._id,
      Quantity: stock.Quantity,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to update branch stock",
      error: err.message,
    });
  }
};
