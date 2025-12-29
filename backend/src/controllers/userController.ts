import { Request, Response } from "express";
import Branch from "../models/Branch";
import Business from "../models/Business";
import User from "../models/User";
import { hashPassword } from "../utils/hashPassword";


export const createBranchWithStoreManager = async (req: Request, res: Response) => {
  try {
    const { Business_ID, Branch_Name, Branch_Address, StoreManager_Email, StoreManager_Password } = req.body;

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can create branches" });
    }

    if (requester.Business_ID?.toString() !== Business_ID) {
      return res.status(403).json({ message: "Admin can only create branches for their own business" });
    }

    const business = await Business.findById(Business_ID);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const existingManager = await User.findOne({ Email: StoreManager_Email });
    if (existingManager)
      return res.status(409).json({ message: "Store Manager email already exists" });

    const hashed = await hashPassword(StoreManager_Password);
    const managerUser = await User.create({
      Role: "StoreManager",
      Email: StoreManager_Email,
      Password: hashed,
      Business_ID: business._id,
    });

    const branch = await Branch.create({
      Business_ID: business._id,
      Branch_Name,
      Branch_Address,
      StoreManager_User_ID: managerUser._id,
    });

    managerUser.Branch_ID = branch._id;
    await managerUser.save();

    res.status(201).json({
      message: "Branch and Store Manager created successfully",
      Branch_ID: branch._id,
      StoreManager_User_ID: managerUser._id,
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({
      message: "Branch + Store Manager creation failed",
      error: err.message,
    });
  }
};

/* Create Store Staff or Cashier (StoreManager only) */
export const createStaffOrCashier = async (req: Request, res: Response) => {
  try {
    const { Role, Business_ID, Branch_ID, Email, Password } = req.body;

    if (!["StoreStaff", "Cashier"].includes(Role))
      return res.status(400).json({ message: "Invalid role" });

    const requester = await User.findById((req as any).user.id);
    if (!requester || requester.Role !== "StoreManager")
      return res.status(403).json({ message: "Only Store Manager can add users" });

    if (
      requester.Business_ID?.toString() !== Business_ID ||
      requester.Branch_ID?.toString() !== Branch_ID
    ) {
      return res.status(403).json({
        message: "Store Manager can only manage their own branch",
      });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser)
      return res.status(409).json({ message: "Email already exists" });

    const hashed = await hashPassword(Password);
    const newUser = await User.create({
      Role,
      Email,
      Password: hashed,
      Business_ID,
      Branch_ID,
    });

    res.status(201).json({
      message: `${Role} created successfully`,
      User_ID: newUser._id,
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({
      message: "Staff/Cashier creation failed",
      error: err.message,
    });
  }
};
