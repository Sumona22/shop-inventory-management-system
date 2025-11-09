import mongoose, { Schema, Document } from "mongoose";

export interface IBranch extends Document {
  Business_ID: mongoose.Types.ObjectId;
  Branch_Name: string;
  Branch_Address: string;
  StoreManager_User_ID: mongoose.Types.ObjectId;
}

const branchSchema = new Schema<IBranch>(
  {
    Business_ID: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    Branch_Name: { type: String, required: true, trim: true },
    Branch_Address: { type: String, required: true, trim: true },
    StoreManager_User_ID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

branchSchema.index({ Business_ID: 1, Branch_Name: 1 }, { unique: true });

export default mongoose.model<IBranch>("Branch", branchSchema);
