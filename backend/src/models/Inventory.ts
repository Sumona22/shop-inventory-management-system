import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
    Product_ID: mongoose.Types.ObjectId;
    Business_ID: mongoose.Types.ObjectId;
    Batch_Number: string;
    MFG_Date?: Date;
    EXP_Date?: Date;
    Quantity_Available: number;
    Created_From_GRN: mongoose.Types.ObjectId;
}

const inventorySchema = new Schema<IInventory>(
    {
        Product_ID: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        Business_ID: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },

        Batch_Number: {
            type: String,
            required: true
        },

        MFG_Date: Date,
        EXP_Date: Date,

        Quantity_Available: {
            type: Number,
            required: true
        },

        Created_From_GRN: {
            type: Schema.Types.ObjectId,
            ref: "Goods_Receipt"
        }
    },
    { timestamps: true }
);

export default mongoose.model<IInventory>("Inventory", inventorySchema);
