import mongoose, {Schema, Document} from "mongoose";


export interface IProduct extends Document {
    Business_ID: mongoose.Types.ObjectId;
    Category_ID: mongoose.Types.ObjectId;
    Product_Name: string;
    Product_Description?: string;
}

const productSchema = new Schema<IProduct>(
    {
        Business_ID: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        Category_ID:{
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        Product_Name: {
            type: String,
            required: true,
            trim: true,
            set: (value: string) => value.replace(/\s+/g, " "),
            validate:{
                validator: (value: string) => value.length > 0,
                message: "Product name can not be empty or spaces only"
            },
        },
        Product_Description: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

productSchema.index({ Business_ID: 1, Category_ID: 1, Product_Name: 1}, { unique: true });

export default mongoose.model<IProduct>("Product", productSchema);
