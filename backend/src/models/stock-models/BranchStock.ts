import mongoose, { Schema, Document } from "mongoose";

export interface IBranchStock extends Document {
    Business_ID: mongoose.Types.ObjectId;
    Branch_ID: mongoose.Types.ObjectId;
    Product_Variant_ID: mongoose.Types.ObjectId;
    Quantity: number;
}

const branchStockSchema = new Schema<IBranchStock>(
    {
        Business_ID:{
            type: Schema.Types.ObjectId,
            ref:"Business",
            required: true,
        },
        Branch_ID:{
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        Product_Variant_ID:{
            type: Schema.Types.ObjectId,
            ref: "ProductVariant",
            required: true,
        },
        Quantity:{
            type: Number,
            default: 0,
            min: 0,
        }
    },
    {
        timestamps: true,
    }
);

branchStockSchema.index(
  { Branch_ID: 1, Product_Variant_ID: 1 },
  { unique: true }
);
branchStockSchema.index({Business_ID: 1});

export default mongoose.model<IBranchStock>("BranchStock", branchStockSchema);