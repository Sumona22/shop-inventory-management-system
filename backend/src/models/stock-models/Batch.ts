import mongoose, { Schema, Document } from "mongoose";

export enum Batch_Status {
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    DEPLETED = "DEPLETED",
}

export interface IBatch extends Document {
    Branch_ID: mongoose.Types.ObjectId;
    Product_Variant_ID: mongoose.Types.ObjectId;

    Batch_No: number;
    Batch_Code: string;

    Mfg_Date?: Date;
    Exp_Date?: Date;

    Quantity: number;
    Batch_Status: Batch_Status;
}

const batchSchema = new Schema<IBatch>(
    {
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
        Batch_No: {
            type: Number,
            required: true,
        },
        Batch_Code: {
            type: String,
            required: true,
            trim: true,
        },
        Mfg_Date: Date,
        Exp_Date: Date,

        Quantity: {
            type: Number,
            required: true,
        },
        Batch_Status: {
            type: String,
            enum: Object.values(Batch_Status),
            default: Batch_Status.ACTIVE,
        },
    },
    {
        timestamps: true
    }
);

batchSchema.index({ Branch_ID: 1, Product_Variant_ID: 1, Batch_No: 1 }, { unique: true });
batchSchema.index({Exp_Date: 1});
batchSchema.index({Batch_Status: 1});

export default mongoose.model<IBatch>("Batch", batchSchema);