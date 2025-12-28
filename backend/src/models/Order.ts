import mongoose, { Schema, Document } from "mongoose";

export enum Order_Status {
    PLACED = "PLACED",
    PARTIALLY_RECEIVED = "PARTIALLY_RECEIVED",
    RECEIVED = "RECEIVED",
    CANCELLED = "CANCELLED"
}

export interface IOrder_Item {
    Product_ID: mongoose.Types.ObjectId;
    Product_Name: string;
    Ordered_Quantity: number;
    Received_Quantity: number;
    Unit_Price: number;
    Total_Price: number;
}

export interface IOrder extends Document {
    Order_Number: string;
    Admin_User_ID: mongoose.Types.ObjectId;
    Business_ID: mongoose.Types.ObjectId;

    Supplier_Snapshot: {
        Supplier_Name: string;
        Supplier_Email: string;
        Supplier_Phone?: string;
        Supplier_Address: string;
        GST_Number?: string;
    };

    Items: IOrder_Item[];
    Order_Status: Order_Status;
    Notes?: string;
}

const orderSchema = new Schema<IOrder>(
    {
        Order_Number: { type: String, required: true },

        Admin_User_ID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        Business_ID: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },

        Supplier_Snapshot: {
            Supplier_Name: String,
            Supplier_Email: String,
            Supplier_Phone: String,
            Supplier_Address: String,
            GST_Number: String
        },

        Items: [
            {
                Product_ID: { type: Schema.Types.ObjectId, ref: "Product" },
                Product_Name: String,
                Ordered_Quantity: Number,
                Received_Quantity: { type: Number, default: 0 },
                Unit_Price: Number,
                Total_Price: Number
            }
        ],

        Order_Status: {
            type: String,
            enum: Object.values(Order_Status),
            default: Order_Status.PLACED
        },

        Notes: String
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
