import { Request, Response } from "express";
import mongoose from "mongoose";
import Business from "../models/Business";
import Branch from "../models/Branch";
import User from "../models/User";
import { hashPassword } from "../utils/hashPassword";

// Admin: create branch under a business
export const createBranch = async (req: Request, res: Response) => {
  try {
    const { Business_ID, Branch_Name, Branch_Address } = req.body;

    // Ensure requestor is Admin of the same business
    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") return res.status(403).json({ message: "Forbidden" });
    if (!requester.Business_ID || requester.Business_ID.toString() !== Business_ID)
      return res.status(403).json({ message: "Admin can only manage own business" });

    const business = await Business.findById(Business_ID);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const branch = await Branch.create({ Business_ID: business._id, Branch_Name, Branch_Address });
    res.status(201).json({ Branch_ID: branch._id });
  } catch (error) {
    res.status(400).json({ message: "Branch creation failed", error });
  }
};

// Admin: create Store Manager for a business and branch
export const createStoreManager = async (req: Request, res: Response) => {
  try {
    const { Business_ID, Branch_ID, Password } = req.body;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") return res.status(403).json({ message: "Forbidden" });
    if (!requester.Business_ID || requester.Business_ID.toString() !== Business_ID)
      return res.status(403).json({ message: "Admin can only manage own business" });

    const branch = await Branch.findOne({ _id: Branch_ID, Business_ID });
    if (!branch) return res.status(404).json({ message: "Branch not found for this business" });

    const hashed = await hashPassword(Password);
    const manager = await User.create({
      Role: "StoreManager",
      Business_ID: new mongoose.Types.ObjectId(Business_ID),
      Branch_ID: new mongoose.Types.ObjectId(Branch_ID),
      Password: hashed,
    });

    res.status(201).json({ Manager_ID: manager._id });
  } catch (error) {
    res.status(400).json({ message: "Store Manager creation failed", error });
  }
};

// Store Manager: create Staff or Cashier for their branch
export const createStaffOrCashier = async (req: Request, res: Response) => {
  try {
    const { Role, Branch_ID, Personal_ID, Password } = req.body; // Role: "StoreStaff" | "Cashier"
    if (!["StoreStaff", "Cashier"].includes(Role)) return res.status(400).json({ message: "Invalid role" });

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "StoreManager") return res.status(403).json({ message: "Forbidden" });
    if (!requester.Branch_ID || requester.Branch_ID.toString() !== Branch_ID)
      return res.status(403).json({ message: "Manager can only manage own branch" });

    const branch = await Branch.findById(Branch_ID);
    if (!branch) return res.status(404).json({ message: "Branch not found" });

    const existing = await User.findOne({ Role, Branch_ID, Personal_ID });
    if (existing) return res.status(409).json({ message: "User with this Personal_ID already exists" });

    const hashed = await hashPassword(Password);
    const user = await User.create({
      Role,
      Branch_ID: branch._id,
      Business_ID: branch.Business_ID,
      Personal_ID,
      Password: hashed,
    });

    res.status(201).json({ User_ID: user._id });
  } catch (error) {
    res.status(400).json({ message: "Staff/Cashier creation failed", error });
  }
};

// Get user details (self or admin/manager scoped)
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requester = await User.findById((req as any).user.id);

    if (!requester) return res.status(401).json({ message: "Unauthorized" });

    const target = await User.findById(id);
    if (!target) return res.status(404).json({ message: "User not found" });

    // Access rules:
    // - Self access
    // - Admin can access users within same business
    // - Manager can access users within same branch
    const self = requester._id.equals(target._id);
    const sameBusiness =
      requester.Business_ID && target.Business_ID && requester.Business_ID.equals(target.Business_ID);
    const sameBranch = requester.Branch_ID && target.Branch_ID && requester.Branch_ID.equals(target.Branch_ID);

    if (
      !self &&
      !(
        (requester.Role === "Admin" && sameBusiness) ||
        (requester.Role === "StoreManager" && sameBranch)
      )
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json({
      id: target._id,
      Role: target.Role,
      Business_ID: target.Business_ID,
      Branch_ID: target.Branch_ID,
      Personal_ID: target.Personal_ID,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};