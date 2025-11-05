import { Request, Response } from "express";
import Business from "../models/Business";
import User from "../models/User";
import { hashPassword, matchPassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

// Register Business (Admin)
export const registerBusiness = async (req: Request, res: Response) => {
  try {
    const { Business_Name, Business_Email, Primary_Phone_No, Password, Primary_Address } = req.body;

    const hashed = await hashPassword(Password);
    const business = await Business.create({
      Business_Name,
      Business_Email,
      Primary_Phone_No,
      Password: hashed,
      Primary_Address,
    });

    // Create Admin User
    const admin = await User.create({
      Role: "Admin",
      Business_ID: business._id,
      Password: hashed,
    });

    res.status(201).json({ Business_ID: business._id, Admin_ID: admin._id });
  } catch (error) {
    res.status(400).json({ message: "Business registration failed", error });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { role, Business_ID, Branch_ID, Personal_ID, Password } = req.body;

    let user;
    if (role === "Admin") {
      user = await User.findOne({ Role: "Admin", Business_ID });
    } else if (role === "StoreManager") {
      user = await User.findOne({ Role: "StoreManager", Business_ID, Branch_ID });
    } else {
      user = await User.findOne({ Role: role, Branch_ID, Personal_ID });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await matchPassword(Password, user.Password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toString(), user.Role);
    res.json({ token, role: user.Role, id: user._id });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};