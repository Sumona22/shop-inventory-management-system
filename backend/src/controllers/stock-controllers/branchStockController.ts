import { Request, Response } from "express";
import BranchStock from "../../models/stock-models/BranchStock";

/* Fetch branch stock for all product variants */

export const getBranchStock = async (req: any, res: Response) => {
  const { branchId } = req.params;

  const stock = await BranchStock.find({
    Business_ID: req.user.Business_ID,
    Branch_ID: branchId,
  }).populate("Product_Variant_ID");

  res.status(200).json(stock);
};

/* Fetch Product variant-wise branch stock */

export const getBranchProductStock = async (req: any, res: Response) => {
  const { branchId, productVariantId } = req.params;

  const stock = await BranchStock.findOne({
    Business_ID: req.user.Business_ID,
    Branch_ID: branchId,
    Product_Variant_ID: productVariantId,
  });

  res.status(200).json(stock);
};

