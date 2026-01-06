import { Request, Response } from "express";
import Branch from "../models/Branch";
import User from "../models/User";

export const getBranchesByBusiness = async (req: Request, res: Response) => {
  try {
    const requester = await User.findById((req as any).user.id);

    if (!requester || requester.Role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can view branches" });
    }

    const branches = await Branch.find({
  Business_ID: requester.Business_ID,
})
  .populate({
    path: "StoreManager_User_ID",
    select: "Email",
  })
  .select("Branch_Name Branch_Address StoreManager_User_ID createdAt")
  .sort({ createdAt: -1 });


    res.status(200).json(branches);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch branches",
      error: err.message,
    });
  }
};
