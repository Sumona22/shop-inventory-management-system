import mongoose from "mongoose";
import BranchProduct, {
  IBranchProduct,
} from "../models/stock-models/BranchProduct";

export const incrementBranchStock = async ({
  Business_ID,
  Branch_ID,
  Branch_Product_ID,
  quantity,
  session,
}: {
  Business_ID: mongoose.Types.ObjectId;
  Branch_ID: mongoose.Types.ObjectId;
  Branch_Product_ID: mongoose.Types.ObjectId;
  quantity: number;
  session?: mongoose.ClientSession;
}) => {
  if (quantity === 0) return;

  const bp = (await BranchProduct.findOne(
    {
      _id: Branch_Product_ID,
      Business_ID,
      Branch_ID,
    },
    null,
    { session }
  )) as IBranchProduct | null;

  if (!bp) {
    throw new Error("Branch product not found");
  }

  bp.Stock = (bp.Stock || 0) + quantity;

  if (bp.Stock < 0) {
    throw new Error("Branch product stock cannot be negative");
  }

  await bp.save({ session });
};
