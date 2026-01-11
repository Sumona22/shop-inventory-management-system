import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
    Business_ID: mongoose.Types.ObjectId;
    Brand_Name: string;
    Brand_Description: string;
}

const brandSchema = new Schema<IBrand>(
    {
        Business_ID: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        Brand_Name: {
            type: String,
            required: true,
            trim: true,
            set: (value: string) => value.replace(/\s+/g, " "),
            validate: {
                validator: (value: string) => value.trim().length > 0,
                message: "Brand name cannot be empty or spaces only",
            }
        },
        Brand_Description: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

brandSchema.index({ Business_ID: 1, Brand_Name: 1 }, { unique: true });

export default mongoose.model<IBrand>("Brand", brandSchema); 