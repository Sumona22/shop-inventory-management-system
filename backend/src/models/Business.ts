import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  Business_Name: string;
  Business_Email: string;
  Address: string;
  Phone?: string;
  Admin_User_ID: mongoose.Types.ObjectId;
}

const businessSchema = new Schema<IBusiness>(
  {
    Business_Name: { type: String, required: true, trim: true },
    Business_Email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    Address: { type: String, required: true },
    Phone: { type: String },
    Admin_User_ID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBusiness>("Business", businessSchema);
