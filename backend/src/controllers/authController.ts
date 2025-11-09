import { Request, Response } from "express";
import Business from "../models/Business";
import User from "../models/User";
import { hashPassword, matchPassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

/**
 * ✅ REGISTER BUSINESS + ADMIN
 */
export const registerBusiness = async (req: Request, res: Response) => {
  try {
    const { Business_Name, Business_Email, Address, Phone, Admin_Email, Admin_Password } = req.body;

    // check if same email already used
    const existingAdmin = await User.findOne({ Email: Admin_Email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin email already exists" });
    }

    // hash password
    const hashed = await hashPassword(Admin_Password);

    // create admin user
    const adminUser = await User.create({
      Role: "Admin",
      Email: Admin_Email,
      Password: hashed,
      isActive: true,
    });

    // create business record
    const business = await Business.create({
      Business_Name,
      Business_Email,
      Address,
      Phone,
      Admin_User_ID: adminUser._id,
    });

    // link business to admin
    adminUser.Business_ID = business._id;
    await adminUser.save();

    // generate token
    const token = generateToken(adminUser._id.toString(), adminUser.Role);

    res.status(201).json({
      message: "Business registered successfully",
      Business_ID: business._id,
      Admin_ID: adminUser._id,
      token,
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(400).json({
      message: "Business registration failed",
      error: error.message,
    });
  }
};

/**
 * ✅ LOGIN (Admin / StoreManager / StoreStaff / Cashier)
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { Email, Password, Role } = req.body;

    console.log("🟢 Login Attempt:", { Email, Role });

    // find user
    const user = await User.findOne({ Email, Role });
    if (!user) {
      console.warn("⚠️ User not found for:", Email);
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    const isMatch = await matchPassword(Password, user.Password);
    if (!isMatch) {
      console.warn("⚠️ Invalid password for:", Email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(user._id.toString(), user.Role);

    console.log("✅ Login success:", user.Role, user._id.toString());

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.Role,
      userId: user._id,
      Business_ID: user.Business_ID,
      Branch_ID: user.Branch_ID,
    });
  } catch (error: any) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
