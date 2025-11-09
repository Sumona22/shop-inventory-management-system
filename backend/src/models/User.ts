import mongoose, { Schema, Document } from "mongoose";

export type Role = "Admin" | "StoreManager" | "StoreStaff" | "Cashier";

export interface IUser extends Document {
  Role: Role;
  Business_ID?: mongoose.Types.ObjectId;
  Branch_ID?: mongoose.Types.ObjectId;
  Email: string;
  Password: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    Role: {
      type: String,
      enum: ["Admin", "StoreManager", "StoreStaff", "Cashier"],
      required: true,
    },
    Business_ID: { type: Schema.Types.ObjectId, ref: "Business" },
    Branch_ID: { type: Schema.Types.ObjectId, ref: "Branch" },
    Email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    Password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
