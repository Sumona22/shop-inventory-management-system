import { Request, Response } from "express";
import BranchProduct from "../../models/stock-models/BranchProduct";
import User from "../../models/User";

/* Create / Enable Product for Branch */
export const createBranchProduct = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id);

    if (!user || user.Role !== "StoreManager") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { Product_Variant_ID, Alert_Threshold } = req.body;

    const branchProduct = await BranchProduct.create({
      Business_ID: user.Business_ID,
      Branch_ID: user.Branch_ID,
      Product_Variant_ID,
      Alert_Threshold,
    });

    res.status(201).json({
      message: "Product enabled for branch",
      Branch_Product_ID: branchProduct._id,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Failed to add branch product",
      error: err.message,
    });
  }
};

/* Get Branch Products */
export const getBranchProducts = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const filter: any = {
      Business_ID: user.Business_ID,
      Is_Active: true,
    };

    // Branch-level access
    if (user.Role === "Admin" && req.query.branchId) {
      filter.Branch_ID = req.query.branchId;
    } else if (user.Role !== "Admin") {
      if (!user.Branch_ID) return res.status(400).json({ message: "Branch not assigned" });
      filter.Branch_ID = user.Branch_ID;
    }

    if (req.query.productVariantId) {
      filter.Product_Variant_ID = req.query.productVariantId;
    }

    const branchProducts = await BranchProduct.find(filter)
      .select("Product_Variant_ID Branch_ID Alert_Threshold Is_Active")
      .populate({
        path: "Product_Variant_ID",
        select: "SKU SKU_Normalized Pack_Size Unit Price Tracking_Type Brand_ID Product_ID",
        populate: [
          { path: "Brand_ID", select: "Brand_Name" },
          {
            path: "Product_ID",
            select: "Product_Name Category_ID",
            populate: { path: "Category_ID", select: "Category_Name" },
          },
        ],
      })
      .populate("Branch_ID", "Branch_Name");

    res.status(200).json(branchProducts);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch branch products", error: err.message });
  }
};


/* Get branch products by branchId */

export const getBranchProductsByBranch = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { branchId } = req.params;

    // StoreManager restricted to own branch
    if (user.Role === "StoreManager") {
      if (!user.Branch_ID) return res.status(400).json({ message: "Branch not assigned" });
      if (user.Branch_ID.toString() !== branchId) {
        return res.status(403).json({ message: "Access denied to this branch" });
      }
    }

    const branchProducts = await BranchProduct.find({
      Business_ID: user.Business_ID,
      Branch_ID: branchId,
      Is_Active: true,
    })
      .select("Product_Variant_ID Alert_Threshold Is_Active")
      .populate({
        path: "Product_Variant_ID",
        select: "SKU SKU_Normalized Pack_Size Unit Price Tracking_Type Brand_ID Product_ID",
        populate: [
          { path: "Brand_ID", select: "Brand_Name" },
          {
            path: "Product_ID",
            select: "Product_Name Category_ID",
            populate: { path: "Category_ID", select: "Category_Name" },
          },
        ],
      });

    res.status(200).json(branchProducts);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch branch products by branch", error: err.message });
  }
};


/* Update Branch Product */
export const updateBranchProduct = async (req: Request, res: Response) => {
  try {
    const { branchProductId } = req.params;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "StoreManager") {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!requester.Branch_ID) {
      return res.status(400).json({ message: "Branch not assigned to user" });
    }

    const branchProduct = await BranchProduct.findOne({
      _id: branchProductId,
      Business_ID: requester.Business_ID,
    });

    if (!branchProduct) {
      return res.status(404).json({ message: "Branch product not found" });
    }

    // Store manager updates ONLY their branch product
    if (
      !branchProduct.Branch_ID ||
      branchProduct.Branch_ID.toString() !== requester.Branch_ID.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Cannot update product of another branch" });
    }

    const { Alert_Threshold, Is_Active } = req.body;

    if (Alert_Threshold !== undefined) {
      branchProduct.Alert_Threshold = Alert_Threshold;
    }

    if (Is_Active !== undefined) {
      branchProduct.Is_Active = Is_Active;
    }

    await branchProduct.save();

    res.status(200).json({
      message: "Branch product updated successfully",
      Branch_Product_ID: branchProduct._id,
    });
  } catch (err: any) {
    console.error("Update branch product error:", err);
    res.status(400).json({
      message: "Failed to update branch product",
      error: err.message,
    });
  }
};
