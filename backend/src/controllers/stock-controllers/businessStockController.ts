import { Request, Response } from "express";
import BranchStock from "../../models/stock-models/BranchStock";

export const getBusinessTotalStock = async (req: any, res: Response) => {
  const stock = await BranchStock.aggregate([
    {
      $match: {
        Business_ID: req.user.Business_ID,
      },
    },
    {
      $group: {
        _id: "$Product_Variant_ID",
        totalQuantity: { $sum: "$Quantity" },
      },
    },
  ]);

  res.status(200).json(stock);
};
