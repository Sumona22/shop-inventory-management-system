import mongoose, { Schema, Document } from "mongoose";

export type Role = "Admin" | "StoreManager" | "StoreStaff" | "Cashier";

export interface IUser extends Document {
  Role: Role;
  Business_ID?: mongoose.Types.ObjectId;
  Branch_ID?: mongoose.Types.ObjectId;
  Personal_ID?: string;
  Password: string;
}

const userSchema = new Schema<IUser>({
  Role: { type: String, enum: ["Admin", "StoreManager", "StoreStaff", "Cashier"], required: true },
  Business_ID: { type: Schema.Types.ObjectId, ref: "Business" },
  Branch_ID: { type: Schema.Types.ObjectId, ref: "Branch" },
  Personal_ID: { type: String, unique: true, sparse: true },
  Password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);