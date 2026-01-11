import BranchStock from "../models/stock-models/BranchStock";
import mongoose from "mongoose";

/* Increment stock for a branch product */
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
  const stock = await BranchStock.findOne({
    Branch_ID,
    Branch_Product_ID,
  });

  if (!stock) {
    throw new Error("Cannot add stock. Branch product does not exist");
  }

  stock.Quantity += quantity;

  if (stock.Quantity < 0) {
    throw new Error("Branch stock cannot be negative");
  }

  await stock.save({ session });

  return stock;
};
