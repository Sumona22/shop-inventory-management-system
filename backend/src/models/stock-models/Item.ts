import mongoose, { Schema, Document } from "mongoose";

export enum Item_Status {
    SOLD = "SOLD",
    IN_STOCK = "IN_STOCK",
}

export interface IItem extends Document {
    Branch_ID: mongoose.Types.ObjectId;
    Product_Variant_ID: mongoose.Types.ObjectId;

    Item_No: string;

    Mfg_Date?: Date;
    Warranty_Expiry?: Date;

    Item_Status: Item_Status;
}

const itemSchema = new Schema<IItem>(
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
itemSchema.index({ Product_Variant_ID: 1 });

export default mongoose.model<IItem>("Item", itemSchema);