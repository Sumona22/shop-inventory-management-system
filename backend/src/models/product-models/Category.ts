import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    Business_ID: mongoose.Types.ObjectId;
    Category_Name: string;
    Category_Description: string;
}

const categorySchema = new Schema<ICategory>(
    {
        Business_ID:
        {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        Category_Name: {
            type: String,
            required: true,
            trim: true,
            set: (value: string) => value.replace(/\s+/g, " "),
            validate: {
                validator: (value: string) => value.trim().length > 0,
                message: "Category name cannot be empty or spaces only",
            }
        },
        Category_Description: { type: String, trim: true },
    }
);

categorySchema.index({ Business_ID: 1, Category_Name: 1 }, { unique: true });

export default mongoose.model<ICategory>("Category", categorySchema);