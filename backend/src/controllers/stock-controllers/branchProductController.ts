import { Request, Response } from "express";
import BranchProduct from "../../models/stock-models/BranchProduct";
import User from "../../models/User";

/* Create / Enable Product for Branch */
export const createBranchProduct = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id);

    if (!user || !["Admin", "StoreManager"].includes(user.Role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { Branch_ID, Product_Variant_ID, Alert_Threshold } = req.body;

    const branchProduct = await BranchProduct.create({
      Business_ID: user.Business_ID,
      Branch_ID,
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
    const requester = await User.findById((req as any).user.id);
    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filter: any = { Business_ID: requester.Business_ID };

    if (req.query.branchId) filter.Branch_ID = req.query.branchId;
    if (req.query.productVariantId)
      filter.Product_Variant_ID = req.query.productVariantId;
    if (req.query.activeOnly === "true")
      filter.Is_Active = true;

    const branchProducts = await BranchProduct.find(filter)
      .populate("Product_Variant_ID")
      .populate("Branch_ID", "Branch_Name");

    res.status(200).json(branchProducts);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch branch products",
      error: err.message,
    });
  }
};

/* Update Branch Product */
export const updateBranchProduct = async (req: Request, res: Response) => {
  try {
    const { branchProductId } = req.params;

    const requester = await User.findById((req as any).user.id);
    if (!requester || !["Admin", "StoreManager"].includes(requester.Role)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { Alert_Threshold, Is_Active } = req.body;

    const branchProduct = await BranchProduct.findOne({
      _id: branchProductId,
      Business_ID: requester.Business_ID,
    });

    if (!branchProduct) {
      return res.status(404).json({ message: "Branch product not found" });
    }

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
    res.status(400).json({
      message: "Failed to update branch product",
      error: err.message,
    });
  }
};
