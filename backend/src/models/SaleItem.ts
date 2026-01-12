import mongoose, { Schema, Document } from "mongoose";

export interface ISaleItem extends Document {
  Sale_ID: mongoose.Types.ObjectId;

  Business_ID: mongoose.Types.ObjectId;
  Branch_ID: mongoose.Types.ObjectId;

  Product_ID: mongoose.Types.ObjectId;
  ProductVariant_ID: mongoose.Types.ObjectId;
  Category_ID: mongoose.Types.ObjectId;
  Brand_ID: mongoose.Types.ObjectId;

  Batch_ID: mongoose.Types.ObjectId;

  Quantity: number;

  Cost_Price: number;
  Selling_Price: number;
  Tax_Percentage: number;

  Line_Total: number;

  Created_At: Date;
}

const saleItemSchema = new Schema<ISaleItem>(
  {
    Sale_ID: {
      type: Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
      index: true,
    },

    Business_ID: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    Branch_ID: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    Product_ID: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    ProductVariant_ID: {
      type: Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
      index: true,
    },

    Category_ID: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    Brand_ID: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    Batch_ID: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    Quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    Cost_Price: {
      type: Number,
      required: true,
    },

    Selling_Price: {
      type: Number,
      required: true,
    },

    Tax_Percentage: {
      type: Number,
      required: true,
    },

    Line_Total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "Created_At", updatedAt: false },
  }
);

saleItemSchema.index({ Branch_ID: 1, Created_At: -1 });
saleItemSchema.index({ Product_ID: 1 });
saleItemSchema.index({ Category_ID: 1 });
saleItemSchema.index({ Brand_ID: 1 });
saleItemSchema.index({ ProductVariant_ID: 1 });
saleItemSchema.index({ Batch_ID: 1 });

export default mongoose.model<ISaleItem>("SaleItem", saleItemSchema);
