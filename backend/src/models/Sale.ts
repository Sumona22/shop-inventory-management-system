import mongoose, { Schema, Document } from "mongoose";

export enum PaymentMode {
  CASH = "Cash",
  UPI = "UPI",
  CARD = "Card",
  MIXED = "Mixed",
}

export interface ISale extends Document {
  Business_ID: mongoose.Types.ObjectId;
  Branch_ID: mongoose.Types.ObjectId;
  Cashier_User_ID: mongoose.Types.ObjectId;

  Invoice_Number: string;

  Customer_Name?: string;
  Customer_Phone?: string;

  Payment_Mode: PaymentMode;

  Total_Amount: number;   // sum of item prices before tax
  Total_Tax: number;
  Discount: number;
  Grand_Total: number;

  Created_At: Date;
}

const saleSchema = new Schema<ISale>(
  {
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

    Cashier_User_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Invoice_Number: {
      type: String,
      required: true,
      unique: true,
    },

    Customer_Name: String,
    Customer_Phone: String,

    Payment_Mode: {
      type: String,
      enum: Object.values(PaymentMode),
      required: true,
    },

    Total_Amount: { type: Number, required: true },
    Total_Tax: { type: Number, required: true },
    Discount: { type: Number, default: 0 },
    Grand_Total: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: "Created_At", updatedAt: false },
  }
);

saleSchema.index({ Branch_ID: 1, Created_At: -1 });
saleSchema.index({ Invoice_Number: 1 });

export default mongoose.model<ISale>("Sale", saleSchema);
