import mongoose, { Schema, Document } from "mongoose";

export interface IBranch extends Document {
  Business_ID: mongoose.Types.ObjectId;
  Branch_Name: string;
  Branch_Address: string;
}

const branchSchema = new Schema<IBranch>({
  Business_ID: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  Branch_Name: { type: String, required: true },
  Branch_Address: { type: String, required: true },
});

export default mongoose.model<IBranch>("Branch", branchSchema);