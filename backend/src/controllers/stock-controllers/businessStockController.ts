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
      $lookup: {
        from: "branchproducts",
        localField: "Branch_Product_ID",
        foreignField: "_id",
        as: "branchProduct",
      },
    },
    { $unwind: "$branchProduct" },
    {
      $group: {
        _id: "$branchProduct.Product_Variant_ID",
        totalQuantity: { $sum: "$Quantity" },
      },
    },
  ]);

  res.status(200).json(stock);
};
