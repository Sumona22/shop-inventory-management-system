import BranchStock from "../models/stock-models/BranchStock";
import mongoose from "mongoose";

export const incrementBranchStock = async ({
  Business_ID,
  Branch_ID,
  Product_Variant_ID,
  quantity,
  session,
}: {
  Business_ID: mongoose.Types.ObjectId;
  Branch_ID: mongoose.Types.ObjectId;
  Product_Variant_ID: mongoose.Types.ObjectId;
  quantity: number;
  session?: mongoose.ClientSession;
}) => {
  await BranchStock.findOneAndUpdate(
    {
      Branch_ID,
      Product_Variant_ID,
    },
    {
      $set: { Business_ID },
      $inc: { Quantity: quantity },
    },
    {
      upsert: true,
      new: true,
      session,
    }
  );
};
