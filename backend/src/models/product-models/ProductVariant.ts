import mongoose, { Schema, Document } from "mongoose";

export enum TrackingType {
    BATCH = "BATCH",
    ITEM = "ITEM",
}

export interface IProductVariant extends Document {
    Business_ID: mongoose.Types.ObjectId;
    Product_ID: mongoose.Types.ObjectId;
    Brand_ID: mongoose.Types.ObjectId;

    SKU: string;
    SKU_Normalized: string;

    Pack_Size: number;
    Unit: string;
    Price: number;

    Attributes: Map<string, string>;

    Tracking_Type: TrackingType;
}

const productVariantSchema = new Schema<IProductVariant>({
    Business_ID: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
    Product_ID: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    Brand_ID: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    SKU: {
        type: String,
        required: true
    },
    SKU_Normalized: {
        type: String,
        required: true
    },

    Pack_Size: {
        type: Number,
        required: true
    },
    Unit: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        requiered: true,
    },

    Attributes: {
        type: Map,
        of: String,
        default: {},
    },
    Tracking_Type: {
        type: String,
        enum: Object.values(TrackingType),
        required: true,
    },
},
    {
        timestamps: true
    }
);

productVariantSchema.index({ Business_ID: 1, SKU_Normalized: 1 }, { unique: true });
productVariantSchema.index({ Product_ID: 1 });
productVariantSchema.index({ Brand_ID: 1 });

export default mongoose.model<IProductVariant>("ProductVariant", productVariantSchema);


