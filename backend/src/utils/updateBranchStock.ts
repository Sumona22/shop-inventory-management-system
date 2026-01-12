import BranchStock from "../models/stock-models/BranchStock";
import mongoose from "mongoose";

/* Increment stock for a branch product (lazy-create stock) */
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
  if (quantity === 0) return null;

  const stock = await BranchStock.findOne(
    { Branch_ID, Branch_Product_ID },
    null,
    { session }
  );

  // Create stock lazily if it doesn't exist
  if (!stock) {
    if (quantity < 0) {
      throw new Error("Cannot reduce stock that does not exist");
    }

    const newStock = await BranchStock.create(
      [
        {
          Business_ID,
          Branch_ID,
          Branch_Product_ID,
          Quantity: quantity,
        },
      ],
      { session }
    );

    return newStock[0];
  }

  // Update existing stock
  const updatedQty = stock.Quantity + quantity;

  if (updatedQty < 0) {
    throw new Error("Branch stock cannot be negative");
  }

  stock.Quantity = updatedQty;
  await stock.save({ session });

  return stock;
};
