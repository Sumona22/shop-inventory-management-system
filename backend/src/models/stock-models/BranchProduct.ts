import mongoose, { Schema, Document } from "mongoose";

export interface IBranchProduct extends Document {
  Business_ID: mongoose.Types.ObjectId;
  Branch_ID: mongoose.Types.ObjectId;
  Product_Variant_ID: mongoose.Types.ObjectId;

  Stock: number;              // ✅ aggregate
  Alert_Threshold: number;
  Is_Active: boolean;
}

const branchProductSchema = new Schema<IBranchProduct>(
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
    Product_Variant_ID: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },

    Stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    Alert_Threshold: {
      type: Number,
      default: 5,
      min: 0,
    },

    Is_Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

branchProductSchema.index(
  { Branch_ID: 1, Product_Variant_ID: 1 },
  { unique: true }
);

branchProductSchema.index({ Business_ID: 1 });

export default mongoose.model<IBranchProduct>(
  "BranchProduct",
  branchProductSchema
);
