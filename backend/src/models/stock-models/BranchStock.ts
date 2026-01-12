import mongoose, { Schema, Document } from "mongoose";

export interface IBranchStock extends Document {
  Business_ID: mongoose.Types.ObjectId;
  Branch_ID: mongoose.Types.ObjectId;

  Product_ID?: mongoose.Types.ObjectId;
  ProductVariant_ID: mongoose.Types.ObjectId;

  Batch_ID: mongoose.Types.ObjectId;
  Branch_Product_ID: mongoose.Types.ObjectId;

  Quantity: number;
  Cost_Price: number;

  Created_At: Date;
}

const branchStockSchema = new Schema<IBranchStock>(
    {
        Business_ID: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        Branch_ID: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        Branch_Product_ID: {
            type: Schema.Types.ObjectId,
            ref: "BranchProduct",
            required: true,
        },
        Quantity: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

branchStockSchema.index(
    { Branch_ID: 1, Product_Variant_ID: 1 },
    { unique: true }
);
branchStockSchema.index({ Business_ID: 1 });

export default mongoose.model<IBranchStock>("BranchStock", branchStockSchema);