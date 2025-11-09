import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface JwtPayload {
  id: string;
  role: string;
}

/**
 * ✅ Middleware to verify JWT and attach user info to request
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : undefined;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    //console.log("🔐 Middleware User =>", (req as any).user);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log("🔹 Decoded token =>", decoded);

    const user = await User.findById(decoded.id).select("-Password");
    if (!user) {
      return res.status(401).json({ message: "User not found or removed" });
    }
    console.log("🔹 User fetched from DB =>", user);

    (req as any).user = {
      id: user._id,
      role: user.Role,
      Business_ID: user.Business_ID,
      Branch_ID: user.Branch_ID,
    };

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

/**
 * ✅ Middleware to restrict route access to specific roles
 */
export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient privileges" });
    }

    next();
  };
