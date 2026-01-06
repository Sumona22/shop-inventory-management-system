import mongoose, { Schema, Document } from "mongoose";

export interface ISupplierProduct extends Document {
  Business_ID: mongoose.Types.ObjectId;

  Supplier_ID: mongoose.Types.ObjectId;
  ProductVariant_ID: mongoose.Types.ObjectId;

  Supplier_Price: number;
  Min_Order_Qty: number;
  Lead_Time_Days?: number;

  Is_Active: boolean;
}

const supplierProductSchema = new Schema<ISupplierProduct>(
  {
    Business_ID: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    Supplier_ID: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    ProductVariant_ID: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },

    Supplier_Price: {
      type: Number,
      required: true,
      min: 0,
    },

    Min_Order_Qty: {
      type: Number,
      default: 1,
      min: 1,
    },

    Lead_Time_Days: {
      type: Number,
      min: 0,
    },

    Is_Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate product mapping per supplier per business
supplierProductSchema.index(
  { Business_ID: 1, Supplier_ID: 1, ProductVariant_ID: 1 },
  { unique: true }
);

// Fast lookups
supplierProductSchema.index({ Supplier_ID: 1 });
supplierProductSchema.index({ ProductVariant_ID: 1 });
supplierProductSchema.index({ Business_ID: 1 });

export default mongoose.model<ISupplierProduct>(
  "SupplierProduct",
  supplierProductSchema
);
