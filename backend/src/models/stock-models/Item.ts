import mongoose, { Schema, Document } from "mongoose";

export enum Item_Status {
    SOLD = "SOLD",
    IN_STOCK = "IN_STOCK",
}

export interface IItem extends Document {
    Business_ID: mongoose.Types.ObjectId;
    Branch_ID: mongoose.Types.ObjectId;
    Branch_Product_ID: mongoose.Types.ObjectId;

    Item_No: string;

    Mfg_Date?: Date;
    Warranty_Expiry?: Date;

    Item_Status: Item_Status;
}

const itemSchema = new Schema<IItem>(
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

        Item_No: {
            type: String,
            required: true,
            trim: true,
            set: (value: string) => value.replace(/\s+/g, ""),
            validate: {
                validator: (value: string) => value.length > 0,
                message: "Item no. must not be empty or spaces only",

            }
        },

        Mfg_Date: Date,
        Warranty_Expiry: Date,

        Item_Status: {
            type: String,
            enum: Object.values(Item_Status),
            default: Item_Status.IN_STOCK,
        },
    },
    {
        timestamps: true
    }
);

itemSchema.index({ Branch_ID: 1, Product_Variant_ID: 1, Item_No: 1 }, { unique: true });
itemSchema.index({ Branch_Product_ID: 1 });
itemSchema.index({ Item_Status: 1 })

export default mongoose.model<IItem>("Item", itemSchema);