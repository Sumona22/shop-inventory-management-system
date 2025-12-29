import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
    Supplier_Name: string;
    Supplier_Email: string;
    Supplier_Address: string;
    Supplier_Phone?: string;
    GST_Number?: string;
    Notes?: string;
    Is_Active: boolean;
    Admin_User_ID: mongoose.Types.ObjectId;
    Business_ID: mongoose.Types.ObjectId;
}

const supplierSchema = new Schema<ISupplier>(
    {
        Supplier_Name: {
            type: String,
            required: true,
            trim: true
        },

        Supplier_Email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        Supplier_Address: {
            type: String,
            required: true
        },

        Supplier_Phone: {
            type: String,
            match: [/^[0-9+\-\s]{7,15}$/, "Invalid phone number"]
        },

        GST_Number: {
            type: String,
            trim: true
        },

        Notes: {
            type: String
        },

        Is_Active: {
            type: Boolean,
            default: true
        },

        Admin_User_ID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        Business_ID: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true
        }
    },
    { timestamps: true }
);

/**
 * Prevent duplicate supplier email per business
 */
supplierSchema.index(
    { Supplier_Email: 1, Business_ID: 1 },
    { unique: true }
);

export default mongoose.model<ISupplier>("Supplier", supplierSchema);
