import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  Business_Name: string;
  Business_Email: string;
  Primary_Phone_No: string;
  Password: string;
  Primary_Address: string;
}

const businessSchema = new Schema<IBusiness>({
  Business_Name: { type: String, required: true },
  Business_Email: { type: String, required: true, unique: true },
  Primary_Phone_No: { type: String, required: true },
  Password: { type: String, required: true },
  Primary_Address: { type: String, required: true },
});

export default mongoose.model<IBusiness>("Business", businessSchema);